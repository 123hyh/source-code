"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generators() {
    /* generator-demo */
    /*  {
      const x = <T>(x: T): Promise<T> => {
        return Promise.resolve(x);
      };
      function y<T>(y: T): T {
        return y;
      }
      function* test() {
        const xx = yield x;
        console.log(xx);
        const yy = yield y;
        console.log(yy);
      }
       const data = test();
      data.next();
      data.next(2);
      data.next(5);
    } */
    /**
     *
     * generator 源码
     *
     */
    function asyncGenerator(...args) {
        /* 处理如果参数不是 function 或者不是 promise 实例时 抛出错误提示 */
        for (const item of args) {
            if (typeof item !== "function" && !(item instanceof Promise))
                throw new Error(`params is 【function or promise ?】`);
        }
        let i = 0;
        let provide = undefined;
        return {
            next() {
                if (args[i] instanceof Promise) {
                    /* 处理 当前 参数 为 promise实例时 */
                    provide = args[i];
                    provide.then(args[i++]);
                }
                else if (provide instanceof Promise) {
                    /* 处理上一个 方法得到的结果 如果是 promise 实例 */
                    provide = provide.then(args[i++]);
                }
                else {
                    /* 普通方法调用 */
                    provide = args[i++](provide);
                }
            }
        };
    }
    var response = asyncGenerator(function test2(data = 1) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data * 2);
            }, 1000);
        });
    }, Promise.resolve(666), function test3(data) {
        console.log(data);
    });
    response.next();
    response.next();
    response.next();
}
exports.generator = generators;
//# sourceMappingURL=generator.js.map