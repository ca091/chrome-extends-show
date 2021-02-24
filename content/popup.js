// chrome.runtime.sendMessage({action: 'getPath'}, res => {
//   console.log(res)
// })

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(sender.tab ? '来自内容脚本：' + sender.tab.url : '来自扩展程序')
//   console.log(request.navigationTiming)
//   console.log(request.resourceListMap)
//   sendResponse({data: 'get'})
// })

function sendMessageToContentScript(message, cb) {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, message, response => {
      cb && cb(response)
    })
  })
}

function setList(data, id) {
  // let isArray = data instanceof Array
  let ul = document.createElement('ul')
  for (let e of data) {
    let li = document.createElement('li')
    // li.textContent = e
    li.innerHTML = e
    ul.appendChild(li)
  }
  document.getElementById(id).appendChild(ul)
}

function initEvents() {
  let performanceAnalysis = document.getElementById('performance-analysis')
  let jsonParseExecute = document.getElementById('json-parse-execute')

  // let jsonFromClipboard = document.getElementById('json-from-clipboard')
  // let desktopCapture = document.getElementById('desktop-capture')

  // desktopCapture.addEventListener('click', () => {
  //   chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], null, (streamId, options) => {})
  // })

  performanceAnalysis.addEventListener('click', () => {
    // 请求 analysis performance
    sendMessageToContentScript({cmd: 'performance'}, response => {
      let re = JSON.parse(response)
      console.log('来自 content 的回复：', re)
      let { navigationTiming, resourceListMap } = re
      let timing = navigationTiming[0]
      delete timing.serverTiming
      let timingList = []
      let resourceList = []
      for (let key of Object.keys(timing)) {
        timingList.push(`${key}: ${timing[key]}`)
      }
      for (let r of resourceListMap) {
        resourceList.push(`<div>name: ${r.name}</div> <div>duration: ${r.duration}</div>`)
      }
      setList(timingList, 'navigationTiming')
      setList(resourceList, 'resourceList')
    })
  })

  jsonParseExecute.addEventListener('click', () => {
    let jsonResource = document.getElementById('json-resource')
    let jsonResult = document.getElementById('json-result')
    let text = jsonResource.innerText.trim()
    if (!text.length) return
    let result = ''
    try {
      result = JSON.stringify(JSON.parse(text), null, 2)
      jsonResult.innerHTML = ''
      let pre = document.createElement('pre')
      pre.innerHTML = result
      jsonResult.appendChild(pre)
    } catch (e) {
      console.warn(e)
    }
  })
}

initEvents()
