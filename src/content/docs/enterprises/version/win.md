---
title: Windows
---

## Quick Start

### 1. Obtain Univer Service

Download the binary compressed package

``` url
https://release-univer.oss-cn-shenzhen.aliyuncs.com/release-demo/windows.zip
```

Create a separate directory and extract all the contents of the compressed package to that directory

### 2. Start Univer Service

```bash
Execute the `start_apps.bat` file with a double-click.
```

### 3. Create and Access

Copy the URL link into the browser, locally experience the joy of Univer collaboration

```url
http://localhost:3010/
```

![Example](../imgs/img1.png)

Note: Locally open different browsers or use incognito mode to experience collaboration!

![Example](../imgs/img2.png)

### 4. Share

You can also copy the browser link and send it to friends in the same network to experience Univer collaboration together

Remember to replace localhost with the local IP url

```url
http://localhost:3010/?unit=17443300120626831361&type=2
//如 http://192.168.50.172:3010/?unit=17443300120626831361&type=2
```

## Remarks

### How to Find Local IP

1.按下 Win+R

2.输入 powershell,打开命令提示符

3.复制以下命令并执行

``` bash
ipconfig | findstr /R /C:"IPv4" | findstr /v "127.0.0.1"
```

![ip](../imgs/win_ip.png)

### 如何停止服务

```bash
chmod +x ./stop_apps.sh
```

```bash
./stop_apps.sh
```

### 如何开放防火墙权限

```bash
netsh advfirewall set allprofiles state off
```

### 如何恢复防火墙权限

```bash
netsh advfirewall set allprofiles state on
```

## 占用端口

| service       | port      | description          |
|---------------|-----------|----------------------|
| universer     | 8000，9000 | api http server      |
| univer-server | 5001，5002 | collaboration server |
| univer-client | 3010      | frontend             |
