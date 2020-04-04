// promise 任务 使用 链表
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

/**
 * 注册 任务到 任务列表
 * @param {Function | any} fn 任务
 * @param {Boolean} isFulfilld 是否为 完成；决定 task的类型
 */
function addTask(fn, isFulfilld = false) {
  if (typeof fn === "function") {
    let pre = this.taskQueue,
      task = new Node({ [isFulfilld ? "fulfilld" : "rejectd"]: fn });
    /**
     * 1、判断当前 pre
     * 2、遍历pre，找出 next 重新赋值给 pre
     * 3、把 task 追加 到 pre
     */
    if (pre) {
      while (pre) {
        if (pre.next) {
          pre = pre.next;
        } else {
          pre.next = task;
          break;
        }
      }
    } else {
      this.taskQueue = task;
    }
    return task;
  }
}
class MyPromise {
  constructor(executor) {
    this.status = "pendding";
    this.taskQueue = null;

    const resolve = function(response) {
      this.status = "fulfilld";
      queueMicrotask(() => {
        let pre = null;
        while (this.taskQueue) {
          if (this.taskQueue.data.fulfilld) {
            /**
             *
             * 逻辑：找到task然后调用；
             * 重新赋值task.next 到 taskQueue；
             * 判断 task调用是否 返回 promise实例；
             *
             */
            pre = this.taskQueue.data.fulfilld(response);
            this.taskQueue = this.taskQueue.next;

            break;
          } else {
            /**
             * 1、防止第一个 task 是 rejectd
             * 2、taskQueue重新赋值
             */
            pre = this.taskQueue.next;
            this.taskQueue = pre;
          }
        }
        if (pre instanceof MyPromise) {
          if (pre.taskQueue === null) {
            pre.taskQueue = this.taskQueue;
            this.taskQueue = null;
          } else {
            let preTask = pre.taskQueue;
            while (preTask) {
              if (preTask.next) {
                preTask = preTask.next;
              } else {
                preTask.next = this.taskQueue;
                break;
              }
            }
          }
        } else {
          this.taskQueue && this.taskQueue.data.fulfilld(response);
        }
      });
    };

    const reject = function(error) {
      this.status = "rejectd";
      queueMicrotask(() => {
        let pre = this.taskQueue;
        while (pre) {
          const {
            data: { rejectd },
            next
          } = pre;
          if (rejectd) {
            this.taskQueue = next;
            rejectd(error);
            resolve.call(this);
            break;
          } else {
            pre = pre.next;
          }
        }
      });
    };

    executor(resolve.bind(this), reject.bind(this));
  }

  then(fulfilld, rejectd) {
    const add = addTask.bind(this);

    add(fulfilld, true);
    add(rejectd);

    return this;
  }

  catch(rejectd) {
    if (rejectd) {
      addTask.call(this, rejectd);
    }
    return this;
  }
}
/**
 * 测试用例
 * 包含 返回 promise
 *  catch的严格处理
 */
const p = new MyPromise((resolve, reject) => {
  resolve(1);
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
