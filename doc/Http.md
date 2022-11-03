- `http`：超文本传输协议，明文传输，信息不安全。用的是80端口
- `https`：安全套接字超文本传输协议，有ssl/tsl证书，信息安全。用的443端口

### https
一个`HTTPS`请求实际上包含了两次`HTTP`传输, 第一次客户端发起请求, 服务器保存私钥并发送公钥到客户端, 第二次请求, 客户端发送加密过的内容到服务器。

![https](./images/https/https.webp)