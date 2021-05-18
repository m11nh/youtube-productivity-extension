updateToggleElements('navigation', getNavigationElements())
updateToggleElements('recommendations', getRecommendationsElements())
updateToggleElements('comments', getCommentsElements())

// returns list of navigational elements on the DOM
function getNavigationElements() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    return [navigation_section_1, navigation_section_2, navigation_button, recommended_content]
}

// returns list containing recommended videos related elements on the DOM
function getRecommendationsElements() {
    let recommended_videos_section = document.querySelector('div[id="related"]')
    return [recommended_videos_section]
}

// returns list containing comments related elements on the DOM
function getCommentsElements() {
    let comment_section = document.querySelector('ytd-comments[id="comments"]')
    return [comment_section] 
}

// given a toggle name and elements, hides or unhides the elements depending on whether the toggle is active or not
function updateToggleElements(toggle_name, elements) {
    chrome.storage.sync.get([toggle_name], (result) => {
        let show_content = result[toggle_name]
        if (show_content == true) {
            for (const e of elements) {
                e.style.display = ""
            }
        } else {
            for (const e of elements) {
                e.style.display = "none"
            }
        }
    })
}