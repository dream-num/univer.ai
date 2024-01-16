---
title: Creating Websocket
sidebar:
  order: 4
---

## Creating a Websocket [Coming Soon]

Facade provides a convenient API `createSocket` for creating a Websocket, simply by passing in a URL. You can then listen to open, message, close, and error events, and actively send messages with the send method and actively close with the close method.

```typescript title="main.ts"
// Replace the URL with the address of your own Websocket service
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

  // Upon receiving collaborative data, it is locally saved
  univerAPI.executeCommand(id, params, options)
});

ws.close$.subscribe(() => {
  console.log("websocket closed");
});

ws.error$.subscribe((error) => {
  console.log("websocket error", error);
});

univerAPI.onCommandExecuted((command, options) => {
  // Only synchronize local mutations
  if (command.type !== 2 || options?.fromCollab || options?.onlyLocal || command.id === 'doc.mutation.rich-text-editing') {
    return;
  }

  const commandInfo = JSON.stringify({ command, options: { fromCollab: true } })
  ws.send(commandInfo);
})
```

Note: Make sure there is a unitID when starting Univer. If the unitID is not specified, collaboration will not work.