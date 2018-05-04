# Actions and Parameters

## Actions

一个 Action 对应于您的应用程序在用户输入触发特定 intent 时将采取的步骤。

Actions 可以具有用于从用户请求中提取信息的 parameters，并且将在 JSON 响应中以下列格式显示：

```json
{“action”:”action_name”}
{“parameter_name”:”parameter_value”}
```

action 名称及其 parameters 在 intent 的 Action 部分中定义。例如，如果您正在构建发送消息的应用程序，则 Action 部分将包含操作的名称以及任何自动定义或手动添加的参数值。

## Parameters

parameters 是通常用于将用户响应中的词连接到 entities 的元素。在对查询的 JSON 响应中，以下列格式返回参数：

```json
{“parameter_name”:”parameter_value”}
```

Parameters 出现在两个不同的区域。在 Training Phrases 部分，添加示例后，与已知 entities 相关的 parameters 将被突出显示（注释）。在示例中单击带注解的单词，将显示包含所选 entity 数据的表格。
