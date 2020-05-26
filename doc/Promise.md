## Promise 原理参考与简单实现

`Promise` 是用来解决 `js` 中的异步问题的，而 `js` 中所有的异步最早都是由 `callback` 来进行处理的。所以不论是 `promise` 也好, 还是后续的 `async/await` 也罢, 其实都是 `callback` 的更优雅的实现方式。好了, 有点跑题了, 言归正传, 那么如何实现一个 `promise` 呢?

### 1. 基本结构
先来看一下正常调用 `promise` 时的样子:
```js
// ok!
const promise = new Promise((resolve, reject) => {
    let flag = false;
    // do something, and change flag
    if(flag) {
        resolve();
    }else {
        reject();
    }
});
// error!
const errorPromise = new Promise();
// => Uncaught TypeError: Promise resolver undefined is not a function
```

通过上述两个创建流程可知, `Promise` 必须接受一个方法作为参数, 而这个方法又接受两个回调: `resolve` 和 `reject`。

那么, 首先来简单定义一下简单实现的 `Promise` 结构, 这里将自己实现的方法称为 `SimplePromise`:
```js
// 判断是否为方法的函数
const isFunction = variable => typeof variable === 'function';

// SimplePromise 原型
function SimplePromise(executor) {
    if(!isFunction(executor)) {
        throw new Error('SimplePromise resolver undefined is not a function');
    }
}
```

现在, 也可以通过 `new SimplePromise(() => {});` 的形式创建自己的 `promise` 了！恭喜🎉！那么本章就结束了~(**误**!)

### 2. 状态和值
一个 `Promise` 有以下几种状态:
- `pending`: 初始状态, 既不是成功, 也不是失败状态。
- `fulfilled`: 意味着操作成功完成。
- `rejected`: 意味着操作失败。

> 状态说明: 查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 完成时依旧为 `fulfilled` 而 `Chrome` 浏览器输出状态为 `resolved`, 这里以 `MDN` 为准。

> 同时, `Promise` 的状态只能由 `pending` 转换为 `fulfilled`, 或者由 `pending` 转换为 `rejected`, 而状态一旦确定, 就无法再转换。

状态的转换是由 `resolve` 和 `reject` 两个回调改变的:
- `resolve`: 由 `pending` 转换为 `fulfilled`。
- `reject`: 由 `pending` 转换为 `rejected`。

同时, 这两个回调都会通过传参的形式修改 `Promise` 的 `value`。

现在, 为 `SimplePromise` 添加状态、值、修改状态的方法:
```js
// 三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 判断是否为方法的函数
const isFunction = variable => typeof variable === 'function';

function _resolve(val) {
    if(this.status !== PENDING) return;

    this.status = FULFILLED;
    this.value = val;
}

function _reject(err) {
    if(this.status !== PENDING) return;

    this.status = REJECTED;
    this.value = err;
}

// SimplePromise 原型
function SimplePromise(executor) {
    if(!isFunction(executor)) {
        throw new Error('SimplePromise resolver undefined is not a function');
    }

    this.resolve = _resolve;
    this.reject = _reject;
    this.status = PENDING; // 初始状态为 pending
    this.value = undefined; // 初始值为 undefined

    try{
        executor(_resolve.bind(this), _reject.bind(this));
    }catch(err) {
        _reject.call(this, err); // 执行失败, 同样使用 _reject 方法变更为失败状态
    }
}
```

这样, 就实现了 `Promise` 中状态的转换与值的改变。接下来开始实现 `Promise.prototype` 上的方法, 当然, 从最核心的 `.then` 开始。

### 3. Promise.prototype.then
#### 语法:
```
p.then(onFulfilled[, onRejected]);
```

#### 参数:
- `onFulfiilled`(可选): 当 `Promise` 变成接 `fulfilled` 时调用的函数。该函数有一个参数，即接受的最终结果。如果该参数不是函数，则会在内部被替换为 `(x) => x`，即原样返回 `promise` 最终结果的函数。
- `onRejected`(可选): 当 `Promise` 变成 `rejected` 时调用的函数。该函数有一个参数，即拒绝的原因。如果该参数不是函数，则会在内部被替换为一个 `Throw new Error()` 函数, 参数为拒绝原因。

#### 返回值
返回一个新的 `promise`, 这也就是为什么 `Promise` 可以链式调用。
> 暂时忽略一部分返回规则, 方便讲解。

> 为什么是一个新的 `promise` 实例? 因为一个 `promise` 的状态一旦确定就无法改变, 想要实现链式调用, 只能返回一个新的实例。

OK! 现在知道了 `.then` 的语法、参数以及返回值, 快来实现一下吧:
```js
// 前面代码与上一节相同, 不再赘述

Object.assign(SimplePromise.prototype, {
    constructor: SimplePromise,

    /**
     * .then
     * @param {any} onFulfiilled 成功执行
     * @param {any} onRejected 失败执行
     */
    then: function (onFulfiilled, onRejected) {
        const { status, value } = this;

        if (status === FULFILLED) {
            if (isFunction(onFulfiilled)) {
                onFulfiilled(value);
            }
        }

        if (status === REJECTED) {
            if (isFunction(onRejected)) {
                onRejected(value);
            } else {
                throw new Error(onRejected);
            }
        }

        return new SimplePromise((resolve, reject) => { });
    },
});
```

来测试一下写好的代码:
```js
const test = new SimplePromise((resolve, reject) => {resolve('test');});
test.then(result => {
    console.log(`resolve: ${result}`);
},error => {
    throw new Error(error);
});// => resolve: test
```

成功了!怎么可能这么简单...一开始就说了, `Promise` 是为了解决异步调用产生的, 同步操作不是它的主战场, 正常情况应该是类似这样的操作(这里使用定时器替代 `ajax` 操作):
```js
const test = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('我是两秒后的输出!');
    }, 2000);
});
test.then(result => {
    console.log(`resolve: ${result}`);
});
// => 等待2s之后输出: 我是两秒后的输出!
```

所以, 现在的代码明显无法满足异步操作的需求。因为在直接调用 `.then` 方法时, `status` 还是 `pending` 所以不进行任何操作, 那么 `2s` 内任何时候调用肯定都是不合理的, 所以只要回调在正确的时间执行就好了:
```js
// SimplePromise 原型
function SimplePromise(executor) {
    if (!isFunction(executor)) {
        throw new Error('SimplePromise resolver undefined is not a function');
    }

    this.resolve = _resolve;
    this.reject = _reject;
    this.status = PENDING;
    this.value = undefined;
    // 添加回调存储的地方
    this.fulfilledQueue = []; // 保存成功回调
    this.rejectQueue = []; // 保存失败回调

    try {
        executor(_resolve.bind(this), _reject.bind(this));
    } catch (err) {
        _reject.call(this, err); // 执行失败, 同样使用 _reject 方法变更为失败状态
    }
}

Object.assign(SimplePromise.prototype, {
    constructor: SimplePromise,

    /**
     * .then
     * @param {any} onFulfiilled 成功执行
     * @param {any} onRejected 失败执行
     */
    then: function (onFulfiilled, onRejected) {
        const { status, value } = this;

        // 修改 then 方法
        switch(status) {
            case PENDING:
                this.fulfilledQueue.push(onFulfiilled);
                this.rejectQueue.push(onRejected);
                break;
            case FULFILLED:
                if (isFunction(onFulfiilled)) {
                    onFulfiilled(value);
                }
                break;
            case REJECTED:
                if (isFunction(onRejected)) {
                    onRejected(value);
                }
                break;
        }

        return new SimplePromise((resolve, reject) => { });
    },
});

// 在正确的时间做正确的事
function _resolve(val) {
    if (this.status !== PENDING) return;

    this.status = FULFILLED;
    this.value = val;

    this.fulfilledQueue.forEach(fn => fn(val));
}

function _reject(err) {
    if (this.status !== PENDING) return;

    this.status = REJECTED;
    this.value = err;

    this.rejectQueue.forEach(fn => fn(err));
}
```

现在, `SimplePromise` 可以在正确的时间做正确的事情了!

继续完善 `SimplePromise` 返回规则:
- 返回了一个值, 那么 `then` 返回的 `Promise` 将会成为 `fulfilled` 状态, 并且将返回的值作为 `fulfilled` 状态的回调函数的参数值。
- 没有返回任何值, 那么 `then` 返回的 `Promise` 将会成为 `fulfilled` 状态, 并且该接受状态的回调函数的参数值为 `undefined`。
- 抛出一个错误, 那么 `then` 返回的 `Promise` 将会成为 `rejected` 状态, 并且将抛出的错误作为 `rejected` 状态的回调函数的参数值。
- 返回一个已经是 `fulfilled` 状态的 `Promise`, 那么 `then` 返回的 `Promise` 也会成为 `fulfilled` 状态, 并且将那个 `Promise` 的 `fulfilled` 状态的回调函数的参数值作为该被返回的 `Promise` 的 `fulfilled` 状态回调函数的参数值。
- 返回一个已经是 `rejected` 状态的 `Promise`, 那么 `then` 返回的 `Promise` 也会成为 `rejected` 状态, 并且将那个 `Promise` 的 `rejected` 状态的回调函数的参数值作为该被返回的 `Promise` 的 `rejected` 状态回调函数的参数值。
- 返回一个 `pending` 状态的 `Promise`, 那么 `then` 返回 `Promise` 的状态也是 `pending`, 并且它的终态与那个 `Promise` 的终态相同；同时, 它变为终态时调用的回调函数参数与那个 `Promise` 变为终态时的回调函数的参数是相同的。

修改 `.then` 方法如下:
```js
Object.assign(SimplePromise.prototype, {
    constructor: SimplePromise,

    /**
     * .then
     * @param {any} onFulfilled 成功执行
     * @param {any} onRejected 失败执行
     */
    then: function (onFulfilled, onRejected) {
        const { status, value } = this;

        return new SimplePromise((resolveNext, rejectNext) => {
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        resolveNext(value); // 参数规则
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof SimplePromise) {
                            // 如果状态为 `pending`,
                            // 会等待直到 `res` 结束再执行 `resolveNext`
                            res.then(resolveNext, rejectNext); // 规则 4, 6
                        } else {
                            resolveNext(res); // 规则 1, 2
                        }
                    }
                } catch (err) {
                    rejectNext(err);
                }
            };

            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        rejectNext(error); // 参数规则
                    } else {
                        let res = onRejected(error);
                        if (res instanceof SimplePromise) {
                            // 同理
                            res.then(resolveNext, rejectNext); // 规则 5, 6
                        } else {
                            resolveNext(res); // 规则 3
                        }
                    }
                } catch (err) {
                    rejectNext(err);
                }
            };

            switch (status) {
                case PENDING:
                    // this 为当前 promise
                    // 而不是返回的 promise
                    this.fulfilledQueue.push(fulfilled);
                    this.rejectedQueue.push(rejected);
                    break;
                case FULFILLED:
                    fulfilled(value);
                    break;
                case REJECTED:
                    rejected(value);
                    break;
            }
        });
    },
});
```

由于最后一条规则限制, 必须优先返回为 `pending` 状态的新 `promise`, 随后根据当前状态与值进行转换, 因此, 只能优先返回 `promise`, 在内部执行相关操作。(注意箭头函数,  `this` 并不是指向返回的 `promise`)。

这里还有一种特殊的情况，就是当 `resolve` 方法传入的参数为一个 `Promise` 对象时，则该 `Promise` 对象状态决定当前 `Promise` 对象的状态:
```js
const p1 = new Promise(function (resolve, reject) {
  // do something
});

const p2 = new Promise(function (resolve, reject) {
  // do something
  resolve(p1);
});
```

因此, 需要修改 `resolve` 参数判断:
```js
function _resolve(val) {
    if (this.status !== PENDING) return;

    // 如果为 promise 保证传入promise状态和值与返回promise状态和值一致
    if (val instanceof SimplePromise) {
        val.then(resolve => {
            this.status = FULFILLED;
            this.value = resolve;
        }, reject => {
            this.status = REJECTED;
            this.value = reject;
        });
    } else {
        this.status = FULFILLED;
        this.value = val;
    }

    this.fulfilledQueue.forEach(fn => fn(this.value));
}
```

这样, `.then` 相关的特性就全部实现了🎉!(这次是真的!)

### 4. Promise.prototype.catch
既然有了 `.then` 方法, 那么 `.catch` 方法的实现就非常简单了:
```js
Object.assign(SimplePromise.prototype, {
    then: (onFulfilled, onRejected) => {...},
    catch: function (onRejected) {
        return this.then(undefined, onRejected);
    },
}
```

### 5. Promise.prototype.finally
再来实现一下 `.finally`:
```js
Object.assign(SimplePromise.prototype, {
    then: (onFulfilled, onRejected) => {...},
    catch: (onRejected) => {...},
    finally: function (onFinally) {
        return this.then(
            result => {
                onFinally();
                return result;
            },
            err => {
                onFinally();
                return err;
            }
        );
    },
}
```

**注意**: `onFinally` 不能在 `this.then` 外部直接调用, 这样会导致链式调用失败, 前面异步操作未完成而直接执行 `.finally`。

### 6. 静态方法
由于静态方法都是基于 `.then` 实现的, 所以只要理解了 `.then` 相对比较简单。

静态方法:
```js
Object.assign(SimplePromise, {
    resolve: function (val) {
        if (val instanceof SimplePromise) {
            return val;
        } else {
            return new SimplePromise((resolve, reject) => resolve(val));
        }
    },
    reject: function (err) {
        return new SimplePromise((resolve, reject) => reject(err));
    },
    all: function (iterable) {
        return new SimplePromise((resolve, reject) => {
            const length = iterable.length;

            const results = [];
            let count = 0;

            for (let i = 0; i < length; i++) {
                this.resolve(iterable[i]).then(result => {
                    results[i] = result;
                    count++;

                    if (count === length) resolve(results);
                }, err => {
                    reject(err);
                });
            }
        });
    },
    allSettled: function (iterable) {
        return new SimplePromise((resolve) => {
            const length = iterable.length;

            const results = [];
            let count = 0;

            for (let i = 0; i < length; i++) {
                this.resolve(iterable[i]).then(result => {
                    results[i] = result;
                    count++;

                    if (count === length) resolve(results);
                }, err => {
                    results[i] = err;
                    count++;

                    if (count === length) resolve(results);
                });
            }
        });
    },
    race: function (iterable) {
        return new SimplePromise((resolve, reject) => {
            for (let item of iterable) {
                this.resolve(item).then(result => {
                    resolve(result);
                }, err => {
                    reject(err);
                })
            }
        });
    },
});
```

这样, 一个简单的 `promise` 就实现了~

### 7. 差异
不过, 这样实现的 `SimplePromise` 还是存在问题的, 仔细观察以下输出:
```js
// Promise 版本
setTimeout(function () { console.log(4) }, 0);
new Promise(function (resolve) {
    console.log(1)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(2)
}).then(function () { console.log(5) });
console.log(3);
// => 1, 2, 3, 5, 4

// SimplePromise 版本
setTimeout(function () { console.log(4) }, 0);
new SimplePromise(function (resolve) {
    console.log(1)
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve()
    }
    console.log(2)
}).then(function () { console.log(5) });
console.log(3);
// => 1, 2, 5, 3, 4
```

为什么会这样? 本着深入探究的原则, 翻看了一下[Promises/A+规范](https://www.ituring.com.cn/article/66566), 发现了这样一段译者注:

> 实践中要确保 `onFulfilled` 和 `onRejected` 方法异步执行，且应该在 `then` 方法被调用的那一轮事件循环之后的新执行栈中执行。

所以, 在浏览器的实现中, `.then` 的注册应该是异步的, 而在 `SimplePromise` 的实现中, 它是同步的, 这才导致 `5` 在 `3` 之前执行。

思路:
- 可以简单的通过设置超时为 `0ms` 的定时器包裹 `.then` 代码实现异步调用。
- 不过总觉得不太对......问题不大, 先尝试一下。

输出结果:
```
1, 2, 3, 4, 5
```

🤔❓❓❓❓(半疯)

然后通过神奇的搜索引擎找到了这样的一篇文章: [Promise的队列与setTimeout的队列有何关联？](https://www.zhihu.com/question/36972010), 具体原因直接查看这篇文章即可, 就不再赘述了, 同时, `SimplePromise` 的实现也就到此为止了(实在是想不出, 如何在浏览器中控制队列......)。

完整代码: [传送门](https://github.com/BadmasterY/docs/blob/master/test/promise.js)
