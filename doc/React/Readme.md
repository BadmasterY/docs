## React 相关面试题及答案
> 题目出自: [http://react-china.org/t/topic/33558](http://react-china.org/t/topic/33558)  
> 部分问题并没有进行作答, 该部分为废弃 `api`, 没用过, 不常用或者类型相似的问题。需要的可以在问题作者的 [issues](https://github.com/haizlin/fe-interview/issues/) 里自行检索。

### React 相关
#### 1. 什么时候使用状态管理器?
> 解题要点: 理解 `React` 状态管理器的作用

从项目的整体看:
- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式(比如普通用户和管理员)
- 多个用户之间可以协作
- 与服务器大量交互, 或者使用了 `WebSocket`
- 视图层要从多个来源获取数据

从组件角度看:
- 某个组件的状态, 需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

#### 2. render 函数中 return 如果没有使用 () 会有什么问题？
> 解题要点: `jsx` 只是语法糖, 最终解析结果都是 `js` 代码。而 `js` 代码会在每行自动添加**分号**(;)。

分情况, 一种是加不加都可以:
```jsx
const Header = () => {
    return <header>header</header>;
}

// or

const Header = () => {
    return (<header>header</header>);
}
```

另一种, 必须添加:
```jsx
// 如果不想出现解析异常, 最好加上括号
const Header = () => {
    return (<header>
        header
        </header>
    );
}
```

#### 3. componentWillUpdate 可以直接修改 state 的值吗？
> 解题思路: 理解 `React` 每个生命周期函数钩子的含义。

`componentWillUpdate` 从名字上就可以理解, 组件即将更新。

从题目来看, `componentWillUpdate` 中直接修改 `state` 貌似没什么问题, 但是也没有什么用, 毕竟想要更新 `state` 的值还是要通过 `setState` 函数。

而这个函数会触发新的 `componentWillUpdate` 钩子, 所以, 如果在 `componentWillUpdate` 更新状态(`setState`)会造成组件的无限更新。

#### 4. 说说你对 React 的渲染原理的理解
> 解题思路: 理解 `React` 底层运行机制。

简单来说就是将 `jsx` 代码编译为 `js` 代码, 再通过 `js` 代码创建虚拟 `DOM` 树, 再通过 `react-dom` 将虚拟 `DOM` 渲染为真实的 `DOM` 节点。

而在用户操作之后会产生组件状态的更新(`setState`), 这时会触发重新渲染, 产生新的虚拟 `DOM` 树, 通过 `diff` 算法进行比较, 再将差异传递给 `react-dom` 进行重新渲染。

> 这里可以扩展开来讲讲不同阶段产生的不同生命周期函数, 如果对 `diff` 算法有较深入的了解, 可以继续讲讲算法方面的知识, 或者可以看一下[相关思路与实现](https://github.com/BadmasterY/learn-demo/tree/master/PC/virtual-dom)。

#### 5. 什么是渲染劫持?
> 解题思路: 理解高阶函数(`HOC`)。

首先, 这一词是在 `React` 官方文档高阶函数(`HOC`)一节中出现的, 概念是控制组件从另一个组件输出的能力。

那么高阶函数能做什么:
- 代码重用, 逻辑和引导程序抽象
- 渲染劫持(**重点**)
- 状态抽象和操纵
- `pops` 操纵

而高阶函数的这一系列能力, 其实都可以做到渲染劫持。

#### 6. React Intl 是什么原理?
没用过, 不做探讨。

#### 7. 你有使用过 React Intl 吗？
没用过, 但使用过其他国际化开源库, 如: [react-i18next](https://github.com/i18next/react-i18next)等。

#### 8. 怎么实例React组件的国际化呢？
> 解题思路: 如何实现国际化, 高阶函数的应用。

将需要翻译的文本抽象到一处(`i18n.json`等), 使用 `props` 将对应的文本传入组件, 并通过高阶函数对语言环境进行判断, 添加/修改文本。 

#### 9. 说说 Context 有哪些属性?
> 解题思路: `api` 考察。

[官网](https://react.docschina.org/docs/context.html)。

#### 10. 怎么使用Context开发组件?
> 解题思路: `context` 作用及实战经验。

`Context` 提供了一种在组件之间共享数据的方式, 而不必显式地通过组件树的逐层传递 `props`。

如何使用依旧可以参考[官网](https://react.docschina.org/docs/context.html)的相关 `demo`。

#### 11. 为什么 React 并不推荐我们优先考虑使用 Context?
- 过度依赖 `Context` 进行管理, 会使组件复用性下降。
- 如果对组件的状态(`state`)或者数据通讯(`props`)进行管理, 完全可以不使用 `Context`。如果作为全局属性, 也可以使用 `react-redux` 一类的状态管理库来解决这一问题。
- `context` 的更新需要通过 `setState()` 触发, 但是这并不是很可靠的, `Context` 支持跨组件的访问, 但是如果中间的子组件通过一些方法不进行更新, 比如 `shouldComponentUpdate()` 返回 `false` 那么不能保证 `Context` 的更新一定可以在子组件中使用。

#### 12. React15和16别支持IE几以上？
- `React 15` 不直接支持 `IE 8`。
- `React 16` 不支持 `IE 11` 以下。

> BTW: 个人是没搞懂, 为啥用 `React` 还要兼容老版本 `IE`。

#### 13. 你有用过React的插槽(Portals)吗？怎么用？
> 解题思路: `api` 考察。

- 这是由 `ReactDOM` 提供的接口。
- 可以实现将子节点渲染到父组件 `DOM` 层次结构之外的其他 `DOM` 节点上, 只是进行 `dom` 移动, 并没有进行新的 `dom` 创建。
- `ReactDOM.createPortal(child, container)`
- `child` 的为需要改变位置的子元素, `container` 为需要添加子元素的父元素。

#### 14. React的严格模式有什么用处？
> 解题思路: 严格模式。

- 识别不安全的生命周期
- 检测意外的副作用
- 检测过时的 `API`

`React` 严格模式可以在程序任意部位生效, 同时严格模式仅在开发模式生效。

#### 15. React如何进行代码拆分？拆分的原则是什么？
> 解题思路: 开放性问题。
没有项目经验可以参考 [React 哲学](https://react.docschina.org/docs/thinking-in-react.html)。

有项目经验可以结合当前公司项目进行讨论。

#### 16. React组件的构造函数有什么作用？
> 解题思路: `ES2015 Class`。

`React` 构造函数中的操作:
- 绑定 `this` 同时获取 `React` 生命周期 => `super(props)`
- 设置初始状态 => `this.state = {...}`

#### 17. React组件的构造函数是必须的吗?
不是必须的。参考无状态类组件。

#### 18. React中在哪捕获错误？
> 解题思路: 错误边界。

使用错误边界组件来捕获异常。

组件内异常, 主要包括:
- 渲染过程中异常
- 生命周期方法中的异常
- 子组件树中各组件的 `constructor` 构造函数中异常。

当然异常边界也有一些无法捕获的异常, 主要是异步及服务端触发异常:
- 事件处理器中的异常
- 异步任务异常, 如 `setTiemout`, `ajax` 请求异常等
- 服务端渲染异常
- 异常边界组件自身内的异常

#### 19. 为什么说React中的props是只读的？
> 解题思路: 开放性问题。

`react` 官方文档中说道, 组件无论是使用函数声明还是通过 `class` 声明, 都绝不能修改自身的 `props`, `props` 作为组件对外通信的一个接口, 为了保证组件像纯函数一样没有响应的副作用, 所有的组件都必须像纯函数一样保护它们的 `props` 不被修改。

自身理解: 乌龟的屁股, 听爸爸的话。

#### 20. 如果组件的属性没有传值, 那么它的默认值是什么？
> 解题思路: 概念。

默认为 `true`。

```jsx
<MyTextBox autocomplete />
// 等价
<MyTextBox autocomplete={true} />
```

##### 21. super()和super(props)有什么区别？
> 解题思路: `ES2015 Class`。

`super()` 只是为了绑定 `this`, `super(props)` 绑定 `this` 的同时传参。

```jsx
class Button extends React.Component {
  constructor(props) {
    super();
    console.log(props);      // {...}
    console.log(this.props); // undefined 
  }
  // ...
}
```

#### 22. 你有使用过suspense组件吗？它帮我们解决了什么问题？
> 解题思路: 懒加载。

`React.lazy` 必备伙伴, 用于在数据加载之前展示内容, 如: `loading`等。

#### 23. 怎样动态导入组件？
> 解题思路: 开放性问题。

- 自己使用 `import` 和 `async/await` 实现的异步组件
- `React.lazy`
- 开源库 `react-loadable`/`react-lazyload`
- `babel` 动态导入(`Dynamic Import`)

#### 24. 如何给非控组件设置默认的值？
> 解题思路: 概念。

给非受控组件设置 `defaultValue` 属性, 给定默认值。

#### 25. 使用Hooks要遵守哪些原则？
> 解题思路: 概念。

- 只在最顶层使用 `Hooks`
- 不要在循环, 条件或嵌套函数中调用 `Hooks`,  确保总是在你的 `React` 函数的最顶层调用他们
- 只在 `React` 函数中调用 `Hooks`, 不要在普通的 `JavaScript` 函数中调用 `Hooks`

你可以:
- 在 `React` 的函数组件中调用 `Hooks`
- 在自定义 `Hooks` 中调用其他 `Hooks`

还可以继续结合项目中没有遵守原则产生的问题深入聊一聊。

