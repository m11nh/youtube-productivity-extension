let navigation_toggle = document.getElementById("navigation_toggle")
let recommendations_toggle = document.getElementById("recommendations_toggle")
// let comments_toggle = document.getElementById("comments_toggle")

function updateToggle(toggle_element, toggle_name) {
    chrome.storage.sync.get([toggle_name], async (result) => {
        if (result.toggle_name == false) {
            toggle_element.checked = false
        } else {
            toggle_element.checked = true
        }
    })
}

updateToggle(navigation_toggle, "navigation")
updateToggle(recommendations_toggle, "recommendations")
// updateToggle(comments_toggle, "comments")

function addToggleEventListener(toggle_element, event_handler) {
    toggle_element.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        // retrieve home button status
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: event_handler,
        });
    });
}
addToggleEventListener(navigation_toggle, handleNavigationToggleClick)
addToggleEventListener(recommendations_toggle, handleRecommendationsToggleClick)
/*
    If home slider is checked off, update the storage and remove home link, 
    otherwise if it is enabled, update the storage and un-hide the home link.
*/
function handleNavigationToggleClick() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    chrome.storage.sync.get(['navigation'], (result) => {
        let navigation = result["navigation"]
        if (navigation == true) {
            chrome.storage.sync.set({'navigation': false}, () => {
                navigation_section_1.style.display = "none"
                navigation_section_2.style.display = "none"
                navigation_button.style.display = "none"
                recommended_content.style.display = "none"
            })
        } else {
            chrome.storage.sync.set({'navigation': true}, () => {
                if (navigation_section_1) { navigation_section_1.style.display = "" }
                if (navigation_section_2) { navigation_section_2.style.display = "" }
                if (navigation_button) { navigation_button.style.display = "" }
                if (recommended_content) { recommended_content.style.display = "" }
            })
        }
    })
}

function handleRecommendationsToggleClick() {
    let recommended_videos_element = document.querySelector('div[id="related"]')
    console.log(recommended_videos_element)
    chrome.storage.sync.get(['recommendations'], (result) => {
        let recommendations = result["recommendations"]
        if (recommendations == true) {
            chrome.storage.sync.set({'recommendations': false}, () => {
                recommended_videos_element.style.display = "none"
            })
        } else {
            chrome.storage.sync.set({'recommendations': true}, () => {
                if (recommended_videos_element) { recommended_videos_element.style.display = "" }
            })
        }
    })
}


