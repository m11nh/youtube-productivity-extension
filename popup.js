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
    let items = document.getElementById("items").querySelector('[aria-label="Home"]')
    if (items) {
        items.remove()
    }
    // Remove the home icon when the guide button is toggled
    // Determine if the guide button has been toggled
    let guideButton = document.getElementById("guide-button").querySelector("#button")
    guideButtonPressed = guideButton.getAttribute("aria-pressed")
    console.log("Hello world!")
    if (guideButtonPressed) {
        // Get the home element to remove
        items = document.getElementById("items").children
        console.log(items)
        for (i = 0; i < items.length; i++) {
            x = items[i].querySelector('[id="endpoint"]')
            if (x && x.getAttribute("title") == "Home") {
                items[i].remove() 
            }
        }
    }
}
