---
title: Univer Blog Title
description: Motivated by the desire to minimize the cost of context switching and solve real life use cases, Univer brings collaborative productivity software to you and your teams in a transformative way.
video: https://www.youtube.com/embed/dQw4w9WgXcQ
---

## Title

### Univer enhances user experience with seamless interactions

Univer allows you to open or edit on a 2 way split editor window. With a simple drag and drop, you can move the chart generated from the data in the sheet into the slide. When you want to quickly find differences in pages, simply put them side by side and diffs between pages will get automatically highlighted. Plus with synchronous scrolling, you would be able to pinpoint and fixate on their goals in an instant.

There are more surprises waiting for you. If you are interested in it, please join the discord group chat and communicate with us!

To realize the borderless concept, the development team implemented numerous targeted designs for the architecture. Here, we wish to share some of our practical experiences with you all.

### Univer enhances user experience with seamless interactions

Universal supports multiple document types, each with distinct data structures, UI, rendering, and business logic. Despite these differences, similar functions, such as menus, search and replace, and text styling, are required across different document types. To provide a seamless user experience across all document types while keeping the codebase decoupled, we designed a plugin-based architecture.

Universal boasts a compact yet highly extensible core, accompanied by a plethora of plugins. These plugins can extend Universal's capabilities, building upon the core and existing plugins.

## Title 2

Take the toolbar as an example. The @univerjs/ui plugin provides an IMenuService for registering menu items, as well as a React component named Toolbar for rendering the toolbar on desktop clients. Meanwhile, the @univerjs/sheets-ui and @univerjs/docs-ui plugins implement the context menus for electronic tables and documents, respectively, and register these menu items with IMenuService. When registering menu items, plugins can specify the hidden$ property to determine when a particular menu item should be shown or hidden, such as hiding all electronic table menus when a user's focus is not on an electronic table document. This ensures consistent user interaction across document types and enables the rendering of appropriate buttons based on the user's current document type.

![](/)

To learn more about Univer's collaborative module, please read our blog.

[The OT algorithm and Univer's Collaborative Editing Design | Univer](/)

### Univer enhances user experience with seamless interactions

Take the toolbar as an example. The @univerjs/ui plugin provides an IMenuService for registering menu items, as well as a React component named Toolbar for rendering the toolbar on desktop clients. Meanwhile, the @univerjs/sheets-ui and @univerjs/docs-ui plugins implement the context menus for electronic tables and documents, respectively, and register these menu items with IMenuService. When registering menu items, plugins can specify the hidden$ property to determine when a particular menu item should be shown or hidden, such as hiding all electronic table menus when a user's focus is not on an electronic table document. This ensures consistent user interaction across document types and enables the rendering of appropriate buttons based on the user's current document type.
