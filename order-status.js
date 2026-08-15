/**
 * NORTHSTAR SPRINT — DEFLECTION MVP MODULE
 * MEMBER 3 FEATURE: TICKET TYPE 1(ORDER STATUS)
 * File Name: order-status.js
 */

// Initialize an independent database cache array for order objects
let orderLookupDatabase = [];

// Load the source dataset from Member 2's JSON file as soon as the window opens
window.addEventListener('load', async () => {
    try {
        const response = await fetch('orders.json');
        if (!response.ok) throw new Error('Failed to load orders dataset.');
        orderLookupDatabase = await response.json();
        console.log("Member 3 Module: Order status data loaded successfully.");
    } catch (error) {
        console.error("Member 3 Module Error:", error);
    }
});

/**
 * Core Core Workflow Trigger: Guides the user to provide an Order ID
 */
function processOrderStatusIntent() {
    const chatBox = document.getElementById('chatBox');
    
    // Create a bot chat bubble prompt cleanly matching Member 1's framework classes
    const botBubble = document.createElement('div');
    botBubble.className = 'message bot-message';
    botBubble.innerHTML = "📦 **Order Tracking Service**:<br>Please enter your 4-digit Order ID (e.g., 1001, 1002) below to view your tracking shipment data:";
    
    chatBox.appendChild(botBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Set an independent tracking flag attribute on the chat box container
    chatBox.setAttribute('data-order-search-active', 'true');
}

/**
 * Search Engine Lookup: Queries the array for matching tracking indicators
 * @param {string} inputId 
 */
function executeOrderSearch(inputId) {
    const chatBox = document.getElementById('chatBox');
    const cleanId = inputId.trim();
    
    // Find the record matching the user's input key string
    const targetRecord = orderLookupDatabase.find(item => item.order_id === cleanId);
    
    const responseBubble = document.createElement('div');
    responseBubble.className = 'message bot-message';
    
    if (targetRecord) {
        responseBubble.innerHTML = `🔍 **Order Status Found for ID #${targetRecord.order_id}**:<br>
        • Item: ${targetRecord.product_name}<br>
        • Status: **${targetRecord.order_status}**<br>
        • Carrier: ${targetRecord.carrier}<br>
        • Tracking Reference: ${targetRecord.tracking_number}`;
    } else {
        responseBubble.innerHTML = `⚠️ **Order Reference Not Located**:<br>
        Could not find an order matching "#${cleanId}". Re-routing this session loop to human customer support desks...`;
    }
    
    // Remove the search routing state flag cleanly
    chatBox.removeAttribute('data-order-search-active');
    
    chatBox.appendChild(responseBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}
