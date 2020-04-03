function generators() {
  /* generator-demo */
  {
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
    /*  const data = test();
    data.next();
    data.next(2);
    data.next(5); */
  }
  /**
   *
   * generator 源码
   *
   */
  function asyncGenerator(...args: any[]) {
    let i: number = 0;
    let provide: any = undefined;
    return {
      next() {
        if (provide instanceof Promise) {
          provide = provide.then(args[i++]);
        } else {
          provide = args[i++](provide);
        }
      }
    };
  }
  var response = asyncGenerator(
    function test1() {
      return Promise.resolve(2);
    },
    function test2(data: any) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data * 2);
        }, 1000);
      });
    },
    function test3(data: any) {
      debugger;
    }
  );
  response.next();
  response.next();
  response.next();
}

export const generator = generators;
