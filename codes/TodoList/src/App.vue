<template>
	<div id="root">
		<div class="todo-container">
			<div class="todo-wrap">
				<my-header @addtodo="addtodo" />
				<my-list :todos="todos" ></my-list>
				<my-footer :todos="todos" :checkAllTodo="checkAllTodo" :clearAllTodo="clearAllTodo" />
			</div>
		</div>
	</div>
</template>

<script>
//引入组件
import pubsub from 'pubsub-js'
import MyFooter from './components/MyFooter.vue';
import MyHeader from './components/MyHeader.vue';
import MyList from './components/MyList.vue';

export default {
	name: 'App',
	components: {
		MyFooter, MyHeader, MyList
	},
	data() {
		return {
			todos: JSON.parse(localStorage.getItem('todos')) || []
		}
	},
	methods: {
		addtodo(todoObj) {
			this.todos.unshift(todoObj)
		},
		checktodo(id) {
			
		},
		deletetodo(_,id) {
			this.todos = this.todos.filter((todo) => {
				return todo.id !== id
			})
		},
		checkAllTodo(done) {
			this.todos.forEach((todo) => {
				todo.done = done
			})
		},
		clearAllTodo() {
			this.todos = this.todos.filter((todo) => {
				return !todo.done
			})
		},
		updatetodo(id,title) {
			this.todos.forEach((todo) => {
				if (todo.id === id) todo.title =title
			})
		}
	},
	watch: {
		todos: {
			deep: true,
			handler(value) {
				localStorage.setItem('todos', JSON.stringify(value))
			}
		}
	},
	mounted() {
        this.$bus.$on('checktodo', this.checktodo )
        this.$bus.$on('updatetodo', this.updatetodo )
        this.pid=pubsub.subscribe('deletetodo',this.deletetodo)
    },
	beforeDestroy(){
		this.$bus.$off('checktodo' )
		this.$bus.$off('updatetodo' )
		pubSub.unsubscribe(pid)
	}
}
</script>

<style>
/*base*/
body {
	background: #fff;
}

.btn {
	display: inline-block;
	padding: 4px 12px;
	margin-bottom: 0;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
}

.btn-danger {
	color: #fff;
	background-color: #da4f49;
	border: 1px solid #bd362f;
}

.btn-edit {
	color: #fff;
	background-color: rgb(88, 176, 211);
	border: 1px solid rgb(8, 76, 103);
	margin-right: 5px;
}


.btn-danger:hover {
	color: #fff;
	background-color: #bd362f;
}

.btn:focus {
	outline: none;
}

.todo-container {
	width: 600px;
	margin: 0 auto;
}

.todo-container .todo-wrap {
	padding: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}
</style>