### 01

答案：

1. 引用计数原理：

   给每个对象添加一个计数器，标识对象的引用次数，当一个新引用指向对象时计数器加1，当指向对象的引用失效时计数器减1.当计数器值为0时会被立即回收。

2. 引用计数优缺点：

   - 优点：
     1.  发现垃圾时立即回收，提高使用效率
     2. 可以最大限度减少程序暂停，因为引用计数不需要遍历堆
   - 缺点：
     1. 无法回收循环引用的对象
     2. 计数器增减操作频繁，并且计数器会占一部分内存
     3. 时间开销大

​	

### 02

答案 ：

​	标记整理算法是标记清除算法的一个升级。主要是为了减少碎片空间化。工作原理与标记清除算法相同。

- ​	标记阶段

  遍历所有对象，把可达对象都打上一个标记。

- 清除阶段

  遍历堆中所有对象，没有被标记的对象会被清除。在这之前，这些对象会被移动位置，也就是先进行整理，把这些对象位置移动到一起后再清理。这样就减少了碎片化空间。



### 03

答案：

​	新生代存储区回收过程采用复制算法+标记整理算法实现。新生代存储区将内存去分为等大两个空间。一个为From使用空间，To空闲空间。活动对象就存放在Form空间。当From空间占满时就会启动新生代的GC算法。算法将检查From空间的存活对象，并把From中的存活对象复制给To空间。From空间内失活的对象就会被销毁。复制完成后From空间和To空间互换。这里如果To空间的使用率超过了25%，就需要把一轮GC后还存活的新生代代行晋升到老生代。



### 04 

答案：

​	增量标记使用场景之一就是V8中老生代垃圾回收。使用原因是因为在执行GC时浏览器是暂停程序运行的，要等待GC完成后才继续执行。老生代内存区空间大，完成一轮标记清除和整理需要大量时间。所以需要增量标记将原来的一次性标记改成分很多步去标记，代码执行一会标记会，标记和程序执行交替执行。知道标记阶段结束。



### 05 代码题

- #### 01

```js
// let isLastlnStock = function (cars) {
//     //获取最后一条数据
//     let last_car = fp.last(cars)
//     console.log(fp.last(cars))
//     //获取最后一条数据的in_stock属性值
//     return fp.prop('in_stock',last_car)
// }

const lastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
console.log(lastInStock(cars))//false
```



- #### 02

```js
const firstName = fp.flowRight(fp.prop('name'),fp.first)
console.log(firstName(cars))//Ferrari FF
```



- #### 03

```js
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无须改动

// let averageDollarValue = function (cars) {
//     let dollar_values = fp.map(function (car) {
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_values)
// }

// averageDollarValue(cars)

const averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
console.log(averageDollarValue(cars)) //790700
```



- #### 04

```js
const sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore,fp.toLower,fp.prop('name'))))

console.log(sanitizeNames(cars))
```



### 06代码题2

#### 01

```js
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(x => fp.map(fp.add(2,x),x))
console.log(ex1)
```



#### 02

```
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = fp.map(fp.first)
console.log(xs.map(ex2))
```



#### 03

```js
let safeProp = fp.curry(function (x, o) { return Maybe.of(o[x]) })
let user = { id: 2, name: "Albert" }


let ex3 =  fp.first(safeProp('name',user)._value)
console.log(ex3)
```



#### 04

```js
// let ex4 = function (n) {
//     if (n) {
//         return parseInt(n)
//     }
// }

let ex4 = fp.flowRight(fp.map(parseInt), Maybe.of)
console.log(ex4(3.2))//3
```

