let navigation_toggle = document.getElementById("navigation_toggle")
// Update navigation_toggle to reflect chrome.storage
chrome.storage.sync.get(['navigation_enabled'], async (result) => {
    if (result.home_icon_enabled == true) {
        navigation_toggle.checked = false
    } else {
        navigation_toggle.checked = true
    }
})


  
// Adds event whenever home slider is clicked
navigation_toggle.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    // retrieve home button status
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: handleNavigationSliderClick,
    });
});

/*
    If home slider is checked off, update the storage and remove home link, 
    otherwise if it is enabled, update the storage and un-hide the home link.
*/
function handleNavigationSliderClick() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    chrome.storage.sync.get(['home_icon_enabled'], (result) => {
        let home_icon_enabled = result["home_icon_enabled"]
        if (home_icon_enabled == true) {
            chrome.storage.sync.set({'home_icon_enabled': false}, () => {
                navigation_section_1.style.display = "none"
                navigation_section_2.style.display = "none"
                navigation_button.style.display = "none"
                recommended_content.style.display = "none"
            })
        } else {
            chrome.storage.sync.set({'home_icon_enabled': true}, () => {
                if (navigation_section_1) { navigation_section_1.style.display = "" }
                if (navigation_section_2) { navigation_section_2.style.display = "" }
                if (navigation_button) { navigation_button.style.display = "" }
                if (recommended_content) { recommended_content.style.display = "" }
            })
        }
    })
}

