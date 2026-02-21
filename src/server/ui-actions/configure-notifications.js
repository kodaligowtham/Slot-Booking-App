import { gs } from '@servicenow/glide'

try {
    // Validate current record
    if (!current || !current.isValidRecord()) {
        gs.addErrorMessage('❌ Invalid record - cannot configure notifications');
        action.setRedirectURL(current);
        return;
    }
    
    // Load configuration with error handling
    let configuration = {};
    let configErrors = [];
    
    try {
        configuration = {
            // Platform preferences
            teamsEnabled: gs.getProperty('x_466904_recreatio.notifications.teams.enabled', 'true') === 'true',
            slackEnabled: gs.getProperty('x_466904_recreatio.notifications.slack.enabled', 'false') === 'true',
            primaryPlatform: gs.getProperty('x_466904_recreatio.notifications.primary_platform', 'both'),
            
            // Teams configuration
            teamsFormat: gs.getProperty('x_466904_recreatio.teams.message_format', 'simple'),
            teamsTenantId: gs.getProperty('x_466904_recreatio.teams.tenant_id', ''),
            teamsClientId: gs.getProperty('x_466904_recreatio.teams.client_id', ''),
            teamsClientSecret: gs.getProperty('x_466904_recreatio.teams.client_secret', ''),
            teamsTeamId: gs.getProperty('x_466904_recreatio.teams.team_id', ''),
            teamsChannelId: gs.getProperty('x_466904_recreatio.teams.channel_id', ''),
            
            // Slack configuration  
            slackFormat: gs.getProperty('x_466904_recreatio.slack.message_format', 'rich'),
            slackWebhookUrl: gs.getProperty('x_466904_recreatio.slack.webhook_url', ''),
            slackBotToken: gs.getProperty('x_466904_recreatio.slack.bot_token', ''),
            slackChannelId: gs.getProperty('x_466904_recreatio.slack.channel_id', '')
        };
    } catch (configError) {
        configErrors.push(`Configuration loading error: ${configError.message}`);
    }
    
    // Validate Teams configuration
    let teamsStatus = 'NOT_CONFIGURED';
    let teamsConfigIssues = [];
    
    if (configuration.teamsEnabled) {
        const requiredTeamsFields = [
            { field: 'teamsTenantId', name: 'Tenant ID' },
            { field: 'teamsClientId', name: 'Client ID' },
            { field: 'teamsClientSecret', name: 'Client Secret' },
            { field: 'teamsTeamId', name: 'Team ID' }
        ];
        
        let teamsConfigured = true;
        requiredTeamsFields.forEach(({ field, name }) => {
            if (!configuration[field] || configuration[field].trim() === '') {
                teamsConfigIssues.push(name);
                teamsConfigured = false;
            }
        });
        
        teamsStatus = teamsConfigured ? 'FULLY_CONFIGURED' : 'PARTIAL_CONFIGURATION';
    } else {
        teamsStatus = 'DISABLED';
    }
    
    // Validate Slack configuration
    let slackStatus = 'NOT_CONFIGURED';
    let slackConfigIssues = [];
    
    if (configuration.slackEnabled) {
        const hasWebhook = configuration.slackWebhookUrl && configuration.slackWebhookUrl.trim() !== '';
        const hasBotConfig = configuration.slackBotToken && configuration.slackBotToken.trim() !== '' && 
                            configuration.slackChannelId && configuration.slackChannelId.trim() !== '';
        
        if (hasWebhook || hasBotConfig) {
            slackStatus = 'FULLY_CONFIGURED';
        } else {
            slackStatus = 'PARTIAL_CONFIGURATION';
            if (!hasWebhook) {
                slackConfigIssues.push('Webhook URL or Bot Token + Channel ID required');
            }
        }
    } else {
        slackStatus = 'DISABLED';
    }
    
    // Build comprehensive status message
    let message = `🔧 **Multi-Platform Notification Configuration**

**Current Record:** ${current.number} - ${current.customer_name}

**System Status:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Platform Preferences:**
• Primary Platform: ${configuration.primaryPlatform.toUpperCase()}
• Teams Enabled: ${configuration.teamsEnabled ? '✅ YES' : '❌ NO'}
• Slack Enabled: ${configuration.slackEnabled ? '✅ YES' : '❌ NO'}

**Teams Configuration:**
• Status: ${getStatusIcon(teamsStatus)} ${teamsStatus}
• Format: ${configuration.teamsFormat.toUpperCase()} ${configuration.teamsFormat === 'simple' ? '(Text Messages)' : '(Adaptive Cards)'}`;

    if (teamsStatus === 'FULLY_CONFIGURED') {
        message += `
• Tenant ID: ✅ Configured
• Client ID: ✅ Configured  
• Client Secret: ✅ Configured
• Team ID: ✅ Configured
• Channel ID: ${configuration.teamsChannelId ? '✅ Configured' : '⚪ Using default (general)'}`;
    } else if (teamsStatus === 'PARTIAL_CONFIGURATION') {
        message += `
• Missing: ${teamsConfigIssues.join(', ')}`;
    }
    
    message += `

**Slack Configuration:**
• Status: ${getStatusIcon(slackStatus)} ${slackStatus}
• Format: ${configuration.slackFormat.toUpperCase()} ${configuration.slackFormat === 'simple' ? '(Simple Messages)' : '(Rich Blocks)'}`;
    
    if (slackStatus === 'FULLY_CONFIGURED') {
        const hasWebhook = configuration.slackWebhookUrl && configuration.slackWebhookUrl.trim() !== '';
        message += `
• Method: ${hasWebhook ? 'Webhook URL' : 'Bot Token'}
• Configuration: ✅ Complete`;
    } else if (slackStatus === 'PARTIAL_CONFIGURATION') {
        message += `
• Issues: ${slackConfigIssues.join(', ')}`;
    }
    
    message += `

**Email & Internal Notifications:**
• Email: ✅ Always enabled (no configuration needed)
• Internal: ✅ Always enabled (ServiceNow native)

**System Properties Setup:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**General Settings:**
• x_466904_recreatio.notifications.teams.enabled = true/false
• x_466904_recreatio.notifications.slack.enabled = true/false  
• x_466904_recreatio.notifications.primary_platform = teams/slack/both

**Teams Settings:**
• x_466904_recreatio.teams.message_format = simple/adaptive
• x_466904_recreatio.teams.tenant_id = [Your Azure Tenant ID]
• x_466904_recreatio.teams.client_id = [Your App Client ID]
• x_466904_recreatio.teams.client_secret = [Your App Secret]
• x_466904_recreatio.teams.team_id = [Your Team ID]
• x_466904_recreatio.teams.channel_id = [Channel ID (optional)]

**Slack Settings:**
• x_466904_recreatio.slack.message_format = simple/rich
• x_466904_recreatio.slack.webhook_url = [Webhook URL] OR
• x_466904_recreatio.slack.bot_token = [Bot Token]
• x_466904_recreatio.slack.channel_id = [Channel ID]

**Quick Setup Links:**
• Azure Portal: https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps
• Slack Apps: https://api.slack.com/apps
• Teams Developer Portal: https://dev.teams.microsoft.com/

**Required Azure Permissions:**
• ChannelMessage.Send
• Group.Read.All
• Team.ReadBasic.All

**Testing:**
Use the individual test buttons below to verify each configuration!`;

    // Add any configuration errors
    if (configErrors.length > 0) {
        message += `

**⚠️ Configuration Errors:**
${configErrors.join('\n')}`;
    }
    
    gs.addInfoMessage(message);
    
    // Add specific guidance based on status
    if (teamsStatus === 'PARTIAL_CONFIGURATION') {
        gs.addWarningMessage(`⚠️ Teams configuration incomplete: Missing ${teamsConfigIssues.join(', ')}`);
    }
    
    if (slackStatus === 'PARTIAL_CONFIGURATION') {
        gs.addWarningMessage(`⚠️ Slack configuration incomplete: ${slackConfigIssues.join(', ')}`);
    }
    
    if (teamsStatus === 'FULLY_CONFIGURED' || slackStatus === 'FULLY_CONFIGURED') {
        gs.addInfoMessage('✅ Use the test buttons below to verify your configuration!');
    }
    
    gs.info(`📊 Configuration displayed for booking ${current.number} - Teams: ${teamsStatus}, Slack: ${slackStatus}`);
    
} catch (error) {
    gs.error(`❌ Configuration display error: ${error.message}`);
    gs.addErrorMessage(`❌ Error loading configuration: ${error.message}`);
}

action.setRedirectURL(current);

function getStatusIcon(status) {
    switch (status) {
        case 'FULLY_CONFIGURED': return '✅';
        case 'PARTIAL_CONFIGURATION': return '⚠️';
        case 'NOT_CONFIGURED': return '❌';
        case 'DISABLED': return '⚪';
        default: return '❓';
    }
}