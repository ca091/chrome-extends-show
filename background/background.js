// 浏览器按钮的图标单击时产生，如果浏览器按钮有弹出内容则不会触发该事件。
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.url)
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="blue"',
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, sendResponse)
  sendResponse(U.dateFtt(new Date()) + ': mei sha shu ju gei ni')
  return true
})
