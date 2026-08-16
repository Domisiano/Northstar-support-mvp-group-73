/**
 * NORTHSTAR SPRINT — DEFLECTION MVP MODULE
 * MEMBER 4 FEATURE: TICKET TYPE 2 (RETURNS & REFUNDS)
 * File Name: refund-tracker.js
 */

// Initialize an independent database cache array for financial items
let refundLookupDatabase = [];

// Load the source dataset from Member 2's JSON file as soon as the window opens
window.addEventListener('load', async () => {
    try {
        const response = await fetch('orders.json');
        if (!response.ok) throw new Error('Failed to load refund dataset.');
        refundLookupDatabase = await response.json();
        console.log("Member 4 Module: Refund tracking data loaded successfully.");
    } catch (error) {
        console.error("Member 4 Module Error:", error);
    }
});

/**
 * Core Workflow Trigger: Surfaces the returns policy documentation
 */
function processReturnPolicyIntent() {
    const chatBox = document.getElementById('chatBox');
    
    // Create a bot chat bubble presenting Member 4's explicit policy parameters
    const policyBubble = document.createElement('div');
    policyBubble.className = 'message bot-message';
    policyBubble.innerHTML = `🔄 **Northstar Return Policy Rules**:<br>
    1. Items must be returned securely within **30 days** of delivery.<br>
    2. Products must remain completely unworn and in original brand packaging.<br><br>
    To check the active monetary processing state of an existing return item, click below:`;
    
    chatBox.appendChild(policyBubble);
    
    // Create an action button to prompt the specific status tracking function
    const btnGroup = document.createElement('div');
    btnGroup.className = 'button-group';
    btnGroup.innerHTML = `<button class="action-btn" onclick="promptRefundLookup()">💰 Check Refund Status</button>`;
    
    chatBox.appendChild(btnGroup);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/**
 * Prompts the user to type their tracking data key
 */
function promptRefundLookup() {
    const chatBox = document.getElementById('chatBox');
    const promptBubble = document.createElement('div');
    promptBubble.className = 'message bot-message';
    promptBubble.innerHTML = "💳 **Refund Tracking Status**:<br>Please type the 4-digit Order ID for your return claim below and press Send:";
    
    chatBox.appendChild(promptBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Set a completely unique tracking flag state on the chat box container
    chatBox.setAttribute('data-refund-search-active', 'true');
}

/**
 * Search Engine Lookup: Queries the array for financial processing milestones
 * @param {string} inputId 
 */
function executeRefundSearch(inputId) {
    const chatBox = document.getElementById('chatBox');
    const cleanId = inputId.trim();
    
    // Scan Member 2's dataset array for the matching reference profile item
    const targetRecord = refundLookupDatabase.find(item => item.order_id === cleanId);
    
    const responseBubble = document.createElement('div');
    responseBubble.className = 'message bot-message';
    
    if (targetRecord) {
        responseBubble.innerHTML = `💸 **Refund Profile Located for ID #${targetRecord.order_id}**:<br>
        • Product: ${targetRecord.product_name}<br>
        • Refund Processing State: **${targetRecord.refund_status}**`;
    } else {
        responseBubble.innerHTML = `⚠️ **Refund Reference Not Located**:<br>
        Could not locate a return record matching "#${cleanId}". Escalating this query string to a manual agent handler...`;
    }
    
    // Remove Member 4's search state flag cleanly
    chatBox.removeAttribute('data-refund-search-active');
    
    chatBox.appendChild(responseBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}
