function getPerformance() {
  const filters = [
    'img',
    'css',
    'script',
  ]

  let navigationTiming = performance.getEntriesByType('navigation')

  let resourceListMap = performance.getEntriesByType('resource')
      .filter(i => filters.includes(i.initiatorType))
      .map(r => ({name: r.name, duration: r.duration, transferSize: (r.transferSize / 1024).toFixed(1)})) // 不分析是否gzip
      .sort((a, b) => {
        return a.duration > b.duration ? 1 : -1
      })

  return {
    navigationTiming,
    resourceListMap
  }
}

// sendMessage 是与 background 通信
// chrome.runtime.sendMessage({navigationTiming, resourceListMap, title: 'test title'}, response => {
//   console.log('send success, get response: ', response)
// })

// let laserExtensionId = 'ekmdephpabkdffcpdhiiknlhgbebajaa'
// chrome.runtime.sendMessage(laserExtensionId, {navigationTiming, resourceListMap}, response => {
//   console.log('send 2 success, get response: ', response)
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'performance') {
    sendResponse(JSON.stringify(getPerformance()))
  }
})
