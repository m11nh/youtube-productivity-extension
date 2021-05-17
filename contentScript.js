updateNavigation()

function updateNavigation() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    chrome.storage.sync.get(['navigation'], (result) => {
        let navigation = result["navigation"]
        if (navigation == true) {
            navigation_section_1.style.display = ""
            navigation_section_2.style.display = ""
            navigation_button.style.display = ""
            recommended_content.style.display = ""
        } else {
            navigation_section_1.style.display = "none"
            navigation_section_2.style.display = "none"
            navigation_button.style.display = "none"
            recommended_content.style.display = "none"
        }
    })
}
