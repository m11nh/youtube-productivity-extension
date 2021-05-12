// update the home depending on what's inside storage
updateHome()
// inject content script into guide button, that executes whenever button is clicked
/*
    - get the button
    - add event listener, when clicked, 
        - determine if guite menu has been toggled
        - if yes
            - get home_icon_enabled from storage
            - update the icon accordingly 
*/ 
let guide_button = document.getElementById("guide-button").querySelector('[id="button"]')
console.log(guide_button)
guide_button.addEventListener('click', () => {
    chrome.storage.sync.get(['home_icon_enabled'], (result) => {
        let home_icon_enabled = result["home_icon_enabled"]
        let home_icon_2 = document.querySelector('a[id="endpoint"][title="Home"]')
        if (home_icon_enabled && home_icon_enabled == false) {
            home_icon_2.style.display = "none"
        }
    })
})

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
