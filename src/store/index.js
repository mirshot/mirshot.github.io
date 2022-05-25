import { createStore } from 'vuex'
import moment from 'moment';

const storageKey = 'todo-list';

export default createStore({
  state:{
    todoList:JSON.parse(localStorage.getItem(storageKey)) || [],
    filters:[
      'all', 'active', 'completed'
    ]
  },
  mutations: {
    created(state, todo){
      state.todoList.push(todo);
      
    },
    updated(state){
      localStorage.setItem(storageKey, JSON.stringify(state.todoList));
    },
    removed(state, seq){
      state.todoList.forEach((item, i)=>{
        if(item.seq == seq){
          state.todoList.splice(i, 1);
        }
      })
    }
  },
  actions:{
    create(context, todo){
      const seq = moment().valueOf();
      const todoItem = {
        todo:todo,
        state:false,
        seq:seq
      }
      context.commit('created', todoItem);
    },
    update(context){
      context.commit('updated');
    },
    remove(context, seq){
      context.commit('removed', seq);
    }
  }
})