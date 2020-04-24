最近在抽空研究 `React` 源码, 在 `ReactDOM.render` 的调用链中看到一段有趣的代码:
```js
// React v16.13.1
// 出自 ReactDOMLegacy.js 文件
function getReactRootElementInContainer(container: any) {
  if (!container) {
    return null;
  }

  // DOCUMENT_NODE => 9
  if (container.nodeType === DOCUMENT_NODE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}
```

小朋友, 你是不是有很多疑问🤔️... `nodeType` 是啥, `nodeType === 9` 又是什么意思？ 

## HTML DOM Element 对象
在介绍 `nodeType` 之前, 不得不说一下包含它的父级对象: `HTML DOM Element`, 以及一系列的相关概念。

### HTML DOM 节点
在 `HTML DOM` （文档对象模型）中，每个部分都是节点：
- 文档本身是文档节点
- 所有 `HTML` 元素是元素节点
- 所有 `HTML` 属性是属性节点
- `HTML` 元素内的文本是文本节点
- 注释是注释节点

### Element 对象
在 `HTML DOM` 中，`Element` 对象表示 `HTML` 元素。  
`Element` 对象可以拥有类型为元素节点、文本节点、注释节点的子节点。  
`NodeList` 对象表示节点列表，比如 `HTML` 元素的子节点集合。  
元素也可以拥有属性。属性是属性节点。

> 如果看完这一部分简介还是不太了解, 可以继续看这里:  
> [HTML DOM](https://baike.baidu.com/item/HTML%20DOM/4585925)

这篇讲讲节点(`Node`)类型常会被忽视的属性：**nodeType**。

## nodeType
### 定义
`nodeType` 属性返回以数字值返回指定节点的节点类型。

> 是的, 你没有看错! 它的定义就只有一句话!

### 语法
```js
node.nodeType
```

### 属性
文档、元素、属性以及 `HTML` 或 `XML` 文档的其他方面拥有不同的节点类型。  
存在 **12** 种不同的节点类型，其中可能会有不同节点类型的子节点：

常量名 | 常量值 | 节点类型 | 描述 | 子节点
-- | -- | -- | -- | --
`Node.ELEMENT_NODE` | 1 | Element | 代表元素 | Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference
`Node.ATTRIBUTE_NODE` | 2 | Attr | 代表属性 | Text, EntityReference
`Node.TEXT_NODE` | 3 | Text | 代表元素或属性中的文本内容 | None
`Node.CDATA_SECTION_NODE` | 4 | CDATASection | 代表文档中的 `CDATA` 部分(不会由解析器解析的文本) | None
`Node.ENTITY_REFERENCE_NODE` | 5 | EntityReference | 代表实体引用 | Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
`Node.ENTITY_NODE` | 6 | Entity | 代表实体 | Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
`Node.PROCESSING_INSTRUCTION_NODE` | 7 | ProcessingInstruction | 代表处理指令 | None
`Node.COMMENT_NODE` | 8 | Comment | 代表注释 | None
`Node.DOCUMENT_NODE` | 9 | Document | 代表整个文档(`DOM` 树的根节点) | Element, ProcessingInstruction, Comment, DocumentType
`Node.DOCUMENT_TYPE_NODE` | 10 | DocumentType | 向为文档定义的实体提供接口 | None
`Node.DOCUMENT_FRAGMENT_NODE` | 11 | DocumentFragment | 代表轻量级的 Document 对象，能够容纳文档的某个部分 | Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
`Node.NOTATION_NODE` | 12 | Notation | 代表 `DTD` 中声明的符号 | none

其中**常用**的有 `1`, `2`, `3`, `8`, `9` 这五个属性。

### 例子
```js
const div = document.createElement('div');
div.id = 'root';
div.innerText = '我是一个 Element 节点';

const attr = div.getAttributeNode('id');
const text = div.firstChild;

div.nodeType; // ==> 1
attr.nodeType; // ==> 2
text.nodeType; // ==> 3
```

> 想要了解更多有关节点的信息可以继续学习 `nodeName`, `nodeValue`.