# 非单文件组件

## 组件基本使用

Vue中使用组件的三大步骤：
					一、定义组件(创建组件)
					二、注册组件
					三、使用组件(写组件标签)

一、如何定义一个组件？
	使用==Vue.extend(options)==创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
	区别如下：
			1.**el不要写**，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
			2.**data必须写成函数**，为什么？ ———— 避免组件被复用时，数据存在引用关系。
			备注：使用template可以配置组件结构。

二、如何注册组件？
			1.局部注册：靠new Vue的时候传入components选项
			2.全局注册：靠Vue.component('组件名',组件)

三、编写组件标签：
						<school></school>

```javascript
<div id="root">
			<hello></hello>
			<hr>
			<h1>{{msg}}</h1>
			<hr>
			<!-- 第三步：编写组件标签 -->
			<school></school>
			<hr>
			<!-- 第三步：编写组件标签 -->
			<student></student>
		</div>

		<div id="root2">
			<hello></hello>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false

		//第一步：创建school组件
		const school = Vue.extend({
			template:`
				<div class="demo">
					<h2>学校名称：{{schoolName}}</h2>
					<h2>学校地址：{{address}}</h2>
					<button @click="showName">点我提示学校名</button>	
				</div>
			`,
			// el:'#root', //组件定义时，一定不要写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
			data(){
				return {
					schoolName:'尚硅谷',
					address:'北京昌平'
				}
			},
			methods: {
				showName(){
					alert(this.schoolName)
				}
			},
		})

		//第一步：创建student组件
		const student = Vue.extend({
			template:`
				<div>
					<h2>学生姓名：{{studentName}}</h2>
					<h2>学生年龄：{{age}}</h2>
				</div>
			`,
			data(){
				return {
					studentName:'张三',
					age:18
				}
			}
		})
		
		//第一步：创建hello组件
		const hello = Vue.extend({
			template:`
				<div>	
					<h2>你好啊！{{name}}</h2>
				</div>
			`,
			data(){
				return {
					name:'Tom'
				}
			}
		})
		
		//第二步：全局注册组件
		Vue.component('hello',hello)

		//创建vm
		new Vue({
			el:'#root',
			data:{
				msg:'你好啊！'
			},
			//第二步：注册组件（局部注册）
			components:{
				school,
				student
			}
		})

		new Vue({
			el:'#root2',
		})
	</script>
```

## 几个注意点

1.关于组件名:
			一个单词组成：
							第一种写法(首字母小写)：school
							第二种写法(首字母大写)：School
			多个单词组成：
							第一种写法(kebab-case命名)：“my-school”
							第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)
	 备注：
			(1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。
			(2).可以使用name配置项指定组件在开发者工具中呈现的名字。

```javascript
//定义组件
		const s = Vue.extend({
			name:'atguigu',  //这样组件就叫atguigu，不会叫school
            
			template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
				</div>
			`,
			data(){
				return {
					name:'尚硅谷',
					address:'北京'
				}
			}
		})
//使用组件
		new Vue({
			el:'#root',
			data:{
				msg:'欢迎学习Vue!'
			},
            //注册组件（局部）
			components:{
				school:s
			}
		})
```

2.关于组件标签:
							第一种写法：<school></school>
							第二种写法：<school/>
		备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

3.一个简写方式：
			`const school = Vue.extend(options)` 可简写为：`const school = options`

## 组件嵌套

注意被嵌套的组件要写在嵌套组件之前，否则会报错未定义

```javascript
//定义student组件
		const student = Vue.extend({
			name:'student',
			template:`
				<div>
					<h2>学生姓名：{{name}}</h2>	
					<h2>学生年龄：{{age}}</h2>	
				</div>
			`,
			data(){
				return {
					name:'尚硅谷',
					age:18
				}
			}
		})
		
		//定义school组件
		const school = Vue.extend({
			name:'school',
			template:`
				<div>
					<h2>学校名称：{{name}}</h2>	
					<h2>学校地址：{{address}}</h2>	
					<student></student>
				</div>
			`,
			data(){
				return {
					name:'尚硅谷',
					address:'北京'
				}
			},
			//注册组件（局部）
			components:{
				student
			}
		})

		//定义hello组件
		const hello = Vue.extend({
			template:`<h1>{{msg}}</h1>`,
			data(){
				return {
					msg:'欢迎来到尚硅谷学习！'
				}
			}
		})
		
		//定义app组件
		const app = Vue.extend({
			template:`
				<div>	
					<hello></hello>
					<school></school>
				</div>
			`,
			components:{
				school,
				hello
			}
		})

		//创建vm
		new Vue({
			template:'<app></app>',
			el:'#root',
			//注册组件（局部）
			components:{app}
		})
```

# VueComponent

**1.**组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

**2.**我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，即Vue帮我们执行的：new VueComponent(options)。

**3.**特别注意：==每次调用Vue.extend，返回的都是一个全新VueComponent==！！！！(类比java中new新对象)

**4.**关于this指向：
		(1).**组件配置**中：
				data函数、methods中的函数、watch中的函数、computed中的函数 **它们的this均是【VueComponent实例对象】**。
		(2).new Vue(options)配置中：
				data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

**5.**VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）Vue的实例对象，以后简称vm。vc，vm差不多，但vc比vm少了el。

## 一个重要的内置关系

```
VueComponent.prototype.__proto__ === Vue.prototype
```


意义：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

# 单文件组件

App.vue（嵌套School.vue、Student.vue省略）

```javascript
<template>
	<div>
		<School></School>
		<Student></Student>
	</div>
</template>

<script>
	//引入组件
	import School from './School.vue'
	import Student from './Student.vue'

	export default {
		name:'App',
		components:{
			School,
			Student
		}
	}
</script>

```

main.js

```javascript
import App from './App.vue'

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})
```

index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>练习一下单文件组件的语法</title>
	</head>
	<body>
		<!-- 准备一个容器 -->
		<div id="root"></div>
		<!-- <script type="text/javascript" src="../js/vue.js"></script> -->
		<!-- <script type="text/javascript" src="./main.js"></script> -->
	</body>
</html>

```

