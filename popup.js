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
    let home1 = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Home"]')
    let home2 = document.querySelector('a[id="endpoint"][title="Home"]')
    if (home1) { home1.remove() }
    if (home2) { home2.remove() }
}
