# Intents

意图表示用户说出的内容与软件应采取的操作之间的映射。

意图接口具有以下部分：

* Training Phrases

* Action

* Response

* Contexts

## Training Phrases

每个用户都表示表达式可以处于两种模式之一: Example Mode (indicated by the " icon) or Template Mode (indicated by the@ icon).

Examples 用自然语言书写并加注解，以便可以提取参数值。您可以阅读更多关于下面的注解。

Templates 包含对实体的直接引用而不是注解，即实体名称以@符号为前缀。

要切换模式，请单击“或@图标。

我们推荐使用 Examples 而不是 Templates，因为它更容易，机器学习以这种方式更快地学习。请记住：您添加的例子越多，代理人变得越聪明。

## Example Annotation

Annotation 是将单词（或短语）链接到实体的过程（也是这种过程的结果）。

### 自动注解

当您将示例添加到“用户说”部分时，它们会自动注解。系统检测单词（或短语）与现有开发人员和系统实体之间的对应关系，并突出显示这些单词和短语。它还会自动为每个检测到的实体分配一个参数名称。

### 编辑自动注解的示例

您可以在单击注解示例时打开的查看窗口或“Action”部分的参数表中编辑分配给它的链接实体和参数名称。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fr3wr2vxldj30ie0cjdg2.jpg)

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr3wr81jmgj30ip09kjri.jpg)

在审阅窗口和参数表中自动注解的结果是同步的。如果您在审阅窗口中更改了某些内容，相应的更改将自动发生在参数表中，反之亦然。

请注意，在审阅窗口和参数表中进行的更改具有不同的范围：

* 审阅窗口中的更改不会影响包含相同注解的其他示例。

* 参数表中的更改将影响具有相同注解的所有'User says'示例。

你可以做 3 种改变：

* 为示例的注解部分分配一个不同的实体

* 编辑参数名称

* 删除注解（即，删除单词和实体之间的链接）。

**本地更改（在一个示例中）**

* 在一个示例中，要为注解指定不同的实体，请单击突出显示的短语。将出现一个弹出窗口，您可以从现有系统或开发人员实体列表中进行选择。

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fr3x53qzk8j30hu0dodg8.jpg)

* 在一个示例中，要更改参数名称，请单击示例并在审阅窗口中编辑参数名称。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr3x6fn0gdj30i0093aa6.jpg)

* 要删除注解，请单击弹出窗口中的垃圾箱图标或相应行中的 X 图标。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fr3x7u78f5j30hv094q32.jpg)

**整个意图的改变（在参数表中）**

* 要为所有示例中用相同颜色突出显示的部分指定不同的实体，请单击参数表中的实体。在弹出窗口中，从现有系统或开发人员实体列表中进行选择。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fr3xanxl9tj30hj0d0wes.jpg)

* 要通过所有示例更改注解的参数名称，请编辑参数表中的参数名称。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fr3xc71w53j30hu065wej.jpg)

* 要删除所有示例中的特定注解，请单击参数表中相应行右侧的菜单图标，然后从下拉菜单中选择删除。

![](https://ws2.sinaimg.cn/large/006tKfTcgy1fr3xc71w53j30hu065wej.jpg)

### 手动注解

如有必要，您可以手动注释示例，方法是选择一个单词或短语，然后选择现有实体或在弹出窗口中创建一个新实体。

## 搜索选项

如果您需要查找特定示例或模板，则可以在用户说部分中搜索关键字。

![](https://ws3.sinaimg.cn/large/006tKfTcgy1fr3xe4w9enj30hz060mx5.jpg)

## Action

本节由操作名称字段和参数表组成。

action name 是手动定义的。这将是您的应用执行特定操作的触发字。

Parameters 可以从'Users says'示例和模板自动填写，或手动添加。

## Response

在本节中，您可以定义您的代理的响应，当意图被触发时，您的应用程序将提供该响应。

### 文字回应

您可以通过为每个意图添加文本响应的几个变体来提高您的代理口才。当同一个意图被触发不止一次时，不同的文本响应变化将不可重复，直到所有选项都被使用。

### 对参数值的引用

响应可以包含对参数值的引用。

如果参数表中存在参数，请使用以下格式在“文本响应”字段中引用其值：$parameter_name。

有些特殊参数值类型不会自动出现在参数表中。

如果您需要引用这种特殊类型的值，则必须向参数表中添加一个新参数，手动定义其值，然后在响应中将其作为 $parameter_name 引用。

Use the following formats:

* $parameter_name.original – to refer to the original value of the parameter

* $parameter_name_for_composite_entity.inner_alias – to refer to a value of one of the composite entity components

* #context_name.parameter_name – to reference a parameter value collected in some other intent with defined context
