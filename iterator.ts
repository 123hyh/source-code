/**
 * iterator 迭代器
 * @param data 需要迭代的数据
 */
export function iterator(data: any[]) {
  let i = 0;
  return {
    next() {
      return {
        done: i > data.length,
        value: data[i++]
      };
    }
  };
}
var a = iterator([1, 2, 3]);
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
debugger;
