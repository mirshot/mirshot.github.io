<script>
  import {mapActions, mapState} from 'vuex';

  export default{
    data(){
      return {
        todo:'',
        navigator:'all',
        editing:false
      }
    },
    computed:{
      ...mapState(['todoList', 'filters']),
      filterTodos(){
        return this.getFilter(this.navigator)
      },
      toggleChecked:{
        get(){
          const count = this.todoList.filter((item)=>{
            return !item.state;
          }).length;
          return count == 0;
        },
        set(value){
          this.todoList.forEach((item)=>{
            item.state = value;
          })
        }
      }
    },
    watch:{
      todoList:{
        deep:true,
        handler(){
          this.update();
        }
      }
    },
    methods:{
      ...mapActions(['create', 'update', 'remove']),
      keyup(e){
        if(e.keyCode == 13){
          if(!this.todo) return;
          this.create(this.todo);
          this.todo = '';
        }
      },
      clickedCompleteDelete(e){
        if(confirm('전체 삭제하시겠습니까?')){
          const todos = this.getFilter('completed');
          todos.forEach((item)=>{
            this.remove(item.seq);
          })
        }
      },
      clickedDelete(e){
        if(confirm("삭제하시겠습니까?")){
          const parent = e.target.closest('li');
          const seq = parent.getAttribute('data-seq');
          this.remove(seq);
        }
      },
      getFilter(navigator){
        if(navigator == 'all'){
          return this.todoList;
        }else if(navigator == 'active'){
          return this.todoList.filter((item)=>{
            return !item.state
          })
        }else{
          return this.todoList.filter((item)=>{
            return item.state
          })
        }
      },
      dbclickedTodo(e){
        const parent = e.target.closest('li');
        parent.classList.add('editing')
        parent.querySelector('.edit').focus();
      },
      editTodo(e){
        const parent = e.target.closest('li');
        const seq = parent.getAttribute('data-seq');
        const item = this.todoList.find((item)=>{
          return item.seq == seq;
        });
        item.todo = e.currentTarget.value;
        parent.classList.remove('editing');
      }
    },
    mounted(){
      console.log("버그수정")
      this.$router.beforeEach((to)=>{
        this.navigator = to.name;
      })
    },
    created(){
<<<<<<< HEAD
      console.log("새로운 기능 추가")

      console.log('새로운 기능 추가2')


      console.log('새로운 기능 추가3')


      console.log('새로운 기능 추가4         ')

      console.log('아니다')
=======
    console.log('소스트리')
>>>>>>> 82278ce4516fe5f5e946ff881df4993b1151c64d
    }
  }
</script>

<template>
  <section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input v-model="todo" @keyup="keyup" class="new-todo" placeholder="What needs to be done?" autofocus="">
			</header>
			<section v-if="this.todoList.length" class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox" v-model="toggleChecked">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
          <li v-for="(item, index) in filterTodos" :class="{completed:item.state}" :data-seq="item.seq">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.state">
              <label @dblclick="dbclickedTodo">{{item.todo}}</label>
              <button @click="clickedDelete" class="destroy"></button>
            </div>
            <input v-model="item.todo" type="text" class="edit" @focusout="editTodo" @keyup.enter="editTodo">
          </li>
        </ul>
			</section>
			<footer v-if="this.todoList.length" class="footer">
				<span class="todo-count"><strong>{{this.todoList.length}}</strong> items left</span>
				<ul class="filters">
					<li v-for="(item, index) in this.filters">
						<a :href="'#/'+(item == 'all' ? '' : item)" :class="{selected:item == this.navigator}">{{item}}</a>
					</li>
				</ul>
				<button v-if="this.getFilter('completed').length" class="clear-completed" @click="clickedCompleteDelete">
					Clear completed
				</button>
			</footer>
		</section>
</template>

<style>
</style>
