updateToggleElements('navigation', getNavigationElements())
updateToggleElements('recommendations', getRecommendationElements())

function getNavigationElements() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    return [navigation_section_1, navigation_section_2, navigation_button, recommended_content]
}

function getRecommendationElements() {
    let recommended_videos_element = document.querySelector('div[id="related"]')
    return [recommended_videos_element]
}

function updateToggleElements(toggle_name, elements) {
    chrome.storage.sync.get([toggle_name], (result) => {
        let show_content = result[toggle_name]
        if (show_content == true) {
            for (const e of elements) {
                e.style.display = ""
            }
            console.log(show_content, toggle_name)
        } else {
            for (const e of elements) {
                e.style.display = "none"
            }
        }
    })
}