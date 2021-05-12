let home_slider = document.getElementById("home_slider")
// Update home_slider to reflect chrome.storage
chrome.storage.sync.get(['home_icon_enabled'], async (result) => {
    if (result.home_icon_enabled == true) {
        home_slider.checked = false
    } else {
        home_slider.checked = true
    }
})


  
// Adds event whenever home slider is clicked
home_slider.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    // retrieve home button status
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: handleHomeSliderClick,
    });
});

/*
    If home slider is checked off, update the storage and remove home link, 
    otherwise if it is enabled, update the storage and un-hide the home link.
*/
function handleHomeSliderClick() {
    let home_icon_1 = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Home"]')
    let home_icon_2 = document.querySelector('a[id="endpoint"][title="Home"]')
    chrome.storage.sync.get(['home_icon_enabled'], (result) => {
        let home_icon_enabled = result["home_icon_enabled"]
        if (home_icon_enabled && home_icon_enabled == true) {
            chrome.storage.sync.set({'home_icon_enabled': false}, () => {
                home_icon_1.style.display = "none"
                home_icon_2.style.display = "none"
            })
        } else {
            chrome.storage.sync.set({'home_icon_enabled': true}, () => {
                if (home_icon_2) { home_icon_2.style.display = "" }
                if (home_icon_1) { home_icon_1.style.display = "" }
            })
        }
    })
}

