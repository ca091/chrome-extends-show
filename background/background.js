//浏览器按钮点击
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(tab.url);
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="blue"'
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message, sender, sendResponse);
    sendResponse(U.dateFtt(new Date()) + ': mei sha shu ju  gei ni');
    return true;
});