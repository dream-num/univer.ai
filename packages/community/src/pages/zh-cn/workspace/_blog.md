---
title: Univer
description: 协同生产力的进化 A Revolution in Collaborative Productivity
video: https://www.youtube.com/embed/kpV0MvQuFZA?si=aVLeeH-OBwec7eNo
---

<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/blog-all-in-one.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/blog-formula.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/formula20000.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/uniscript.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/live-share.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/import-and-export-text.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/zen-editor.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/nested.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/collaboration-playground.mp4" as="video" type="video/mp4" />
<link rel="preload" href="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/micky.mp4" as="video" type="video/mp4" />

Univer 诞生于一个简单而深刻的洞见：人们需要一个一站式的生产力平台，在这里，数据和信息可以不受文档类型的限制自由流动，将原本割裂的上下文重新连接起来。在 Univer，用户客户创建任何类型的页面。通过将表格、文档和幻灯片的功能融合在一起，Univer 为个人和团队提供了一个轻松无碍的创作、组织和优化工作流程的平台。

## All-In-One 解决方案

Univer 采用了前沿的架构设计方法论来融合不同的文档和类型，实现 all-in-one 的解决方案。我们将生产力工具抽象为三种关键的形态：表格、文本和画布。这三种形态构建在同一个核心架构上。并且通过插件化架构，诸如菜单、图片、图表和评论等通用功能可以在这三种形态之间共享和复用。

下面这个换成国内的 OSS 和中文字幕版 ⬇️

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/blog-all-in-one.mp4"
  controls
/>

<figcaption>这样我们也可以做到让数据在不同的形态之间交换和共享</figcaption>

以工具栏为例，`@univerjs/ui` 插件实现了一个 `IMenuService` 用于注册菜单项，以及在桌面端渲染工具栏的机制。与此相对应，`@univerjs/sheets-ui` 和 `@univerjs/docs-ui` 插件则分别针对电子表格和文档实现了右键菜单中的菜单项，它们会将这些菜单项注册到 `IMenuService`。当注册这些插件的时候，电子表格和文档的插件可以通过实现一个 `hidden$` 属性，用来告诉 `IMenuService` 应该在核实展示它们，例如：当用户当前操作的文件类型不是电子表格时，就不要展示电子表格的菜单项。

<div class="note">
  <span class="note-symbol">💡</span>
  <p>这样我们就可以对不同类型的文档提供一致和无缝的操作体验。</p>
</div>

![](/workspace/img1.png)

在 Univer 的设计当中有许多这样的 “底层机制” + “插件扩展” 的设计，诸如：

- 快捷键
- 复制粘贴
- 协同编辑
- 查找替换

> 想了解更多细节，请阅读 [Univer 架构](/zh-cn/guides/concepts-and-architecture/architecture)。

## 链接不同类型文档的公式引擎

Univer 的公式引擎面对的重要挑战是：同时支持在表格、文本和画布中嵌入公式，还要支持将**条件格式**、**数据验证**、**透视表**等高级功能集成到公式系统当中，并且整个过程中我们不能接受任何的性能方面或者稳定性方面的劣化。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/blog-formula.mp4"
  controls
/>

这里我们向大家简单介绍一下我们是如何支持在不同类型的文档中支持嵌入公式的。在文本文档或者幻灯片当中的公式会被包裹在一个叫做 **Foreign Formula Field** （外部公式域）的数据结构中。当 `Foreign Formula Field` 加载时，函数将会将它的依赖注册关系注册到公式引擎的 `Dependency` 模块中。你可以将 `Foreign Formula Field` 想象成一个虚拟工作表中的单元格。这种做法的好处是它处理起来就和电子表格内部的普通公式基本一致了。当公式计算完成的时候，我们监听向这个虚拟工作表写入计算结果的操作，最终将结果写入到 `Foreign Formula Field` 的缓存字段当中。

> 对于更细节的信息，请参考我们的 [公式引擎架构设计](/zh-cn/guides/concepts-and-architecture/formula)。

![](/workspace/img2.png)

而且 Univer 的公式系统支持在 **Web Worker** 当中运行，这样就可以在不阻塞用户体验的情况下进行公式计算。为了实现这个设计，我们开发了 `@univerjs/rpc` 插件，它的目的是让主线程和 Web Worker 之间的通信和在同一个线程内通信一样简单。而且 rpc 插件使得公式引擎对底层消息通道是无感知的，所以服务器端计算的支持也是非常容易实现的。

> 请阅读 [Web Worker 架构设计](/zh-cn/guides/concepts-and-architecture/web-worker) 了解更多详情。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/formula20000.mp4"
  controls
/>

<figcaption>即使有 20000 个公式，Univer 的使用者也不会感觉到任何的卡顿</figcaption>

## 命令系统与 AI 自动化

<div class="note">
  <span class="note-symbol">💡</span>
  <p>数据是 AI 应用的生命线。我们坚信：将用户行为（而不仅仅是文档的内容）转化为 AI 的训练数据，将会引领办公领域的生产力革命。</p>
</div>

命令系统可以将用户的操作和编辑转化为数据日志，它的引入为 Univer 带来了巨大的想象空间，我们基于命令系统实现了 **undo/redo / 协同编辑 / 离线缓存 / 协同浏览（Live Share）/ 服务端计算** 等等。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/live-share.mp4"
  controls
/>

<figcaption>演示的协同编辑、协同光标和协同浏览功能均基于记录和回放用户操作实现</figcaption>

<div class="note">
  <span class="note-symbol">💡</span>
  <p>并且，记录到的用户的操作和编辑日志可以被用于训练 AI，释放无穷的可能性</p>
</div>

![](/workspace/img3.png)

在命令系统的基础上，我们开发了 **Uniscript**，它是一个基于 AI 的脚本引擎。通过将 Uniscript 与命令系统集成，我们从学习用户行为到将其应用于工作场景中迈出了第一步。Univer 的 AI 引擎 Uniscript 为工作流自动化开辟了新的视野。从生成定制报告模板到集成特定数据源，Uniscript 将繁琐重复的任务转化为自动化流程。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/uniscript.mp4"
  controls
/>

<figcaption>通过执行 Uniscript 生成 Univer 的 Logo</figcaption>

## 兼容 Office 文档模式

尽管 SaaS 生产力工具种类繁多，但 Office 和 Google Suite 仍然是最广泛采用的。因此，我们的策略是保持与传统格式的兼容性，同时通过引入新特性以及优化用户体验以提高生产力。为此我们开发了一套 **导入/导出** 功能，在高保真还原内容的同时，它还有着不错的性能。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/import-and-export-text.mp4"
  controls
/>

<figcaption>导入导出 Excel 格式文件 <a href="https://univer.ai/pro-examples/sheets-exchange/">在线 Demo</a></figcaption>

<div class="table">
  <table>
    <thead>
      <tr>
        <th>单元格数量</th>
        <th>导入耗时（秒）</th>
        <th>导出耗时（秒）</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>100k (500rows/50cols/4sheets)</td>
        <td>1.3</td>
        <td>1.1</td>
      </tr>
      <tr>
        <td>500k (2500rows/50cols/4sheets)</td>
        <td>6.6</td>
        <td>5.6</td>
      </tr>
      <tr>
        <td>1m (5000rows/50cols/4sheets)</td>
        <td>13.4</td>
        <td>11.6</td>
      </tr>
      <tr>
        <td>5m (25000rows/50cols/4sheets)</td>
        <td>67.8</td>
        <td>60.7</td>
      </tr>
      <tr>
        <td>10m (50000rows/50cols/4sheets)</td>
        <td>135.9</td>
        <td>115.5</td>
      </tr>
    </tbody>
  </table>
</div>

<figcaption>导入导出性能数据</figcaption>

## 通用渲染引擎

为了提升文档、表格和幻灯片的集成体验，Univer 开发了基于 Canvas 的渲染引擎。Univer 的单元格编辑器、公式编辑器和文档共享相同的排版能力。

这样的创新推动我们重新思考了表格单元格的限制：

<div class="note">
  <span class="note-symbol">❓</span>
  <p>为什么单元格内容不能直接是一篇文档呢？</p>
</div>

为了说明这个概念，请看下面的示例。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/zen-editor.mp4"
  controls
/>

一个更复杂和更有挑战性的问题则是：

<div class="note">
  <span class="note-symbol">❓</span>
  <p>我们可以将文档、表格和幻灯片相互嵌套，并渲染在同一个 Canvas 上吗？</p>
</div>

![](/workspace/img4.png)

我们在渲染引擎当中实现了一个 `SceneViewer` 元素，它可以持有一个 `Scene` 并且本身可以作为另一个 `Scene` 的子元素，并且它的位置以及宽高都可以调整。`Scene` 可以理解为渲染其他文档的容器元素。在绘制过程中，它会将它的布局约束信息传递给它持有的 `Scene` 并绘制 `Scene` 的内容。通过这样的方式，不同文档的内容就可以在同一个 canvas 上得到渲染。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/nested.mp4"
  controls
/>

<figcaption>将电子表格或文档插入幻灯片当中</figcaption>

> 欲知详情，请阅读我们的 [渲染引擎架构](/zh-cn/guides/concepts-and-architecture/rendering)。

## 兼容多文档类型的协同编辑

协同编辑是一项颇具挑战性的任务，它涉及到**多副本一致性 / 离线编辑 / 版本管理 / undo redo** 等难题。在 Univer 当中，需要支持多种文档类型这一需求使得这个难题变得更加复杂。好在，通过在不同类型文档之间复用协同机制，我们极大地降低了复杂度。为了更好地适应 Univer
的使用场景，也为了更精细地解决冲突处理和意图保持问题，我们最终选择了 [操作转换 Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) 作为协同解决方案。我们开发了一个 `TransformService`，它可以允许上层应用注册转换算法。如此一来，支持不同文档的协同编辑仅需要实现这些算法并注册到该服务上。

![](/workspace/img5.png)

> 这篇博客 [OT 算法以及 Univer 的协同编辑设计](https://univer.ai/zh-cn/blog/ot/) 介绍了 OT 的详细原理并介绍了 Univer 的一些实现细节。

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/collaboration-playground.mp4"
  controls
/>

<figcaption>Univer 的协同编辑测试工具</figcaption>

Univer 的服务端关注水平扩展性与性能，它被设计为支持分布式系统以提供更高的并发性。主要使用两种编程语言实现，即 **Go** 和 **JavaScript**。

- Go 在构建高并发系统和高速的网络 I/O 等方面表现出色，它使得 Univer 的协同引擎可以更轻松地应对大规模的用户连接请求。
- JavaScript (Node.js) 使得服务端可以与前端复用代码，极大程度的降低了冲突处理的开发成本和出错的概率，并且为后续的服务端渲染和服务端计算打好了基础。

![](/workspace/img6.png)

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/micky.mp4"
  controls
/>

<figcaption>通过 Univer 的协同编辑功能绘制 Mickey</figcaption>

协同引擎的性能测试量表如下图所示。在保证稳定性和可靠性的前提下，Univer 协同引擎展示了很好的性能。从图中可以看到，在一台常规的 4 核 8GB 内存服务器上服务 **200 名并发用户**，协同引擎成功将编辑延迟控制在 **1.3 秒** 以内，令人印象深刻。我们会不断提升引擎的能力来支持更大规模的并发用户编辑，同时将延迟保持在尽可能低的水平。

![](/workspace/img7.png)

<figcaption>协同引擎测试结果</figcaption>

## 官方解决方案

<!-- TODO@jikkai: add Pro version? -->

<div class="two-columns">
  <div>
    <label>开源版</label>
    <a href="https://univer.ai/">https://univer.ai/</a>
  </div>
  <div>
    <label>SaaS 版 - 即将上线</label>
    <a href="https://univer.ai/workspace/">https://univer.ai/workspace/</a>
  </div>
</div>

## 源自开发者 服务开发者

<div class="note">
  <span class="note-symbol">💡</span>
  <p>我们不止将 Univer 作为一个工具来建设，它还是我们理想中的协同生产力平台。</p>
</div>

我们非常期待听到您的想法、反馈以及您如何在工作流程中使用 Univer。加入我们的 Discord 群组聊天，深入讨论、分享见解，并与其他用户建立联系，探索 Univer 的可能性。让我们一起共同构建更好的未来。

- [Discord](https://discord.gg/z3NKNT6D2f)
- [Github](https://github.com/dream-num/univer)
- [Twitter](https://twitter.com/univerHQ)

在我们的技术博客中，我们将定期更新关于Univer核心技术的文章。希望您会发现它们有用。

- [文档排版设计](/zh-cn/blog/doc-typesetting-design)
- [Univer 文档架构](/zh-cn/blog/univer-doc-architecture)
