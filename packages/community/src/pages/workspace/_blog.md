---
title: Introducing Univer
description: A Revolution in Collaborative Productivity
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

Univer was born from a simple yet profound insight: the need for a one-stop productivity platform where data and information can flow freely, without the constraints of disjointed contexts or the hassle of switching formats. With Univer, we enable users to create any forms of page as they wish. By merging sheet, doc and slide's capabilities together, Univer empowers individuals and teams to create, organize and streamline workflows without barriers.

## All-In-One Solution

Univer has embraced cutting-edge architectural methodologies to achieve an all-in-one solution through documents, files and formats. We abstracted productivity tools into three key applications: **table, text, and canvas**. These three applications are developed on one core framework. Furthermore, by implementing a plug-in architecture, functionalities such as images, shapes, charts, and comments can be reused across all three applications.

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/blog-all-in-one.mp4"
  controls
/>

<figcaption>This approach also enables data to be shared and exchanged between applications.</figcaption>

Taking the toolbar as an example, the `@univerjs/ui` plugin offers the `IMenuService` for registering menu items, as well as rendering the toolbar for desktop devices. Meanwhile, the `@univerjs/sheets-ui` and `@univerjs/docs-ui` plugins can implement the context menu items for spreadsheets and documents, respectively, and register these items with `IMenuService`. When registering menu items, plugins can determine to show or hide certain menu items by specifying the `hidden$` property, for example, hiding all spreadsheet menu items if users are not working on a spreadsheet.

<div class="note">
  <span class="note-symbol">💡</span>
  <p>This approach not only provides consistent user interaction across various document formats, but also renders the correct buttons based on the type of document the user is currently working with.</p>
</div>

![](/workspace/img1.png)

Univer’s infrastructure integrates plugins with universality and inclusivity in mind, supporting features like:

- Shortcut key
- Copy & paste
- Collaborative editing
- Find & replace
- And more.

For detailed information, please check out the [Univer Architecture Document](/guides/concepts-and-architecture/architecture).

## Formula Engine Linking Different Documents

The primary challenge of Univer’s formula engine is to support various applications such as **table, text, and canvas**, along with associated capabilities such as **condition format, data validation, and pivot table** to be integrated into the formula dependency calculation mechanism. And of course, we don’t accept any compromise in performance and stability when integrating these features.

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/blog-formula.mp4"
  controls
/>

Formulas in documents or slides would be wrapped in a special data structure named **_Foreign Formula Field_**. When a **_Foreign Formula Field_** gets loaded, the formula would register its dependencies to the formula engine's _Dependency_ module. You can assume the **_Foreign Formula Field_** as a cell in a virtual worksheet. The advantage of this approach is that it implements formula dependency and calculation cohesively. Once the formula calculation is done, the operation of writing the calculation results back to the virtual worksheet would be intercepted and ultimately the results would be writen to **_Foreign Formula Field_**.

> For detailed information, please check out the [Formula Engine Architecture Document](/guides/concepts-and-architecture/formula).

![](/workspace/img2.png)

Additionally, Univer’s formula engine now supports executing calculation within **Web Worker**, allowing formula calculation with zero blockage for user experience. To faciliate this design, we developed the `@univerjs/rpc` plugin aimming to make cross-thread communication between the main-thread and web-worker as straightforward as communicating within the same thread. What's more, the rpc plugin makes the formula engine agnostic to the underlying message channel, so server side calculating would be easy to implement as it was for Web Worker.

> For detailed information, please check out the [Web Worker Architecture Document](/guides/concepts-and-architecture/web-worker).

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/formula20000.mp4"
  controls
/>

<figcaption>Univer does not block user experience when computing 20,000 functions.</figcaption>

## AI-Drive Automation with Command System

<div class="note">
  <span class="note-symbol">💡</span>
  <p>Data is vital for AI applications. We strongly believe in the power of converting user behavior into data for AI training, which can lead to revolution breakthrough in the office domain.</p>
</div>

We created **Uniscript**. By integrating it with the command system, we’ve taken steps from learning user behaviors to applying them in everyday scenarios. Univer’s **AI-powered Uniscript** opens new horizons for workflow automation. From generating tailored report templates to integrating specific data sources, **Uniscript** transforms tedious, repetitive tasks into automated processes.

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/uniscript.mp4"
  controls
/>

<figcaption>Execute Uniscript code to generate the Univer logo.</figcaption>

The command system opens up numerous possibilities for Univer, transforming user actions into digital user behavior. By recording and replaying these data, it enables functionalities like **undo/redo, collaborative editing, offline cache, live share, and server-side computing**.

<div class="note">
  <span class="note-symbol">💡</span>
  <p>Moreover, this data on user behavior can be utilized for AI training, unlocking endless potentials for efficiency.</p>
</div>

![](/workspace/img3.png)

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/live-share.mp4"
  controls
/>

<figcaption>The live share feature implemented by the command system.</figcaption>

## Compatibility with Office File Formats

> Despite the vast array of SaaS productivity tools in the market, Office and Google Suite are still the most widely adopted.

Therefore, our strategy focuses on maintaining compatibility with traditional formats while optimizing the user experience to boost productivity. To achieve this, we’ve developed a set of **import / export** feature, which ensures maximum format compatibility.

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/import-and-export-text.mp4"
  controls
/>

<figcaption>Import and Export xlsx Files, <a href="https://univer.ai/pro-examples/sheets-exchange/">online demo.</a></figcaption>

<div class="table">
  <table>
    <thead>
      <tr>
        <th>Spread Cell Count</th>
        <th>Import (s)</th>
        <th>Export (s)</th>
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

<figcaption>Import and Export Performance Benchmark</figcaption>

## General Render Engine

To enhance the integration of doc, sheet, and slide for an unparalleled experience, Univer has developed a rendering engine based on canvas. As a result, Univer’s cell editor, formula editor, and document all share the same typesetting capability.

This innovation pushes us to rethink the limitation of a spreadsheet cell:

<div class="note">
  <span class="note-symbol">❓</span>
  <p>Why can’t a cell also function as a document?</p>
</div>

For an illustration of how this works, please check out the example below.

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/zen-editor.mp4"
  controls
/>

<figcaption>Univer's Full-screen editing feature.</figcaption>

A more complex and intriguing challenge would be:

<div class="note">
  <span class="note-symbol">❓</span>
  <p>How can we enable doc, sheet and slide to nest with each other, and render on the same canvas?</p>
</div>

![](/workspace/img4.png)

We have implemented a `SceneViewer` element, which can hold a `Scene` and can also be added as a rendering element to another `Scene`, with the ability to adjust the position and width-height of the `SceneViewer`. The `Scene` can be understood as a container for a document rendering element. During canvas drawing, it will use its own layout information as a layout constraint for the Scene it holds and then draw its content. In this way, different document contents can be drawn on the same canvas.

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/nested.mp4"
  controls
/>

<figcaption>Insert sheet/doc into Univer Slide</figcaption>

> For detailed information, please check out the [Architecture of Rendering Engine Document](/guides/concepts-and-architecture/rendering).

## Collaborative Editing for All Document Types

Collaborative editing is a challenging issue. It involve **cross-platform consistency, offline availablity, version management, undo & redo**, etc. In Univer, the presence of various document types makes collaborative editing even more complex. However, by reusing the collaborative mechanism for different types of documents, we cut off tons of complexity. Since data processing is the priority for this platform, to better adapt to collaborative tasks in spreadsheet related scenarios and preserve user intent, we ultimately chose the [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) collaborative solution (OT). We’ve developed a `TransformService` that allows transformation algorithms to be registered. So supporting different types of documents is just writing transformation algorithms and registering them to the service.

![](/workspace/img5.png)

> For detailed information, please check out the [OT algorithm and Univer's Collaborative Editing Design Document](https://univer.ai/blog/ot/).

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/collaboration-playground.mp4"
  controls
/>

<figcaption>Univer Collaborative Editing Debugging Environment</figcaption>

The Univer server focuses on scalability and performance, designed to support distributed systems for greater concurrency and performance. It primarily uses two programming languages: _Golang_ and _Node.js_.

- Golang excels in handling intense concurrency and rapid network I/O, allowing the Univer collaboration engine to easily handle excessive client connection requests.
- Node.js shares JavaScript code with the frontend, significantly reducing the error rate in handling collaborative conflicts and establishing a crucial foundation for future server-side computation and rendering.

![](/workspace/img6.png)

<video
  src="https://docs-assets-us-west.oss-us-west-1.aliyuncs.com/univer.ai/workspace/micky.mp4"
  controls
/>

<figcaption>Create a cute Mickey Mouse using Univer collaborative editing service.</figcaption>

With those benchmark results, the Univer Collaboration Engine distinctly showcases outstanding performance in real-time collaboration while maintaining stability and reliability. The graph demonstrates that when handling **200 concurrent users** on a modest 4-core 8GB server, the engine manages to keep collaboration delays remarkably low at around **1.3 seconds**. We will continue to improve the engine’s ability to support a large number of concurrent users while keeping latency to a minimum.

![](/workspace/img7.png)

<figcaption>Collaborative editing benchmark.</figcaption>

## Solutions

<div class="two-columns">
  <div>
    <label>Open-source Version</label>
    <a href="https://univer.ai/">https://univer.ai/</a>
  </div>
  <div>
    <label>SaaS Version - coming soon</label>
    <a href="https://univer.ai/workspace/">https://univer.ai/workspace/</a>
  </div>
</div>

In our technical blog, we will periodically update articles about Univer's core technology, for example:

- [Document Typesetting Design](/blog/doc-typesetting-design)
- [Univer Document Architecture](/blog/univer-doc-architecture)

## For Developers, by Developers

<div class="note">
  <span class="note-symbol">💡</span>
  <p>We’re building Univer not just as a tool, but as a collaborative productivity platform. </p>
</div>

We’re keen to hear your thoughts, feedback, and how you envision using Univer in your workflow. Join our Discord group chat to dive deeper into discussions, share insights, and connect with fellow users to explore the possibility of Univer. Let’s build better, together.

- [Discord](https://discord.gg/z3NKNT6D2f)
- [Github](https://github.com/dream-num/univer)
- [Twitter](https://twitter.com/univerHQ)
