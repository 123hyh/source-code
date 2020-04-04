// promise 任务 使用 链表
class LinkedNode<T> {
  public data: T;
  public next: LinkedNode<any> | null | undefined;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

type TFun = (data: any) => any;
type TPromiseCb = TFun | null | undefined;
type TExecutorParamItem = (this: MyPromise, data?: any) => any;
type TExecutor = (
  resolve: TExecutorParamItem,
  reject: TExecutorParamItem
) => any;

/**
 * 注册 任务到 任务列表
 * @param {Function | any} fn 任务
 * @param {Boolean} isFulfilld 是否为 完成；决定 task的类型
 */
function addTask(this: MyPromise, fn: any, isFulfilld = false): any {
  if (typeof fn === "function") {
    let pre = this.taskQueue,
      task = new LinkedNode({ [isFulfilld ? "fulfilld" : "rejectd"]: fn });
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
export class MyPromise {
  public status: string;
  public taskQueue: LinkedNode<any> | null | undefined;
  constructor(executor: TExecutor) {
    this.status = "pendding";
    this.taskQueue = null;

    const resolve: TExecutorParamItem = function(response) {
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

    const reject: TExecutorParamItem = function(error) {
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

  then(fulfilld: TPromiseCb, rejectd?: TPromiseCb): MyPromise {
    const add = addTask.bind(this);

    add(fulfilld, true);
    add(rejectd);

    return this;
  }

  catch(rejectd: TPromiseCb): MyPromise {
    if (rejectd) {
      addTask.call(this, rejectd);
    }
    return this;
  }
}
new MyPromise(resolve => {
  return resolve(1);
});
