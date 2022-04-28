// background.js
chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("anilist.co")) {
  } else {
    chrome.tabs.create({ url: "https://www.anilist.co" });
  }
});
