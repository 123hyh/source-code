import { generator } from "./generator";
import { MyPromise } from "./promise";

generator();

/**
 * 测试用例
 * 包含 返回 promise
 *  catch的严格处理
 */
const p = new MyPromise(function(resolve, reject) {
  return resolve(1);
});
p.then(null, err => {
  debugger;
})
  .then(data => {
    return new MyPromise((resolve, reject) => {
      reject(2);
    }).catch(err => {
      debugger;
      console.log(err);
    });
  })
  .catch(error => {
    debugger;
  })
  .then(data => {
    return new MyPromise((resolve, reject) => {
      reject(121);
    });
  })
  .catch(e => {
    console.log(e);
    debugger;
  })
  .then(data => {
    debugger;
  });
