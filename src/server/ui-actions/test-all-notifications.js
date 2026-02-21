import { gs } from '@servicenow/glide'

try {
    // Validate current record
    if (!current || !current.isValidRecord()) {
        gs.addErrorMessage('❌ Invalid record - cannot test notifications');
        action.setRedirectURL(current);
        return;
    }
    
    gs.addInfoMessage('🧪 Testing all notification channels...');
    
    // Import and initialize handler
    let handler;
    try {
        const { BookingNotificationHandler } = require('../script-includes/booking-notification-handler.js');
        handler = new BookingNotificationHandler();
    } catch (handlerError) {
        gs.addErrorMessage(`❌ Failed to initialize notification handler: ${handlerError.message}`);
        action.setRedirectURL(current);
        return;
    }
    
    const results = {
        success: [],
        warnings: [],
        errors: []
    };
    
    // Test email notifications (always work)
    try {
        handler._sendEmailNotifications(current, 'test');
        results.success.push('📧 Email notifications');
        gs.addInfoMessage('✅ Email notifications sent successfully!');
    } catch (emailError) {
        results.errors.push(`📧 Email notifications: ${emailError.message}`);
        gs.addWarningMessage(`⚠️ Email test failed: ${emailError.message}`);
    }
    
    // Test internal notifications (always work)
    try {
        handler._sendInternalNotifications(current, 'test');
        results.success.push('🔔 Internal notifications');
        gs.addInfoMessage('✅ Internal notifications sent successfully!');
    } catch (internalError) {
        results.errors.push(`🔔 Internal notifications: ${internalError.message}`);
        gs.addWarningMessage(`⚠️ Internal test failed: ${internalError.message}`);
    }
    
    // Test Teams notifications (both formats)
    try {
        const teamsSimpleResult = handler.testNotifications(current, 'teams', 'simple');
        if (teamsSimpleResult.includes('successfully')) {
            results.success.push('📱 Teams simple message');
            gs.addInfoMessage('✅ Teams simple message test completed!');
        } else {
            results.warnings.push(`📱 Teams simple: ${teamsSimpleResult}`);
            gs.addWarningMessage(`⚠️ Teams simple test: ${teamsSimpleResult}`);
        }
    } catch (teamsSimpleError) {
        results.errors.push(`📱 Teams simple: ${teamsSimpleError.message}`);
        gs.addWarningMessage(`⚠️ Teams simple error: ${teamsSimpleError.message}`);
    }
    
    try {
        const teamsAdaptiveResult = handler.testNotifications(current, 'teams', 'adaptive');
        if (teamsAdaptiveResult.includes('successfully')) {
            results.success.push('🎴 Teams Adaptive Card');
            gs.addInfoMessage('✅ Teams Adaptive Card test completed!');
        } else {
            results.warnings.push(`🎴 Teams adaptive: ${teamsAdaptiveResult}`);
            gs.addWarningMessage(`⚠️ Teams adaptive test: ${teamsAdaptiveResult}`);
        }
    } catch (teamsAdaptiveError) {
        results.errors.push(`🎴 Teams adaptive: ${teamsAdaptiveError.message}`);
        gs.addWarningMessage(`⚠️ Teams adaptive error: ${teamsAdaptiveError.message}`);
    }
    
    // Test Slack notifications (both formats)
    try {
        const slackSimpleResult = handler.testNotifications(current, 'slack', 'simple');
        if (slackSimpleResult.includes('successfully')) {
            results.success.push('💬 Slack simple message');
            gs.addInfoMessage('✅ Slack simple message test completed!');
        } else {
            results.warnings.push(`💬 Slack simple: ${slackSimpleResult}`);
            gs.addWarningMessage(`⚠️ Slack simple test: ${slackSimpleResult}`);
        }
    } catch (slackSimpleError) {
        results.errors.push(`💬 Slack simple: ${slackSimpleError.message}`);
        gs.addWarningMessage(`⚠️ Slack simple error: ${slackSimpleError.message}`);
    }
    
    try {
        const slackRichResult = handler.testNotifications(current, 'slack', 'rich');
        if (slackRichResult.includes('successfully')) {
            results.success.push('🎨 Slack rich message');
            gs.addInfoMessage('✅ Slack rich message test completed!');
        } else {
            results.warnings.push(`🎨 Slack rich: ${slackRichResult}`);
            gs.addWarningMessage(`⚠️ Slack rich test: ${slackRichResult}`);
        }
    } catch (slackRichError) {
        results.errors.push(`🎨 Slack rich: ${slackRichError.message}`);
        gs.addWarningMessage(`⚠️ Slack rich error: ${slackRichError.message}`);
    }
    
    // Provide comprehensive summary
    const totalTests = results.success.length + results.warnings.length + results.errors.length;
    const successRate = Math.round((results.success.length / totalTests) * 100);
    
    let summaryMessage = `🧪 **Test Results Summary:**

**Successful (${results.success.length}):**
${results.success.length > 0 ? results.success.map(s => `• ${s}`).join('\n') : '• None'}

**Warnings (${results.warnings.length}):**
${results.warnings.length > 0 ? results.warnings.map(w => `• ${w}`).join('\n') : '• None'}

**Errors (${results.errors.length}):**
${results.errors.length > 0 ? results.errors.map(e => `• ${e}`).join('\n') : '• None'}

**Overall Success Rate:** ${successRate}%`;
    
    if (successRate === 100) {
        gs.addInfoMessage('🎉 All notification tests passed successfully!');
    } else if (successRate >= 50) {
        gs.addWarningMessage(`⚠️ Some notification tests failed. Success rate: ${successRate}%`);
    } else {
        gs.addErrorMessage(`❌ Most notification tests failed. Success rate: ${successRate}%`);
    }
    
    gs.addInfoMessage(summaryMessage);
    gs.addInfoMessage('📊 Check system logs for detailed execution results.');
    
    // Log comprehensive test results
    gs.info(`🧪 Comprehensive test completed for booking ${current.number}: ${results.success.length} success, ${results.warnings.length} warnings, ${results.errors.length} errors`);
    
} catch (error) {
    gs.error(`❌ Test All Notifications Critical Error: ${error.message}`);
    gs.addErrorMessage(`❌ Critical test error: ${error.message}`);
}

action.setRedirectURL(current);