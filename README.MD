- 扩展程序大致架构
- 扩展程序特定概念
- 扩展程序调试
- 扩展程序能够访问强大的 API
- inspired by
[扩展程序基础](https://crxdoc-zh.appspot.com/extensions/getstarted)
[扩展程序开发](https://crxdoc-zh.appspot.com/extensions/overview)

## other article

- [简书 chrome 插件开发](https://www.jianshu.com/p/157327fd7b23)

- [developer.chrome extension docs](https://developer.chrome.com/docs/extensions/)

## 事件页面：background（js需要在manifest注册，按顺序加载）

- 不可以访问 DOM

## 内容脚本：content_scripts

- 执行环境：隔离，不能访问当前页面创建的任何 JavaScript 变量或函数

- 可以访问所在页面的 DOM

- 使用[消息](https://crxdoc-zh.appspot.com/extensions/messaging)传递信息

## popup.html

- 点击icon打开弹出层时加载，每次点击打开会重新加载

## summery

| js type        | access api                        | access DOM | access JS |
| :------------- | :-------------------------------: | :--------: | ---------:|
| injected js    | 和普通的js一样；不能访问任何扩展API     | can        | can       |
| content script | 只能访问 extension/runtime等部分API  | can        | can not   |
| pupup js       | 可访问大部分API，除了devtools         | can not    | can not  |
| background js  | 可访问大部分API，除了devtools         | can not    | can not  |
| devtool js     | devtools/extension/runtime等部分API | can       | can      |

# todo

1. JSON.parse ✅

2. fetch interceptor

3. analysis performance ✅

4. analysis performance: list resource (资源清单) ✅

5. [google analytics for tracking customer behavior](https://developer.chrome.com/docs/extensions/mv2/tut_analytics/)

6. screen shoot
