// background.js
chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('anilist.co')) {
        /*         chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js'],
        }); */
    } else {
        chrome.tabs.create({ url: 'https://www.anilist.co' });
    }
});
