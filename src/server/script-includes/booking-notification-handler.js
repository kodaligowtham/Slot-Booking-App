import { gs, GlideRecord } from '@servicenow/glide'

export function BookingNotificationHandler() {
    
    // Configuration cache to avoid repeated property lookups
    this._configCache = null;
    this._cacheTimestamp = null;
    this._cacheTimeout = 5 * 60 * 1000; // 5 minutes
    
    /**
     * Main notification handler with comprehensive error handling
     */
    this.processNotification = function(bookingRecord, action) {
        const startTime = new Date().getTime();
        let notificationResults = {
            success: [],
            failures: [],
            warnings: []
        };
        
        try {
            // Validate input parameters
            if (!this._validateInputs(bookingRecord, action)) {
                gs.error('❌ Invalid input parameters for notification processing');
                return { success: false, error: 'Invalid input parameters' };
            }
            
            gs.info(`📢 Processing notifications for booking ${bookingRecord.number.toString()} - ${action}`);
            
            // Get cached configuration
            const preferences = this._getNotificationPreferences();
            if (!preferences) {
                gs.error('❌ Failed to load notification preferences');
                return { success: false, error: 'Configuration error' };
            }
            
            // Process notifications in parallel where possible, sequential for dependencies
            const notificationPromises = [];
            
            // Always send email and internal notifications first (they're reliable)
            try {
                this._sendEmailNotifications(bookingRecord, action);
                notificationResults.success.push('Email notifications');
            } catch (emailError) {
                gs.error(`❌ Email notification error: ${emailError.message}`);
                notificationResults.failures.push('Email notifications: ' + emailError.message);
            }
            
            try {
                this._sendInternalNotifications(bookingRecord, action);
                notificationResults.success.push('Internal notifications');
            } catch (internalError) {
                gs.error(`❌ Internal notification error: ${internalError.message}`);
                notificationResults.failures.push('Internal notifications: ' + internalError.message);
            }
            
            // Send external platform notifications with retry logic
            if (preferences.enableTeams) {
                try {
                    const teamsResult = this._sendTeamsNotificationWithRetry(bookingRecord, action, preferences, 3);
                    if (teamsResult.success) {
                        notificationResults.success.push('Teams notifications');
                    } else {
                        notificationResults.failures.push('Teams notifications: ' + teamsResult.error);
                    }
                } catch (teamsError) {
                    gs.error(`❌ Teams notification error: ${teamsError.message}`);
                    notificationResults.failures.push('Teams notifications: ' + teamsError.message);
                }
            }
            
            if (preferences.enableSlack) {
                try {
                    const slackResult = this._sendSlackNotificationWithRetry(bookingRecord, action, preferences, 3);
                    if (slackResult.success) {
                        notificationResults.success.push('Slack notifications');
                    } else {
                        notificationResults.failures.push('Slack notifications: ' + slackResult.error);
                    }
                } catch (slackError) {
                    gs.error(`❌ Slack notification error: ${slackError.message}`);
                    notificationResults.failures.push('Slack notifications: ' + slackError.message);
                }
            }
            
            // Log performance metrics
            const processingTime = new Date().getTime() - startTime;
            gs.info(`📊 Notification processing completed in ${processingTime}ms - Success: ${notificationResults.success.length}, Failures: ${notificationResults.failures.length}`);
            
            return {
                success: notificationResults.failures.length === 0,
                results: notificationResults,
                processingTime: processingTime
            };
            
        } catch (error) {
            gs.error(`❌ Critical notification processing error: ${error.message}`);
            gs.error(`❌ Stack trace: ${error.stack || 'No stack trace available'}`);
            return { success: false, error: error.message, criticalError: true };
        }
    };
    
    /**
     * Validate input parameters
     */
    this._validateInputs = function(bookingRecord, action) {
        if (!bookingRecord) {
            gs.error('❌ Booking record is null or undefined');
            return false;
        }
        
        if (!action || typeof action !== 'string') {
            gs.error('❌ Action parameter is invalid');
            return false;
        }
        
        // Check required fields on booking record
        const requiredFields = ['number', 'customer_name', 'sys_id'];
        for (let field of requiredFields) {
            if (!bookingRecord[field] || bookingRecord[field].toString().trim() === '') {
                gs.error(`❌ Required field missing: ${field}`);
                return false;
            }
        }
        
        return true;
    };
    
    /**
     * Get notification preferences with caching and validation
     */
    this._getNotificationPreferences = function() {
        try {
            const now = new Date().getTime();
            
            // Return cached config if still valid
            if (this._configCache && this._cacheTimestamp && (now - this._cacheTimestamp < this._cacheTimeout)) {
                return this._configCache;
            }
            
            // Load fresh configuration
            const preferences = {
                // Platform preferences with validation
                enableTeams: this._getValidatedProperty('x_466904_recreatio.notifications.teams.enabled', 'true') === 'true',
                enableSlack: this._getValidatedProperty('x_466904_recreatio.notifications.slack.enabled', 'false') === 'true',
                
                // Teams configuration with validation
                teamsFormat: this._validateFormat(this._getValidatedProperty('x_466904_recreatio.teams.message_format', 'simple')),
                teamsTenantId: this._sanitizeInput(gs.getProperty('x_466904_recreatio.teams.tenant_id', '')),
                teamsClientId: this._sanitizeInput(gs.getProperty('x_466904_recreatio.teams.client_id', '')),
                teamsClientSecret: this._sanitizeInput(gs.getProperty('x_466904_recreatio.teams.client_secret', '')),
                teamsTeamId: this._sanitizeInput(gs.getProperty('x_466904_recreatio.teams.team_id', '')),
                teamsChannelId: this._sanitizeInput(gs.getProperty('x_466904_recreatio.teams.channel_id', '')),
                
                // Slack configuration with validation
                slackFormat: this._validateFormat(this._getValidatedProperty('x_466904_recreatio.slack.message_format', 'rich')),
                slackWebhookUrl: this._sanitizeInput(gs.getProperty('x_466904_recreatio.slack.webhook_url', '')),
                slackBotToken: this._sanitizeInput(gs.getProperty('x_466904_recreatio.slack.bot_token', '')),
                slackChannelId: this._sanitizeInput(gs.getProperty('x_466904_recreatio.slack.channel_id', '')),
                
                // General preferences
                primaryPlatform: this._validatePlatform(this._getValidatedProperty('x_466904_recreatio.notifications.primary_platform', 'both'))
            };
            
            // Validate Teams configuration
            if (preferences.enableTeams) {
                preferences.teamsConfigured = this._validateTeamsConfig(preferences);
            }
            
            // Validate Slack configuration
            if (preferences.enableSlack) {
                preferences.slackConfigured = this._validateSlackConfig(preferences);
            }
            
            // Cache the configuration
            this._configCache = preferences;
            this._cacheTimestamp = now;
            
            return preferences;
            
        } catch (error) {
            gs.error(`❌ Error loading notification preferences: ${error.message}`);
            return null;
        }
    };
    
    /**
     * Validate and sanitize property values
     */
    this._getValidatedProperty = function(propertyName, defaultValue) {
        try {
            const value = gs.getProperty(propertyName, defaultValue);
            return this._sanitizeInput(value);
        } catch (error) {
            gs.warn(`⚠️ Error reading property ${propertyName}, using default: ${defaultValue}`);
            return defaultValue;
        }
    };
    
    /**
     * Sanitize input to prevent injection attacks
     */
    this._sanitizeInput = function(input) {
        if (!input || typeof input !== 'string') {
            return '';
        }
        
        // Remove potentially dangerous characters
        return input.toString().replace(/[<>\"'&]/g, '').trim();
    };
    
    /**
     * Validate message format values
     */
    this._validateFormat = function(format) {
        const validFormats = ['simple', 'adaptive', 'rich'];
        return validFormats.includes(format) ? format : 'simple';
    };
    
    /**
     * Validate platform values
     */
    this._validatePlatform = function(platform) {
        const validPlatforms = ['teams', 'slack', 'both'];
        return validPlatforms.includes(platform) ? platform : 'both';
    };
    
    /**
     * Validate Teams configuration
     */
    this._validateTeamsConfig = function(preferences) {
        const required = ['teamsTenantId', 'teamsClientId', 'teamsClientSecret', 'teamsTeamId'];
        for (let field of required) {
            if (!preferences[field] || preferences[field].trim() === '') {
                gs.warn(`⚠️ Teams configuration incomplete: missing ${field}`);
                return false;
            }
        }
        return true;
    };
    
    /**
     * Validate Slack configuration
     */
    this._validateSlackConfig = function(preferences) {
        const hasWebhook = preferences.slackWebhookUrl && preferences.slackWebhookUrl.trim() !== '';
        const hasBotToken = preferences.slackBotToken && preferences.slackBotToken.trim() !== '' && 
                           preferences.slackChannelId && preferences.slackChannelId.trim() !== '';
        
        if (!hasWebhook && !hasBotToken) {
            gs.warn('⚠️ Slack configuration incomplete: need webhook URL OR (bot token + channel ID)');
            return false;
        }
        return true;
    };
    
    /**
     * Send Teams notification with retry logic
     */
    this._sendTeamsNotificationWithRetry = function(bookingRecord, action, preferences, maxRetries) {
        let lastError = null;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                gs.info(`📱 Teams notification attempt ${attempt}/${maxRetries}`);
                
                if (!preferences.teamsConfigured) {
                    return { 
                        success: false, 
                        error: 'Teams integration not properly configured. Check system properties.' 
                    };
                }
                
                // Get access token with exponential backoff
                const accessToken = this._getTeamsAccessTokenWithRetry(preferences, attempt);
                if (!accessToken) {
                    lastError = 'Failed to obtain Teams access token';
                    if (attempt < maxRetries) {
                        this._sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
                        continue;
                    }
                    break;
                }
                
                // Send notification based on format
                if (preferences.teamsFormat === 'adaptive') {
                    return this._sendTeamsAdaptiveCardSafe(bookingRecord, action, accessToken, preferences);
                } else {
                    return this._sendTeamsSimpleMessageSafe(bookingRecord, action, accessToken, preferences);
                }
                
            } catch (error) {
                lastError = error.message;
                gs.warn(`⚠️ Teams notification attempt ${attempt} failed: ${error.message}`);
                
                if (attempt < maxRetries) {
                    this._sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
                }
            }
        }
        
        return { success: false, error: lastError || 'Unknown error after all retry attempts' };
    };
    
    /**
     * Send Slack notification with retry logic
     */
    this._sendSlackNotificationWithRetry = function(bookingRecord, action, preferences, maxRetries) {
        let lastError = null;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                gs.info(`💬 Slack notification attempt ${attempt}/${maxRetries}`);
                
                if (!preferences.slackConfigured) {
                    return { 
                        success: false, 
                        error: 'Slack integration not properly configured. Check system properties.' 
                    };
                }
                
                // Send notification based on format
                if (preferences.slackFormat === 'rich') {
                    return this._sendSlackRichMessageSafe(bookingRecord, action, preferences);
                } else {
                    return this._sendSlackSimpleMessageSafe(bookingRecord, action, preferences);
                }
                
            } catch (error) {
                lastError = error.message;
                gs.warn(`⚠️ Slack notification attempt ${attempt} failed: ${error.message}`);
                
                if (attempt < maxRetries) {
                    this._sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
                }
            }
        }
        
        return { success: false, error: lastError || 'Unknown error after all retry attempts' };
    };
    
    /**
     * Safe sleep function for retry delays
     */
    this._sleep = function(milliseconds) {
        try {
            java.lang.Thread.sleep(milliseconds);
        } catch (e) {
            // Fallback for environments where Thread.sleep is not available
            const start = new Date().getTime();
            while (new Date().getTime() < start + milliseconds) {
                // Busy wait (not ideal but works as fallback)
            }
        }
    };
    
    /**
     * Get Teams access token with retry logic
     */
    this._getTeamsAccessTokenWithRetry = function(preferences, attempt) {
        try {
            const request = new sn_ws.RESTMessageV2();
            request.setEndpoint(`https://login.microsoftonline.com/${preferences.teamsTenantId}/oauth2/v2.0/token`);
            request.setHttpMethod('POST');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            const body = `grant_type=client_credentials&client_id=${encodeURIComponent(preferences.teamsClientId)}&client_secret=${encodeURIComponent(preferences.teamsClientSecret)}&scope=https://graph.microsoft.com/.default`;
            request.setRequestBody(body);
            
            // Set timeout based on attempt number
            const timeout = 10000 + (attempt * 5000); // 10s base + 5s per attempt
            request.setHttpTimeout(timeout);
            
            const response = request.execute();
            const statusCode = response.getStatusCode();
            const responseBody = response.getBody();
            
            if (statusCode === 200) {
                const responseObj = JSON.parse(responseBody);
                if (responseObj && responseObj.access_token) {
                    gs.info(`✅ Teams access token obtained successfully (attempt ${attempt})`);
                    return responseObj.access_token;
                } else {
                    gs.error(`❌ Teams OAuth response missing access token: ${responseBody}`);
                    return null;
                }
            } else {
                gs.error(`❌ Teams OAuth error ${statusCode}: ${responseBody}`);
                return null;
            }
        } catch (error) {
            gs.error(`❌ Teams OAuth request error (attempt ${attempt}): ${error.message}`);
            return null;
        }
    };
    
    /**
     * Send Teams simple message safely
     */
    this._sendTeamsSimpleMessageSafe = function(bookingRecord, action, accessToken, preferences) {
        try {
            const amenityRecord = this._getAmenityRecordSafe(bookingRecord.amenity.toString());
            const bookingUrl = this._generateSecureBookingUrl(bookingRecord.sys_id.toString());
            
            const message = this._buildTeamsSimpleMessage(bookingRecord, amenityRecord, bookingUrl);
            
            const payload = {
                body: {
                    content: message,
                    contentType: 'text'
                }
            };
            
            const result = this._sendTeamsMessageSafe(payload, accessToken, preferences);
            if (result.success) {
                gs.info(`📱 Teams simple message sent successfully for booking ${bookingRecord.number}`);
            }
            return result;
            
        } catch (error) {
            gs.error(`❌ Teams simple message error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };
    
    /**
     * Send Teams Adaptive Card safely
     */
    this._sendTeamsAdaptiveCardSafe = function(bookingRecord, action, accessToken, preferences) {
        try {
            const amenityRecord = this._getAmenityRecordSafe(bookingRecord.amenity.toString());
            const bookingUrl = this._generateSecureBookingUrl(bookingRecord.sys_id.toString());
            
            const adaptiveCard = this._buildTeamsAdaptiveCard(bookingRecord, amenityRecord, bookingUrl);
            
            const result = this._sendTeamsMessageSafe(adaptiveCard, accessToken, preferences);
            if (result.success) {
                gs.info(`🎴 Teams Adaptive Card sent successfully for booking ${bookingRecord.number}`);
            }
            return result;
            
        } catch (error) {
            gs.error(`❌ Teams Adaptive Card error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };
    
    /**
     * Send Slack simple message safely
     */
    this._sendSlackSimpleMessageSafe = function(bookingRecord, action, preferences) {
        try {
            const amenityRecord = this._getAmenityRecordSafe(bookingRecord.amenity.toString());
            const bookingUrl = this._generateSecureBookingUrl(bookingRecord.sys_id.toString());
            
            const message = this._buildSlackSimpleMessage(bookingRecord, amenityRecord, bookingUrl);
            const payload = { text: message };
            
            const result = this._sendSlackMessageSafe(payload, preferences);
            if (result.success) {
                gs.info(`💬 Slack simple message sent successfully for booking ${bookingRecord.number}`);
            }
            return result;
            
        } catch (error) {
            gs.error(`❌ Slack simple message error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };
    
    /**
     * Send Slack rich message safely
     */
    this._sendSlackRichMessageSafe = function(bookingRecord, action, preferences) {
        try {
            const amenityRecord = this._getAmenityRecordSafe(bookingRecord.amenity.toString());
            const bookingUrl = this._generateSecureBookingUrl(bookingRecord.sys_id.toString());
            
            const payload = this._buildSlackRichMessage(bookingRecord, amenityRecord, bookingUrl);
            
            const result = this._sendSlackMessageSafe(payload, preferences);
            if (result.success) {
                gs.info(`🎨 Slack rich message sent successfully for booking ${bookingRecord.number}`);
            }
            return result;
            
        } catch (error) {
            gs.error(`❌ Slack rich message error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };
    
    /**
     * Build Teams simple message with validation
     */
    this._buildTeamsSimpleMessage = function(bookingRecord, amenityRecord, bookingUrl) {
        const customerName = this._sanitizeInput(bookingRecord.customer_name.toString()) || 'Unknown Customer';
        const facilityName = amenityRecord ? this._sanitizeInput(amenityRecord.name) : 'Unknown Facility';
        const bookingNumber = this._sanitizeInput(bookingRecord.number.toString());
        
        return `🏟️ **NEW BOOKING ALERT** 🏟️

**Booking Details:**
• Booking #: ${bookingNumber}
• Customer: ${customerName}
• Facility: ${facilityName}
• Date & Time: ${bookingRecord.start_time} - ${bookingRecord.end_time}
• Total Cost: $${bookingRecord.total_cost || '0.00'}
• Status: ${bookingRecord.booking_status || 'pending'}
• Contact: ${bookingRecord.customer_email || 'N/A'} | ${bookingRecord.customer_phone || 'N/A'}

⚠️ **Please prepare the facility for the scheduled booking time.**

🔗 [View Booking Details](${bookingUrl})`;
    };
    
    /**
     * Build Teams Adaptive Card with validation
     */
    this._buildTeamsAdaptiveCard = function(bookingRecord, amenityRecord, bookingUrl) {
        const customerName = this._sanitizeInput(bookingRecord.customer_name.toString()) || 'Unknown Customer';
        const facilityName = amenityRecord ? this._sanitizeInput(amenityRecord.name) : 'Unknown Facility';
        const bookingNumber = this._sanitizeInput(bookingRecord.number.toString());
        
        return {
            type: "message",
            attachments: [{
                contentType: "application/vnd.microsoft.card.adaptive",
                content: {
                    type: "AdaptiveCard",
                    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
                    version: "1.3",
                    body: [
                        {
                            type: "Container",
                            style: "accent",
                            items: [
                                {
                                    type: "TextBlock",
                                    text: "🏟️ NEW BOOKING ALERT",
                                    weight: "Bolder",
                                    size: "Medium",
                                    color: "Light"
                                }
                            ]
                        },
                        {
                            type: "FactSet",
                            facts: [
                                { title: "Booking #:", value: bookingNumber },
                                { title: "Customer:", value: customerName },
                                { title: "Facility:", value: facilityName },
                                { title: "Date & Time:", value: `${bookingRecord.start_time} - ${bookingRecord.end_time}` },
                                { title: "Total Cost:", value: `$${bookingRecord.total_cost || '0.00'}` },
                                { title: "Status:", value: bookingRecord.booking_status.toString() || 'pending' },
                                { title: "Contact:", value: `${bookingRecord.customer_email || 'N/A'} | ${bookingRecord.customer_phone || 'N/A'}` }
                            ]
                        },
                        {
                            type: "TextBlock",
                            text: "⚠️ Please prepare the facility for the scheduled booking time.",
                            weight: "Bolder",
                            color: "Warning"
                        }
                    ],
                    actions: [
                        {
                            type: "Action.OpenUrl",
                            title: "View Booking Details",
                            url: bookingUrl
                        }
                    ]
                }
            }]
        };
    };
    
    /**
     * Build Slack simple message with validation
     */
    this._buildSlackSimpleMessage = function(bookingRecord, amenityRecord, bookingUrl) {
        const customerName = this._sanitizeInput(bookingRecord.customer_name.toString()) || 'Unknown Customer';
        const facilityName = amenityRecord ? this._sanitizeInput(amenityRecord.name) : 'Unknown Facility';
        const bookingNumber = this._sanitizeInput(bookingRecord.number.toString());
        
        return `🏟️ *NEW BOOKING ALERT* 🏟️

*Booking Details:*
• Booking #: ${bookingNumber}
• Customer: ${customerName}
• Facility: ${facilityName}
• Date & Time: ${bookingRecord.start_time} - ${bookingRecord.end_time}
• Total Cost: $${bookingRecord.total_cost || '0.00'}
• Status: ${bookingRecord.booking_status || 'pending'}
• Contact: ${bookingRecord.customer_email || 'N/A'} | ${bookingRecord.customer_phone || 'N/A'}

⚠️ *Please prepare the facility for the scheduled booking time.*

🔗 <${bookingUrl}|View Booking Details>`;
    };
    
    /**
     * Build Slack rich message with validation
     */
    this._buildSlackRichMessage = function(bookingRecord, amenityRecord, bookingUrl) {
        const customerName = this._sanitizeInput(bookingRecord.customer_name.toString()) || 'Unknown Customer';
        const facilityName = amenityRecord ? this._sanitizeInput(amenityRecord.name) : 'Unknown Facility';
        const bookingNumber = this._sanitizeInput(bookingRecord.number.toString());
        
        return {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "🏟️ NEW BOOKING ALERT"
                    }
                },
                {
                    type: "section",
                    fields: [
                        { type: "mrkdwn", text: `*Booking #:*\n${bookingNumber}` },
                        { type: "mrkdwn", text: `*Customer:*\n${customerName}` },
                        { type: "mrkdwn", text: `*Facility:*\n${facilityName}` },
                        { type: "mrkdwn", text: `*Status:*\n${bookingRecord.booking_status || 'pending'}` },
                        { type: "mrkdwn", text: `*Date & Time:*\n${bookingRecord.start_time} - ${bookingRecord.end_time}` },
                        { type: "mrkdwn", text: `*Total Cost:*\n$${bookingRecord.total_cost || '0.00'}` }
                    ]
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Contact:* ${bookingRecord.customer_email || 'N/A'} | ${bookingRecord.customer_phone || 'N/A'}`
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "⚠️ *Please prepare the facility for the scheduled booking time.*"
                    }
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: { type: "plain_text", text: "View Booking Details" },
                            url: bookingUrl,
                            style: "primary"
                        }
                    ]
                }
            ]
        };
    };
    
    /**
     * Generate secure booking URL
     */
    this._generateSecureBookingUrl = function(sysId) {
        try {
            const baseUrl = gs.getProperty('glide.servlet.uri');
            if (!baseUrl) {
                gs.warn('⚠️ Unable to determine base URL for booking link');
                return '#';
            }
            return `https://${baseUrl}.service-now.com/x_466904_recreatio_booking_slots.do?sys_id=${encodeURIComponent(sysId)}`;
        } catch (error) {
            gs.error(`❌ Error generating booking URL: ${error.message}`);
            return '#';
        }
    };
    
    /**
     * Send message to Teams channel safely
     */
    this._sendTeamsMessageSafe = function(payload, accessToken, preferences) {
        try {
            const channelId = preferences.teamsChannelId || '19:general';
            const request = new sn_ws.RESTMessageV2();
            request.setEndpoint(`https://graph.microsoft.com/v1.0/teams/${preferences.teamsTeamId}/channels/${channelId}/messages`);
            request.setHttpMethod('POST');
            request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
            request.setRequestHeader('Content-Type', 'application/json');
            request.setHttpTimeout(15000); // 15 second timeout
            
            const bodyString = JSON.stringify(payload);
            request.setRequestBody(bodyString);
            
            const response = request.execute();
            const statusCode = response.getStatusCode();
            const responseBody = response.getBody();
            
            if (statusCode === 201) {
                return { success: true };
            } else {
                gs.error(`❌ Teams message send error ${statusCode}: ${responseBody}`);
                return { success: false, error: `HTTP ${statusCode}: ${responseBody}` };
            }
        } catch (error) {
            gs.error(`❌ Teams message request error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };
    
    /**
     * Send message to Slack safely
     */
    this._sendSlackMessageSafe = function(payload, preferences) {
        try {
            const request = new sn_ws.RESTMessageV2();
            request.setHttpTimeout(15000); // 15 second timeout
            
            if (preferences.slackBotToken && preferences.slackChannelId) {
                // Use Bot Token for channel posting
                request.setEndpoint('https://slack.com/api/chat.postMessage');
                request.setHttpMethod('POST');
                request.setRequestHeader('Authorization', `Bearer ${preferences.slackBotToken}`);
                request.setRequestHeader('Content-Type', 'application/json');
                
                payload.channel = preferences.slackChannelId;
                request.setRequestBody(JSON.stringify(payload));
            } else if (preferences.slackWebhookUrl) {
                // Use Webhook URL
                request.setEndpoint(preferences.slackWebhookUrl);
                request.setHttpMethod('POST');
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestBody(JSON.stringify(payload));
            } else {
                return { success: false, error: 'No valid Slack configuration available' };
            }
            
            const response = request.execute();
            const statusCode = response.getStatusCode();
            const responseBody = response.getBody();
            
            if (statusCode === 200) {
                // For bot token, check if response contains "ok": true
                if (preferences.slackBotToken) {
                    try {
                        const responseObj = JSON.parse(responseBody);
                        if (responseObj && responseObj.ok === true) {
                            return { success: true };
                        } else {
                            return { success: false, error: responseObj.error || 'Unknown Slack API error' };
                        }
                    } catch (parseError) {
                        gs.error(`❌ Error parsing Slack response: ${parseError.message}`);
                        return { success: false, error: 'Invalid response format' };
                    }
                } else {
                    // Webhook response
                    return { success: true };
                }
            } else {
                gs.error(`❌ Slack message send error ${statusCode}: ${responseBody}`);
                return { success: false, error: `HTTP ${statusCode}: ${responseBody}` };
            }
        } catch (error) {
            gs.error(`❌ Slack message request error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };
    
    /**
     * Send email notifications with comprehensive error handling
     */
    this._sendEmailNotifications = function(bookingRecord, action) {
        try {
            const amenityRecord = this._getAmenityRecordSafe(bookingRecord.amenity.toString());
            const relevantStaff = this._getRelevantStaffSafe(amenityRecord);
            
            if (!relevantStaff || relevantStaff.length === 0) {
                gs.warn('⚠️ No relevant staff found for email notifications');
                return;
            }
            
            let emailsSent = 0;
            let emailsFailed = 0;
            
            relevantStaff.forEach(staffMember => {
                try {
                    if (!staffMember.email || staffMember.email.trim() === '') {
                        gs.warn(`⚠️ Staff member ${staffMember.name} has no email address`);
                        emailsFailed++;
                        return;
                    }
                    
                    const email = new GlideEmailOutbound();
                    email.setSubject(`🏟️ New Booking Alert - ${bookingRecord.number}`);
                    email.setFrom('noreply@company.com');
                    email.setReplyTo('facilities@company.com');
                    email.addRecipient(staffMember.email);
                    
                    const emailBody = this._generateEmailBodySafe(bookingRecord, amenityRecord, action);
                    email.setBody(emailBody);
                    
                    if (email.send()) {
                        gs.info(`📧 Email sent successfully to ${staffMember.name} (${staffMember.email})`);
                        emailsSent++;
                    } else {
                        gs.error(`❌ Failed to send email to ${staffMember.name} (${staffMember.email})`);
                        emailsFailed++;
                    }
                } catch (emailError) {
                    gs.error(`❌ Email error for ${staffMember.name}: ${emailError.message}`);
                    emailsFailed++;
                }
            });
            
            gs.info(`📊 Email notification summary: ${emailsSent} sent, ${emailsFailed} failed`);
            
        } catch (error) {
            gs.error(`❌ Email notification system error: ${error.message}`);
            throw error;
        }
    };
    
    /**
     * Send internal notifications with error handling
     */
    this._sendInternalNotifications = function(bookingRecord, action) {
        try {
            const amenityRecord = this._getAmenityRecordSafe(bookingRecord.amenity.toString());
            const relevantStaff = this._getRelevantStaffSafe(amenityRecord);
            
            if (!relevantStaff || relevantStaff.length === 0) {
                gs.warn('⚠️ No relevant staff found for internal notifications');
                return;
            }
            
            let notificationsSent = 0;
            let notificationsFailed = 0;
            
            relevantStaff.forEach(staffMember => {
                try {
                    gs.eventQueue('x_466904_recreatio.booking.notification', bookingRecord, staffMember.sys_id, action);
                    gs.info(`🔔 Internal notification sent to user: ${staffMember.sys_id}`);
                    notificationsSent++;
                } catch (notificationError) {
                    gs.error(`❌ Internal notification error for ${staffMember.name}: ${notificationError.message}`);
                    notificationsFailed++;
                }
            });
            
            gs.info(`📊 Internal notification summary: ${notificationsSent} sent, ${notificationsFailed} failed`);
            
        } catch (error) {
            gs.error(`❌ Internal notification system error: ${error.message}`);
            throw error;
        }
    };
    
    /**
     * Get amenity record with error handling
     */
    this._getAmenityRecordSafe = function(amenitySysId) {
        try {
            if (!amenitySysId || amenitySysId.trim() === '') {
                gs.warn('⚠️ Amenity sys_id is empty');
                return null;
            }
            
            const amenityGr = new GlideRecord('x_466904_recreatio_amenities');
            if (amenityGr.get(amenitySysId)) {
                return {
                    name: this._sanitizeInput(amenityGr.name.toString()),
                    type: this._sanitizeInput(amenityGr.amenity_type.toString()),
                    sys_id: amenityGr.sys_id.toString()
                };
            }
            
            gs.warn(`⚠️ Amenity record not found: ${amenitySysId}`);
            return null;
        } catch (error) {
            gs.error(`❌ Error getting amenity record: ${error.message}`);
            return null;
        }
    };
    
    /**
     * Get relevant staff with error handling and validation
     */
    this._getRelevantStaffSafe = function(amenityRecord) {
        const staffList = [];
        
        try {
            const staffGr = new GlideRecord('x_466904_recreatio_staff');
            staffGr.addActiveQuery();
            
            if (amenityRecord && amenityRecord.type) {
                const amenityType = amenityRecord.type.toLowerCase();
                
                if (amenityType.includes('pool')) {
                    staffGr.addQuery('position', 'IN', 'pool_attendant,supervisor,manager');
                } else if (amenityType.includes('court') || amenityType.includes('badminton') || amenityType.includes('tennis')) {
                    staffGr.addQuery('position', 'IN', 'sports_attendant,supervisor,manager');
                } else if (amenityType.includes('ground') || amenityType.includes('football') || amenityType.includes('cricket')) {
                    staffGr.addQuery('position', 'IN', 'grounds_keeper,supervisor,manager');
                } else {
                    staffGr.addQuery('position', 'IN', 'supervisor,manager');
                }
            } else {
                staffGr.addQuery('position', 'IN', 'supervisor,manager');
            }
            
            staffGr.query();
            while (staffGr.next()) {
                const staffEmail = staffGr.email.toString().trim();
                const staffName = staffGr.name.toString().trim();
                
                if (staffEmail === '' || staffName === '') {
                    gs.warn(`⚠️ Skipping staff member with missing email or name: ${staffGr.sys_id}`);
                    continue;
                }
                
                staffList.push({
                    name: this._sanitizeInput(staffName),
                    email: this._sanitizeInput(staffEmail),
                    position: this._sanitizeInput(staffGr.position.toString()),
                    sys_id: staffGr.sys_id.toString()
                });
            }
        } catch (error) {
            gs.error(`❌ Error getting relevant staff: ${error.message}`);
        }
        
        return staffList;
    };
    
    /**
     * Generate HTML email body with validation
     */
    this._generateEmailBodySafe = function(bookingRecord, amenityRecord, action) {
        try {
            const bookingUrl = this._generateSecureBookingUrl(bookingRecord.sys_id.toString());
            const customerName = this._sanitizeInput(bookingRecord.customer_name.toString()) || 'Unknown Customer';
            const facilityName = amenityRecord ? this._sanitizeInput(amenityRecord.name) : 'Unknown Facility';
            const bookingNumber = this._sanitizeInput(bookingRecord.number.toString());
            
            return `
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">🏟️ NEW BOOKING ALERT</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2>Booking Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Booking #:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingNumber}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Customer:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerName}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Facility:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${facilityName}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date & Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingRecord.start_time} - ${bookingRecord.end_time}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Total Cost:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">$${bookingRecord.total_cost || '0.00'}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Status:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingRecord.booking_status || 'pending'}</td></tr>
                            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Contact:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingRecord.customer_email || 'N/A'}<br>${bookingRecord.customer_phone || 'N/A'}</td></tr>
                        </table>
                        
                        <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px;">
                            <strong>⚠️ Action Required:</strong> Please prepare the facility for the scheduled booking time.
                        </div>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${bookingUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">View Booking Details</a>
                        </div>
                    </div>
                    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #6c757d;">
                        <p>This is an automated notification from the Recreational Facility Booking System.</p>
                    </div>
                </div>
            </body>
            </html>`;
        } catch (error) {
            gs.error(`❌ Error generating email body: ${error.message}`);
            return `<html><body><h1>Booking Alert</h1><p>A new booking has been created but there was an error generating the details.</p></body></html>`;
        }
    };
    
    /**
     * Test notification functionality with comprehensive error handling
     */
    this.testNotifications = function(bookingRecord, platform, format) {
        try {
            if (!this._validateInputs(bookingRecord, 'test')) {
                return 'Test failed: Invalid booking record';
            }
            
            gs.info(`🧪 Testing ${platform} notification with ${format} format`);
            
            const preferences = this._getNotificationPreferences();
            if (!preferences) {
                return 'Test failed: Could not load notification preferences';
            }
            
            let result;
            
            if (platform === 'teams') {
                if (!preferences.teamsConfigured) {
                    return 'Test failed: Teams not properly configured. Check system properties.';
                }
                
                // Temporarily override format for testing
                const originalFormat = preferences.teamsFormat;
                preferences.teamsFormat = format;
                
                result = this._sendTeamsNotificationWithRetry(bookingRecord, 'test', preferences, 2);
                
                // Restore original format
                preferences.teamsFormat = originalFormat;
                
            } else if (platform === 'slack') {
                if (!preferences.slackConfigured) {
                    return 'Test failed: Slack not properly configured. Check system properties.';
                }
                
                // Temporarily override format for testing
                const originalFormat = preferences.slackFormat;
                preferences.slackFormat = format;
                
                result = this._sendSlackNotificationWithRetry(bookingRecord, 'test', preferences, 2);
                
                // Restore original format
                preferences.slackFormat = originalFormat;
                
            } else {
                return 'Test failed: Invalid platform specified (use "teams" or "slack")';
            }
            
            if (result && result.success) {
                return 'Test notification sent successfully!';
            } else {
                return `Test failed: ${result ? result.error : 'Unknown error'}`;
            }
            
        } catch (error) {
            gs.error(`❌ Test notification error: ${error.message}`);
            return `Test failed: ${error.message}`;
        }
    };
    
    /**
     * Clear configuration cache (for admin use)
     */
    this.clearConfigCache = function() {
        this._configCache = null;
        this._cacheTimestamp = null;
        gs.info('📝 Notification configuration cache cleared');
    };
    
    /**
     * Get system health status
     */
    this.getHealthStatus = function() {
        try {
            const preferences = this._getNotificationPreferences();
            if (!preferences) {
                return { status: 'ERROR', message: 'Unable to load configuration' };
            }
            
            const health = {
                status: 'HEALTHY',
                timestamp: new Date().toISOString(),
                platforms: {
                    email: { enabled: true, configured: true, status: 'READY' },
                    internal: { enabled: true, configured: true, status: 'READY' },
                    teams: {
                        enabled: preferences.enableTeams,
                        configured: preferences.teamsConfigured,
                        status: preferences.enableTeams ? (preferences.teamsConfigured ? 'READY' : 'NOT_CONFIGURED') : 'DISABLED'
                    },
                    slack: {
                        enabled: preferences.enableSlack,
                        configured: preferences.slackConfigured,
                        status: preferences.enableSlack ? (preferences.slackConfigured ? 'READY' : 'NOT_CONFIGURED') : 'DISABLED'
                    }
                },
                configuration: {
                    cached: this._configCache !== null,
                    cacheAge: this._cacheTimestamp ? (new Date().getTime() - this._cacheTimestamp) : 0
                }
            };
            
            return health;
        } catch (error) {
            return { 
                status: 'ERROR', 
                message: error.message,
                timestamp: new Date().toISOString()
            };
        }
    };
}