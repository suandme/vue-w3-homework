<script setup>
//製作元件
import  {defineProps} from 'vue'
//外到內
const props=defineProps (['list-todos']) 

const emit=defineEmits  (['emit-edit','emit-del'])

</script>
<template>
    <ul class="todoList_item" v-if="listTodos">
            <li v-for="todo in listTodos" :key="todo.id">
              <label class="todoList_label">
                <input class="todoList_input" v-model="todo.status" type="checkbox" value="true" @change.prevent="PatchTodosContenSend(todo)">
                <span>{{todo.content}}</span>
              </label>
              <a href="#" @click.prevent="emit('emitEdit',todo)" title="編輯">
                <i class="fa-solid fa-pen-to-square"></i> 
              </a>
              <a href="#" @click.prevent="emit('emitDel',todo)"  title="刪除">
                <i class="fa-solid fa-trash"></i>
              </a>
             
            </li>
          </ul>
</template>