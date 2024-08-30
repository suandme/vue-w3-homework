<script setup>
//製作元件
import  {defineProps, ref} from 'vue'
const PutTodosConten=ref({
  content: ''
});
const ckeitdcontent=ref(0);
const editButton=(todo)=>{
 
  ckeitdcontent.value=todo.id;
  PutTodosConten.value.content=todo.content;
  emit('update:put-status', false);//雙向綁定props+emit
}

//外到內
const props=defineProps (['list-todos','put-status']) 
//由內到外
const emit=defineEmits  (['emit-edit','emit-del','emit-patch','emit-put','update:put-status'])

</script>
<template>

    <ul class="todoList_item" v-if="listTodos">
            <li v-for="todo in listTodos" :key="todo.id">
                 <label class="todoList_label"  v-if="ckeitdcontent!==todo.id || (ckeitdcontent===todo.id && putStatus)">
                    <input class="todoList_input" v-model="todo.status" type="checkbox" value="true" @change.prevent="emit('emit-patch',todo)">
                    <span >{{todo.content}}</span>
                  </label>
                 
                    <div class="inputBox" v-if="ckeitdcontent===todo.id && !putStatus">
                     <input  type="text" placeholder="請輸入待辦事項" v-model="PutTodosConten.content"
                     @keyup.enter="emit('emit-put',PutTodosConten,todo.id)" >
                     <a  v-if="ckeitdcontent===todo.id" href="#" @click.prevent="emit('emit-put',PutTodosConten,todo.id)" title="送出">
                      <i class="fa-solid fa-pen-to-square"></i>
                  </a>
                    </div>
                
                  <a  v-if="ckeitdcontent!==todo.id || (ckeitdcontent===todo.id && putStatus)" href="#" @click.prevent="editButton(todo)" title="編輯">
                    <i class="fa-solid fa-pen-to-square"></i> 
                  </a>
                 
                  <a  v-if="ckeitdcontent!==todo.id || (ckeitdcontent===todo.id && putStatus)" href="#" @click.prevent="emit('emit-del',todo)"  title="刪除">
                    <i class="fa-solid fa-trash"></i>
              </a>
             
            </li>
          </ul>
</template>