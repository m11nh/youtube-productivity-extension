let home_slider = document.getElementById("home_slider")
let items = document.getElementById("items")

home_slider.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: removeItems,
    });
});

function removeItems() {
    let items = document.getElementById("items")
    if (items != null) {
        items.remove()
        console.log("hello"); 
    }
}