let navigation_toggle = document.getElementById("navigation_toggle")
updateToggle(navigation_toggle, "navigation")
addToggleEventListener(navigation_toggle, handleNavigationToggleClick)

let recommendations_toggle = document.getElementById("recommendations_toggle")
updateToggle(recommendations_toggle, "recommendations")
addToggleEventListener(recommendations_toggle, handleRecommendationsToggleClick)

let comments_toggle = document.getElementById("comments_toggle")
updateToggle(comments_toggle, "comments")
addToggleEventListener(comments_toggle, handleCommentsToggleClick)

// Updates the toggle icon in the popup 
function updateToggle(toggle_element, toggle_name) {
    chrome.storage.sync.get([toggle_name], (result) => {
        let show_content = result[toggle_name]
        if (show_content == true) {
            toggle_element.checked = false
        } else {
            toggle_element.checked = true
        }
    })
}

// adds an event handler to a provided toggle element
function addToggleEventListener(toggle_element, event_handler) {
    toggle_element.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: event_handler,
        });
    });
}

// event handler to deal with clicking on navigation toggle
function handleNavigationToggleClick() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    chrome.storage.sync.get(['navigation'], (result) => {
        let show_content = result["navigation"]
        if (show_content == true) {
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

// event handler to deal with clicking on recommendations toggle
function handleRecommendationsToggleClick() {
    let recommended_videos_element = document.querySelector('div[id="related"]')
    chrome.storage.sync.get(['recommendations'], (result) => {
        let show_content = result["recommendations"]
        if (show_content == true) {
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

// event handler to deal with clicking on comments toggle
function handleCommentsToggleClick() {
    let comments_element = document.querySelector('ytd-comments[id="comments"]')
    chrome.storage.sync.get(['comments'], (result) => {
        let show_content = result["comments"]
        if (show_content == true) {
            chrome.storage.sync.set({'comments': false}, () => {
                comments_element.style.display = "none"
            })
        } else {
            chrome.storage.sync.set({'comments': true}, () => {
                if (comments_element) { comments_element.style.display = "" }
            })
        }
    })
}

