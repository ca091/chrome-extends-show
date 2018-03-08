chrome.runtime.sendMessage({action: 'getPath'}, res => {
    console.log(res)
});