# Contexts

Contexts 表示用户请求的当前上下文。这对于根据用户的偏好，地理位置，应用中的当前页面或对话主题区分可能模糊或具有不同含义的短语是有用的。

例如，如果用户正在听音乐并找到能够吸引他们兴趣的乐队，他们可能会这样说：“我希望听到更多音乐”。作为开发人员，您可以在请求的上下文中包含带的名称，以便代理可以在其他意图中使用它。

或者假设您是智能家居设备的制造商，并且您有一款可远程控制灯光和家用电器的应用程序。用户可能会说，“打开前廊灯”，然后是“关闭它”。通过设置上下文，应用程序将理解第二个短语是指第一个请求中的光。之后，如果用户说，“打开咖啡机”，然后“关闭”，由于新的上下文，它会导致与以前不同的操作。

## Adding Contexts

## Lifespan

默认情况下，意图中的上下文在五个请求之后或从激活时起十分钟之后过期。后续意图中的上下文具有两个请求的默认使用期限。更新上下文的意图将重置计数器和时钟以提供额外的五个请求和十分钟。

您可以通过点击当前使用寿命并输入所需数量的请求来更改上下文的生命周期。将寿命设置为 0 会在内容匹配时重置内容。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fr3w142ci6j30hg054wee.jpg)

## Output Contexts

上下文与用户会话（在 API 调用中传递的会话 ID）绑定。如果用户表达式与意图匹配，则意图可以设置将来由该表达式共享的输出上下文。将用户请求发送到 Dialogflow 代理时，您还可以添加上下文。

在我们的应用程序示例中，说“打开前廊灯”应将输出上下文设置为“前廊灯”。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr3w30fnkbj30k60iq74k.jpg)

可能有几个意图响应“关闭”，每个都有不同的输入上下文。由于输出上下文被设置为“front-porch-light”，因此将执行具有匹配输入上下文“front-porch-light”的“关闭”的意图，而其他所有意愿将不会执行。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr3w77sg4yj30k40imq38.jpg)

## Input Contexts

输入上下文仅限于在设置了某些上下文时限制意图匹配。

对于音乐的例子，我们会为“我想听到更多”这样的请求创建两个意图。当应用程序没有关于艺术家的信息时，没有上下文的意图将匹配用户的请求，因此它将需要从用户那里获得该信息。这是通过根据需要标记参数并提供提示来完成的。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fr3w8ze90dj30jx0hrjrp.jpg)

我们创建的另一个意图是具有输入上下文，其中包含有关用户请求所指的艺术家或乐队的信息。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr3w9zqtlij30js0mqmxl.jpg)

## Extracting Parameter Values from Contexts

要使用已定义的输出上下文引用已在意图中提取的参数值，请在 VALUE 列中使用以下格式：＃context_name.parameter_name
