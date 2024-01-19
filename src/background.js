chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");

  // Other code for onInstalled event...
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
  if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
});

chrome.contextMenus.create({
  id: "wikipedia",
  title: 'Search for: "%s" on Wikipedia',
  contexts: ["selection"],
});
