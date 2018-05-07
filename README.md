# dialogflow

dialogflow research

Dialogflow 是一款企业级 NLU 平台，可让开发人员轻松设计并将会话用户界面集成到移动应用程序，Web 应用程序，设备和机器人中。

## Introduction

这是一个部署在 heroku 上的 nodejs webhook 应用程序，也就是 dialogflow 的 fulfillment

![fulfillment](https://ws2.sinaimg.cn/large/006tKfTcgy1fqzlmeah6wj31kw0tvgp7.jpg)

dialogflow 的 fulfillment 的 webhook 的 URL 地址是: 部署在 heroku 上的应用程序的外网地址，例如https://safe-cove-50851.herokuapp.com/

但是这里为什么 URL 的 Path 是`/action`呢？

因为 dialogflow fulfillment 的 webhook 需要符合一定的标准，或者说要求，详见https://dialogflow.com/docs/fulfillment

还需要在 dialogflow 的 intents 中开启 webhook

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fqzl8d2ijaj31kw0tvadn.jpg)

最后的流程是这样：

用户在 dialogflow 的测试控制台中输入"How's the weather in Denver tomorrow" ==> dialogflow 的 agent 会进行自然语言分析，意图检测等，例如，收集用户自然语言中的 entities(日期，城市)，转换成 request body 数据 ==>  发送 POST 请求（带着日期，城市等参数）到 fulfillment 的部署在 heroku 上的 webhook ==> 触发 webhook，提取日期，城市参数，将这些参数作为查询字符串调用第三方天气服务，获取天气信息 ==> 返回给 dialogflow 的测试控制台

## GCP

本项目 GCP web 控制台地址： https://console.cloud.google.com/home/dashboard?project=weather-f549d&folder&organizationId

When deploying, Cloud Functions will look for a file named index.js or function.js. If you've provided a package.json file that contains a "main" entry, then Cloud Functions will look for the specified file instead.

* 查看 gcloud config

```bash
➜  dialogflow git:(master) ✗ gcloud config list
[core]
account = novaline@qq.com
disable_usage_reporting = True
project = weather-489c2

Your active configuration is: [default]
```

* 部署 google cloud functions 时出现的错误

```bash
dialogflow git:(master) ✗ gcloud beta functions deploy helloGET --trigger-http
ERROR: (gcloud.beta.functions.deploy) ResponseError: status=[403], code=[Forbidden], message=[Permission denied on resource project weather-489c2.]
```

原因：在 GCP 上，我新建了一个项目 weather-f549d， 项目 weather-489c2 被我 shutdown，执行上述命令进行部署 google cloud functions 的时候就会出现错误， 因为 gcloud config 指定的 project 依旧是被 shutdown 的项目 weather-489c2

解决：需要修改 gcloud config 中的 project 属性，如下

```bash
➜  dialogflow git:(master) ✗ gcloud config set project weather-f549d
Updated property [core/project].
```

再次查看 gcloud config

```bash
➜  dialogflow git:(master) ✗ gcloud config list
[core]
account = novaline@qq.com
disable_usage_reporting = True
project = weather-f549d

Your active configuration is: [default]
```

然后部署

```bash
➜  dialogflow git:(master) ✗ gcloud beta functions deploy helloHttp --trigger-http
Deploying function (may take a while - up to 2 minutes)...done.
availableMemoryMb: 256
entryPoint: helloHttp
httpsTrigger:
  url: https://us-central1-weather-f549d.cloudfunctions.net/helloHttp
labels:
  deployment-tool: cli-gcloud
name: projects/weather-f549d/locations/us-central1/functions/helloHttp
serviceAccountEmail: weather-f549d@appspot.gserviceaccount.com
sourceUploadUrl: https://storage.googleapis.com/gcf-upload-us-central1-9246fd29-60f1-4b91-86a3-5834db85e1b1/f1f46858-9fe8-45b6-b473-841d2da8ef97.zip?GoogleAccessId=931752480490@cloudservices.gserviceaccount.com&Expires=1525417110&Signature=PAQyzKIPWbXqCIq0Wqv70PUJCl4S4THF3C9agUZHSNOu2JRrN8TJasIQQ%2Bd2iQ7zDQT1iI%2B1%2F7fbsKno1jdy4Pw31mwEoWI964bZ4A6DyIAIFmhtY97mA%2BTdF2R9%2BZFpFPbwY8XD9T1ySCWgGLrTpE3cvegcU3tfjd5O6FZ%2FJb0QS2ir%2F75JnDBm05lhRBgXAv37mjV6HKNMqquvhOVtLtHC1MdAgU3DN1Zg6jrbIlyNjvD4%2BjizCQCj2mIUleseIkj65HqFMvkO9pvE7zPbxnEJn7s%2BU2PTHOIr86y0tgOnbkLlzDYKAOUuKYacbjssLld%2BS1fUHXfV%2FnTxZCf1Ig%3D%3D
status: ACTIVE
timeout: 60s
updateTime: '2018-05-04T06:28:33Z'
versionId: '2'
```

访问https://us-central1-weather-f549d.cloudfunctions.net/helloHttp地址验证是否部署成功

* Unexpected error while acquiring application default credentials: Could not load the default credentials.

```bash
➜  dialogflow git:(master) ✗ node src/index.js
Error: Unexpected error while acquiring application default credentials: Could not load the default credentials. Browse to https://developers.google.com/accounts/docs/application-default-credentials for more information.
    at GoogleAuth.<anonymous> (/Users/ldu020/workspace/dialogflow/node_modules/google-auth-library/build/src/auth/googleauth.js:235:31)
    at step (/Users/ldu020/workspace/dialogflow/node_modules/google-auth-library/build/src/auth/googleauth.js:47:23)
    at Object.next (/Users/ldu020/workspace/dialogflow/node_modules/google-auth-library/build/src/auth/googleauth.js:28:53)
    at fulfilled (/Users/ldu020/workspace/dialogflow/node_modules/google-auth-library/build/src/auth/googleauth.js:19:58)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:182:7)
```

解决：

终端中执行`export GOOGLE_APPLICATION_CREDENTIALS="/Users/ldu020/workspace/dialogflow/weather-f1f38a2189f9.json"`，设置 `GOOGLE_APPLICATION_CREDENTIALS` 环境变量；

或者指定秘钥文件如下：

```js
new dialogflow.SessionsClient({
  keyFilename: path.resolve(__dirname, '../weather-f1f38a2189f9.json')
});
```

## 参考

https://dialogflow.com/docs/getting-started/basics
