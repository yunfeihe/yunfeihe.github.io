---
title: 《javascript高级程序设计》阅读笔记
date: 2018-07-21 11:41:12
categories: 
- 编程
tags: 
- javascript
- 编程笔记
---
本文的目的旨在记录js红宝书重要但不经常使用的知识要点。

---

## script元素相关
* 对于带有src属性的script元素，浏览器解析的时候会忽略script内部的js代码。也就是说只会下载执行外部脚本文件，忽略嵌入script元素内部的代码。
* script的**defer**属性，如果一个script元素其defer属性被指定，脚本会被**立即下载**但是**延迟**到页面加载完成后再执行。
* html5中script元素定义了**async**属性，效果类似defer属性，只适用于外部脚本文件，且不保证脚本的执行顺序遵顼其出现的顺序。

```javascript
//ps:defer和async属性的用法
<script type="text/javascript" async src="./foo.js"></script>       
//出现即为真值
<script type="text/javascript" defer src="./foo.js"></script> 
//同上
```

## 文档模式

