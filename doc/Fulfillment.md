# Fulfillment

## Webhook

设置 webhook 可以让你将匹配意图的信息传递给 Web 服务并从中获取结果。

### Request

您的 Web 服务收到来自 Dialogflow 的 POST 请求。这是对用户查询的响应形式，与启用 webhook 的意图相匹配。确保您的 Web 服务满足特定于此代理中启用的 API 版本的所有 webhook 要求。

如果从其中一个消息传递平台发送请求，则将 originalRequest 字段添加到对查询的响应中。

选择此格式是为了在 Dialogflow SDK 的帮助下简化服务端的响应分析。

对服务的请求可以包含以下字段：

| name                        | type   | description                                                   |
| --------------------------- | ------ | ------------------------------------------------------------- |
| responseId                  | String | 请求的唯一 ID                                                 |
| session                     | String | 唯一的会话 ID                                                 |
| queryResult                 | Object | 对话查询或事件处理的结果                                      |
| originalDetectIntentRequest | Object | 完整的请求来自一个集成平台。 （Facebook Messenger，Slack 等） |
