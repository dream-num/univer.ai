---
title: 试用商业版
---

:::note
该版本为降低试用门槛，简化了部分服务配置，此方法不适用于生产环境。如您有更高级的需求请[联系我们](/enterprises/#获取商业版)获取完整部署镜像。
:::

> 数据库使用了SQLite代替PostgreSQL。 消息队列使用内存代替RabbitMQ。

## 环境要求

1. CPU: 1 核
2. 内存: 2G
3. 磁盘：10G
4. 系统: Linux, Mac, windows

## 快速上手
[linux快速上手指南](/enterprises/#Linux)

[mac快速上手指南](/enterprises/#Mac)

[windows快速上手指南](/enterprises/#Windows)

## 占用端口

| service       | port      | description          |
|---------------|-----------|----------------------|
| universer     | 8000，9000 | api http server      |
| univer-server | 5001，5002 | collaboration server |
| univer-client | 3010      | frontend             |
