---
title: 操作范围
sidebar:
  order: 4
---

## 创建 Websocket [即将开放]

Facade 提供了一个便捷的 API `createSocket` 来创建 Websocket，传入一个 url 即可。
然后可以监听 open、message、close、error 事件，以及主动发送消息 send 方法和主动关闭 close 方法。

```typescript title="main.ts"
const ws = univerAPI.createSocket("ws://47.100.177.253:8449/ws");

ws.open$.subscribe(() => {
  console.log("websocket opened");
  ws.send("hello");
});

ws.message$.subscribe((message) => {
  console.log("websocket message", message);
  const content = JSON.parse(message.data).content
  if (content.indexOf('command') === -1) {
    return;
  }

  const commandInfo = JSON.parse(content);
  const { command, options } = commandInfo;
  const { id, params } = command;

  // 接受到协同数据，本地落盘
  univerAPI.executeCommand(id, params, options)
});

ws.close$.subscribe(() => {
  console.log("websocket closed");
});

ws.error$.subscribe((error) => {
  console.log("websocket error", error);
});

univerAPI.onCommandExecuted((command, options) => {
  // 仅同步本地 mutation
  if (command.type !== 2 || options?.fromCollab || options?.onlyLocal || command.id === 'doc.mutation.rich-text-editing') {
    return;
  }

  const commandInfo = JSON.stringify({ command, options: { fromCollab: true } })
  ws.send(commandInfo);
})
```
