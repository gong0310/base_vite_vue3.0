# React.memo: 在函数组件中实现'shouldComponentUpdate'

`React.memo`是一个高阶组件，类似于`React.PureComponent`，只不过用于函数组件而非class组件。 如果你的函数组件在相同`props`下渲染出相同结果，你可以把它包裹在`React.memo`中来通过缓存渲染结果来实现性能优化。这意味着`React`会跳过组件渲染，而使用上次渲染结果。

`React.memo`默认只会浅比较`props`，如果需要定制比较，你可以给第二个参数传入自定义比较函数

**和class组件中的`shouldComponentUpdate`不同，如果`props`相同则应返回`true`，否则返回`false`。这点二者正好相反。**

```
const DemoLoader = React.memo(props => {
  const { demoUrl } = props;
  return <div className="demoloader">
    <iframe src={demoUrl} />
  </div>;
}, (prevProps, nextProps) => {
  return prevProps.demoUrl === nextProps.demoUrl;
});
```

# HTTP缓存

### 在介绍HTTP缓存之前，作为知识铺垫，先简单介绍一下HTTP报文

HTTP报文就是浏览器和服务器间通信时发送及响应的数据块。
浏览器向服务器请求数据，发送请求(request)报文；服务器向浏览器返回数据，返回响应(response)报文。
报文信息主要分为两部分
1.包含属性的首部(header)--------------------------附加信息（cookie，缓存信息等）与缓存相关的规则信息，均包含在header中
2.包含数据的主体部分(body)-----------------------HTTP请求真正想要传输的部分

## 缓存规则解析

在客户端**第一次请求数据**时，此时浏览器缓存中没有对应的缓存数据，需要请求服务器，服务器返回后，将数据存储至缓存数据库中。



<img src="https://images2015.cnblogs.com/blog/632130/201702/632130-20170210141639213-1923993391.png"  />

**已存在缓存数据时**

> 1.强制缓存如果生效，不需要再和服务器发生交互，而对比缓存不管是否生效，都需要与服务端发生交互。
>
> 2.两类缓存规则可以同时存在，强制缓存优先级高于对比缓存，也就是说，当执行强制缓存的规则时，如果缓存生效，直接使用缓存，不再执行对比缓存规则。

![](https://images2015.cnblogs.com/blog/632130/201702/632130-20170210141716838-764535017.png)



![](https://images2015.cnblogs.com/blog/632130/201702/632130-20170210135521072-1812985836.png)

### 强制缓存

在没有缓存数据的时候，浏览器向服务器请求数据时，服务器会将数据和缓存规则一并返回，缓存规则信息包含在响应header中。

> 对于强制缓存来说，响应header中会有两个字段来标明失效规则（Expires/Cache-Control）

**Expires**的值为服务端返回的到期时间，即下一次请求时，请求时间小于服务端返回的到期时间，直接使用缓存数据。

1. 到期时间是由服务端生成的，但是客户端时间可能跟服务端时间有误差，这就会导致缓存命中的误差

2. Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。

所以HTTP 1.1 的版本，使用Cache-Control替代。

**Cache-Control** 是最重要的规则。常见的取值有private、public、no-cache、max-age，no-store，默认为private。

> private:        客户端可以缓存
> public:         客户端和代理服务器都可缓存（前端的同学，可以认为public和private是一样的）
> max-age=xxx:  缓存的内容将在 xxx 秒后失效
> no-cache:      需要使用对比缓存来验证缓存数据（后面介绍）
> no-store:       所有内容都不会缓存，强制缓存，对比缓存都不会触发（对于前端开发来说，缓存越多越好，so...基本上和它说886）

![](https://images2015.cnblogs.com/blog/632130/201702/632130-20170210141836104-1513192908.png)

### **对比缓存**

浏览器第一次请求数据时，服务器会将缓存标识与数据一起返回给客户端，客户端将二者备份至缓存数据库中。
再次请求数据时，客户端将备份的缓存标识发送给服务器，服务器根据缓存标识进行判断，判断成功后，返回304状态码，通知客户端比较成功，可以使用缓存数据。

**Etag：**优先级高于Last-Modified

服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）。

**Last-Modified：**

服务器在响应请求时，告诉浏览器资源的最后修改时间。

总结：

**对于强制缓存，服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行对比缓存策略。
对于对比缓存，将缓存信息中的Etag和Last-Modified通过请求发送给服务器，由服务器校验，返回304状态码时，浏览器直接使用缓存。**



# js事件循环机制

js是单线程语言，最多也只有一个代码段在执行

这里把所有任务可以分为同步任务和异步任务，同步任务，就是立即执行的任务，同步任务一般会直接进入到主线程中执行；而异步任务，比如ajax网络请求，setTimeout 定时函数等，**会放入任务队列**。主线程内的任务执行完毕为空，会去 Event Queue(任务队列) 读取对应的异步任务并推入主线程执行(像递归遍历)。 上述过程的不断重复就是我们说的 Event Loop (事件循环)。

### 任务队列(分微任务、宏任务)

如果任务队列中，有很多个任务的话，那么要先执行哪一个任务呢？ 其实(正如上图所示)，js是有两个任务队列的，一个叫做 Macrotask Queue(Task Queue) 微任务, 一个叫做 Microtask Queue 宏任务

![](https://images2018.cnblogs.com/blog/698814/201809/698814-20180906145003189-254912994.jpg)

microtask （微任务）优先于 task（宏任务） 执行，所以如果有需要优先执行的逻辑，放入microtask 队列会比 task 更早的被执行。

> (macro)task 主要包含：script( 整体代码)、setTimeout、setInterval、I/O、UI 交互事件、setImmediate(Node.js 环境)
>
> microtask主要包含：Promise、MutaionObserver、process.nextTick(Node.js 环境)

```
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
```

1. 整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 script start

2. 遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中

3. 遇到 Promise，其 then函数被分到到微任务 Event Queue 中,记为 then1，之后又遇到了 then 函数，将其分到微任务 Event Queue 中，记为 then2

4. 遇到 console.log，输出 script end

   所以：

1. 执行微任务，首先执行then1，输出 promise1, 然后执行 then2，输出 promise2，这样就清空了所有微任务
2. 执行 setTimeout 任务，输出 setTimeout 至此，输出的顺序是：script start, script end, promise1, promise2, setTimeout

# 创建对象三种方式

```
1.字面量方式
var obj={
  name：'小明'
}
2.调用系统构造函数
var obj=new Object()
obj.name='小明'
3.自定义构造函数(首字母大写)
function Person(name,age,sex){
	this.name=name;
	this.age=age;
	this.play=function(){};
}
var pre= new Person()

工厂模式
function createPerson(name,age){
	var obj=new Object()
	obj.name=name;
	obj.age=age;
	obj.play=function(){};
	return obj
}
```

面向对象思想：根据需求，分析对象，找到对象有什么特征和行为，通过代码的方式来实现需求，要想实现这个需求，就要创建对象，想要创建对象，就应该显示有构造函数，然后通过构造函数来创建对象，通过对象调用属性和方法来实现相应的功能及需求，即可

js不是面试对象语言（可以模拟面向对象），是基于对象

# JS继承的实现方式

**继承是为了数据共享，避免代码重复过多，节省内存空间**

原型作用：1. 数据共享，节省内存空间 2. 为了实现继承

```
function Person(name,age,sex){
			this.name=name;
			this.age=age;
			this.sex=sex;
}
Person.prototype.sayhi=function(){
			console.log("你好")
}
```



### 1、原型继承

**核心：** 将父类的实例作为子类的原型

**缺陷**：

1. 可以在Student构造函数中，为Student实例增加实例属性。如果要新增原型属性和方法，则必须放在`new Person()`这样的语句之后执行。

2. Student.prototype=new Person() 不传值,属性没有继承过来，只继承了方法。

```
function Student(score){
  this.score=score;
}
//如果要新增原型属性和方法，则必须放在new Person()这样的语句之后执行。否则报错
Student.prototype.study1=function(){console.log("学习")}---报错
Student.prototype.name = 'cat';---报错

Student.prototype=new Person()---不传值,属性没有继承过来，只继承了方法。
Student.prototype.study2=function(){console.log("学习")}
var stu=new Student(100);
console.log(stu.name) ---unfefined
```

### 2、构造继承

**核心：**在子类的内部调用父类，通过call改变父类中this的指向，为属性赋值
等于是复制父类的实例属性给子类

**解决了属性继承，并且值不重复的问题**

**缺陷**：

1. 父级类中方法不能继承（如 stu1.sayHi() ),只能借用属性

2. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

```
function Student(name,age,sex,score){
		//借用构造函数,这个this指student
		Person.call(this,name,age,sex);
		this.score=score;
}
var stu1=new Student("小米1",18,"男","100");
console.log(stu1.name,stu1.age,stu1.score)
stu1.sayHi()//报错
//可以实现多继承（call多个父类对象）
var stu2=new Student("小米2",19,"男","51kg","110");
console.log(stu2.name,stu2.age,stu2.score)
```

### 3.组合继承

结合了两种模式的优点，传参和复用

**缺点：** 调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

### 4.**ES6中Class继承**

```
class person {
 constructor(){
 	this.kind="person"
 }
 eat(food){
 	console.log(this.name+" "+food);
 }
}
class student extends person{
 constructor(name){
 super();
 	this.name=name;
 }
}
var martin=new student("martin");
console.log(martin.kind); //person
martin.eat("apple"); //martin apple
```

### 5.深拷贝继承

把对象中需要共享的属性或方法，直接遍历到另一个对象中

```
function deepCopy(parent,child) {
 	var child=child||{};
 	for(var i in parent){
 		if(typeof parent[i]==="object"){
 			child[i]=parent[i].constructor==="Array"?[]:{};
 			deepCopy(parent[i],child[i]); //递归
 		}else{
 			 if(!(i in child)){ //i in child表示属性i是否在child对象中，如果有则返true
 					child[i]=parent[i];
 				}
	 }
 }
 return child
}

var parent={
 name:"martin",
 say(){}
};
var child={
 name:"lucy",
 kind:"person",
 eat(){}
};
deepCopy(parent,child);
console.log(child); //{ kind: 'person',eat: [Function: eat],name: 'martin',say: [Function: say] } 
```

# typeof与instanceof区别

### typeof

用于判断数据类型，返回值为6个字符串，分别为`string`、`Boolean`、`number`、`undefined` `function`、`object`(判断不了`array` `null` `object`,都是`object`)。

```
	typeof NaN      //"number"
    var a = [34,4,3,54],
        b = 34,
        c = 'adsfas',
        d = function(){console.log('我是函数')},
        e = true,
        f = null,
        g;
        console.log(typeof(a));//object
        console.log(typeof(b));//number
        console.log(typeof(c));//string
        console.log(typeof(d));//function
        console.log(typeof(e));//boolean
        console.log(typeof(f));//object
        console.log(typeof(g));//undefined
```

对于**Array，Null**等特殊对象使用typeof一律返回**object**，这正是typeof的局限性。

### **instanceof**

用来判断一个对象在其原型链中是否存在一个构造函数prototype属性

它的判断就是根据原型链进行搜寻，在对象obj1的原型链上如果存在另一个对象obj2的原型属性，那么表达式（obj1 instanceof obj2）返回值为true；否则返回false。

instanceof只能用来判断对象和函数,不能用来判断字符串和数字

```
var a = new Array();
var a2 = {};
a instanceof Object            // 返回true,因为Array是object 的子类
a2 instanceof Object            //true

window instanceof Object   // 返回false

typeof(window)  //会得到object
```

可以在继承关系中用来判断一个实例是否属于它的父类型。

```
function Foo(){}
Foo.prototype = new Aoo();//原型继承
var foo = new Foo();
console.log(foo instanceof Foo)//true
console.log(foo instanceof Aoo)//true
```



作用域，作用域链

promise

dns

### 减少重绘和回流

1. 使用 `transform` 替代 `top`
2. 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）
3. 不要使用 `table` 布局，可能很小的一个小改动会造成整个 `table` 的重新布局
4. 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`

