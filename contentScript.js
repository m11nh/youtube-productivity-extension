// update the home depending on what's inside storage
// use mutationObserver
// const targetNode = document.getElementById('items') 
// const config = { attributes: true, childList: true, subtree: true }
// const callback = function(mutationsList, observer) {
//     console.log("observing")
//     console.log(mutationsList)
//     for (const mutation in mutationsList) {
//         if (mutation.type === 'childList') {
//             console.log('A child node has been added or removed')
//         }
//         else if (mutation.type === 'attributes') {
//             console.log('The ' + mutation.attributeName + ' attribute was modified.')
//         }
//     }
// }
// const observer = new MutationObserver(callback)
// observer.observe(targetNode, config)

updateNavigation()
// inject content script into guide button, that executes whenever button is clicked
/*
    - get the button
    - add event listener, when clicked, 
        - determine if guite menu has been toggled
        - if yes
            - get home_icon_enabled from storage
            - update the icon accordingly 
*/ 
// let navigation_toggle = document.getElementById("navigation_toggle").querySelector('[id="button"]')
// guide_button.addEventListener('click', () => {
//     chrome.storage.sync.get(['navigation_enabled'], (result) => {
//         let navigation_enabled = result["navigation_enabled"]
//         let home_icon_2 = document.querySelector('a[id="endpoint"][title="Home"]')
//         if (navigation_enabled == false) {
//             home_icon_2.style.display = "none"
//         }
//     })
// })

function updateNavigation() {
    let navigation_section_1 = document.querySelector('ytd-mini-guide-renderer')
    let navigation_section_2 = document.querySelector('div[id="contentContainer"]')
    let navigation_button = document.querySelector('yt-icon-button[id="guide-button"]')
    let recommended_content = document.querySelector('ytd-browse')
    chrome.storage.sync.get(['navigation_enabled'], (result) => {
        let navigation_enabled = result["navigation_enabled"]
        if (navigation_enabled == true) {
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
