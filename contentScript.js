updateHome()
function updateHome() {
    let home_icon_1 = document.querySelector('ytd-mini-guide-entry-renderer[aria-label="Home"]')
    let home_icon_2 = document.querySelector('a[id="endpoint"][title="Home"]')
    chrome.storage.sync.get(['home_icon_enabled'], (result) => {
        let home_icon_enabled = result["home_icon_enabled"]
        if (home_icon_enabled && home_icon_enabled == true) {
            home_icon_1.style.display = ""
            home_icon_2.style.display = ""
        } else {
            home_icon_1.style.display = "none"
            home_icon_2.style.display = "none"
        }
    })
}
