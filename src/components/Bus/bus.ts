type BusClass = {
  emit: (name: string) => void;
  on: (name: string, callback: Function) => void;
};
type PramsKey = string | number | symbol;
type List = {
  [key: PramsKey]: Array<Function>;
};

class Bus implements BusClass {
  list: List;
  constructor() {
    this.list = {};
  }
  /**
   * 发布订阅模式
   * fn: 事件处理函数集合
   * on: 订阅事件
   * emit: 发布事件
   * off: 删除事件
   **/
  emit(name: string, ...args: Array<any>) {
    let eventName: Array<Function> = this.list[name];
    eventName.forEach((fn) => {
      fn.apply(this, args); // 改变fn的this为Bus
    });
    console.log("111", this.list);
  }
  on(name: string, callback: Function) {
    let fn: Array<Function> = this.list[name] || [];
    fn.push(callback);
    this.list[name] = fn;
    console.log("222", this.list);
  }
}
export default new Bus();
