const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 判断是否为方法的函数
const isFunction = variable => typeof variable === 'function';

function _resolve(val) {
    if (this.status !== PENDING) return;

    // 如果为 simplepromise 保证传入promise状态和值与返回promise状态和值一致
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

function _reject(err) {
    if (this.status !== PENDING) return;

    this.status = REJECTED;
    this.value = err;

    this.rejectQueue.forEach(fn => fn(this.value));
}

// SimplePromise 原型
function SimplePromise(executor) {
    if (!isFunction(executor)) {
        throw new Error('SimplePromise resolver undefined is not a function');
    }

    this.status = PENDING;
    this.value = undefined;
    this.fulfilledQueue = [];
    this.rejectedQueue = [];

    try {
        executor(_resolve.bind(this), _reject.bind(this));
    } catch (err) {
        _reject.call(this, err); // 执行失败, 同样使用 _reject 方法变更为失败状态
    }
}

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
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        resolveNext(value);
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof SimplePromise) {
                            res.then(resolveNext, rejectNext);
                        } else {
                            resolveNext(res);
                        }
                    }
                } catch (err) {
                    rejectNext(err);
                }
            };

            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        rejectNext(error);
                    } else {
                        let res = onRejected(error);
                        if (res instanceof SimplePromise) {
                            res.then(resolveNext, rejectNext);
                        } else {
                            resolveNext(res);
                        }
                    }
                } catch (err) {
                    rejectNext(err);
                }
            };

            switch (status) {
                case PENDING:
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
    catch: function (onRejected) {
        return this.then(undefined, onRejected);
    },
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
});