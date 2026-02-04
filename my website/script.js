function calculateInventory() {

    const currentStock = Number(document.getElementById("currentStock").value);
    const dailyDemand = Number(document.getElementById("dailyDemand").value);
    const leadTime = Number(document.getElementById("leadTime").value);
    const orderingCost = Number(document.getElementById("orderingCost").value);
    const holdingCost = Number(document.getElementById("holdingCost").value);

    const annualDemand = dailyDemand * 365;

    // EOQ Formula
    const eoq = Math.sqrt((2 * annualDemand * orderingCost) / holdingCost);

    // Reorder Level Formula
    const reorderLevel = dailyDemand * leadTime;

    document.getElementById("eoqResult").innerText = eoq.toFixed(2);
    document.getElementById("rolResult").innerText = reorderLevel.toFixed(2);

    const decisionBox = document.getElementById("decisionBox");
    const stockStatus = document.getElementById("stockStatus");

    // AI-based rule logic
    if (currentStock <= reorderLevel) {
        decisionBox.innerText = "🔔 Order Now! Stock has reached Reorder Level.";
        decisionBox.className = "alert danger";
        stockStatus.innerText = "Stock-out Risk";
    } 
    else if (currentStock > reorderLevel && currentStock <= reorderLevel + eoq) {
        decisionBox.innerText = "✅ Stock is at Optimal Level.";
        decisionBox.className = "alert safe";
        stockStatus.innerText = "Optimal";
    } 
    else {
        decisionBox.innerText = "⚠ Overstock Detected.";
        decisionBox.className = "alert danger";
        stockStatus.innerText = "Overstock";
    }
}
