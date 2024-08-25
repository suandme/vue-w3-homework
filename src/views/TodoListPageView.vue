<script setup>
import router from '@/router';
import axios from 'axios';
import { computed, onMounted, ref} from "vue";

//API
const ApiUrl="https://todolist-api.hexschool.io/";
const cookieName='hexschooltoken';
const SignInUser=ref('');
const SignIntoken=ref('');
onMounted (async ()=>{
//驗證
   await CheckoutToken();
} ) 
//3.TodolistPage 驗證
const CheckToken=ref('');
const CheckoutResMsg=ref('');
const CheckoutToken=async ()=>{
    try {
      const output =document.cookie;
      if (output!='' && output.split('=')[0]==cookieName)
      {
           CheckToken.value= output.split('=')[1];
           const res = await axios.get(`${ApiUrl}users/checkout`, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                      });
           if (res.data.status)
           {
                SignIntoken.value=res.data.token;
                SignInUser.value=res.data.nickname;
                CheckoutResMsg.value = '驗證成功';
                GetTodosList();
           }
      }
     else{

        alert(`尚未取得Token`)
        SingOut();
        
     }
    } catch (error) {
    if (error.response.data!='')
         CheckoutResMsg.value="驗證失敗:"+error.response.data.message;
    }
      
}

//4.代辦事項-取得所有代辦事項
const TodosResMsg=ref('')
const GetTodosListData=ref([])
const filterTodosListData=ref([])
const GetselectStaus= (bools)=>{
  filterTodosListData.value= GetTodosListData.value;
  if (typeof(bools)!=='undefined')
    filterTodosListData.value= GetTodosListData.value.filter(x=>x.status==bools);
}
const GetTodosList=async ()=>{
  try {
      const res = await axios.get(`${ApiUrl}todos`, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                      });
           if (res.data.status)
             { 
                filterTodosListData.value= GetTodosListData.value=res.data.data; 
             }
    } catch (error) {
    if (error.response.data!='')
         TodosResMsg.value="驗證失敗:"+error.response.data.message;
    }

};
 //排序;最新的在最上面
const SortTodosListData= computed(() => {
     return filterTodosListData.value.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
 });

//5.代辦事項-新增代辦事項
const PostTodosContenrequired=ref(false)
const PostTodosConten=ref({
  content: ''
})

const PostTodosContenSend=async ()=>{

  try {
   
    const requiredALL=ref(true);PostTodosContenrequired.value=false; 
     //every檢查是否有空白
     const isEmpty = Object.values(PostTodosConten.value).every(value => value !== '');
    if (!isEmpty)
        {requiredALL.value=false;PostTodosContenrequired.value=true;alert(`請輸入代辦事項`); } 
      if (CheckToken.value=='')
         {PostTodosContenrequired.value=false; alert(`尚未取得Token`);} 
   
     if (requiredALL.value)
      { 
           const res = await axios.post(`${ApiUrl}todos`,PostTodosConten.value, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                      });
           if (res.data.status)
                {
                  PostTodosConten.value={ ...PostTodosConten};
                  GetTodosList();
                }
      }
    
    } catch (error) {
    if (error.response.data!='')
        TodosResMsg.value="驗證失敗:"+error.response.data.message;
    }

}
//6..代辦事項-更新代辦事項
const ButtonStatus=ref(true);
const PutTodosid=ref(0);
const PutTodosConten=(todo)=>{
  const EditConten={ ...todo}
   PostTodosConten.value.content=EditConten.content;
   PutTodosid.value=EditConten.id;
   ButtonStatus.value=false;
}
const PutTodosContenSend=async ()=>{

try {
 
   const res = await axios.put(`${ApiUrl}todos/${PutTodosid.value}`,PostTodosConten.value, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                      });
           if (res.data.status)
                {
                  ButtonStatus.value=true;
                  PostTodosConten.value={ ...PostTodosConten};
                  alert(`${res.data.message}`);
                  GetTodosList();
                  
                }

 
  } catch (error) {
  if (error.response.data!='')
      TodosResMsg.value="驗證失敗:"+error.response.data.message;
  }

}
//7.代辦事項-刪除代辦事項
const DeleteTodosContenSend=async (todo)=>{

try {
  const EditConten={ ...todo}
   const res = await axios.delete(`${ApiUrl}todos/${EditConten.id}`, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                      });
           if (res.data.status)
                {
                  alert(`${res.data.message}`);
                  GetTodosList();
                }

 
  } catch (error) {
  if (error.response.data!='')
      TodosResMsg.value="驗證失敗:"+error.response.data.message;
  }

}

//8.代辦事項-切換代辦事項狀態
const PatchTodosContenSend=async (todo)=>{
    try {

    const EditConten={ ...todo}
    const res = await axios.patch(`${ApiUrl}todos/${EditConten.id}/toggle`,{}, {
                            headers: {
                                Authorization:  CheckToken.value,
                            },
                        });
            if (res.data.status)
                    {  PostTodosConten.value={ ...PostTodosConten};
                    alert(`${res.data.message}`);
                    GetTodosList();
                    }

    
    } catch (error) {
    if (error.response.data!='')
        TodosResMsg.value="驗證失敗:"+error.response.data.message;
    }

}

//9.會員登出
const SingOut=()=>{
  GetTodosListData.value=[];
  filterTodosListData.value=[];
  CheckToken.value= '';
  document.cookie = `${cookieName}=${SignIntoken.value}; max-age=-1`;
  router.push('/')
}
</script>
<template>
    
<!-- ToDo List -->
<div id="todoListPage" class="bg-half">
  <nav>
    <h1><a href="#">ONLINE TODO LIST</a></h1>
    <ul>
      <li class="todo_sm">
        <RouterLink to="/TodoListPageView" ><span>{{ SignInUser }} 的代辦</span></RouterLink> 
      </li>
      <li>
        <a href="#" @click.prevent="SingOut()">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <div class="inputBox">
        <input type="text" placeholder="請輸入待辦事項" v-model="PostTodosConten.content"
          @keyup.enter="ButtonStatus? PostTodosContenSend():PutTodosContenSend()">
        <a href="#" @click.prevent="ButtonStatus? PostTodosContenSend():PutTodosContenSend()">
          <i :class="ButtonStatus? 'fa fa-plus':'fa-solid fa-pen-to-square' "></i>
        </a>
      </div>
      <span class="errorMsg" >{{TodosResMsg}}</span>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" class="active" @click.prevent="GetselectStaus()">全部</a></li>
          <li><a href="#" @click.prevent="GetselectStaus(false)">待完成</a></li>
          <li><a href="#" @click.prevent="GetselectStaus(true)">已完成</a></li>
        </ul>
        <div class="todoList_items">
          <span v-if="!filterTodosListData.length>0" >「目前尚無待辦事項」</span>
          <ul class="todoList_item" v-if="filterTodosListData.length>0">
            <li v-for="todo in SortTodosListData" :key="todo.id">
              <label class="todoList_label">
                <input class="todoList_input" v-model="todo.status" type="checkbox" value="true" @change.prevent="PatchTodosContenSend(todo)">
                <span>{{todo.content}}</span>
              </label>
              <a href="#" @click.prevent="PutTodosConten(todo)" title="編輯">
                <i class="fa-solid fa-pen-to-square"></i> 
              </a>
              <a href="#" @click.prevent="DeleteTodosContenSend(todo)"  title="刪除">
                <i class="fa-solid fa-trash"></i>
              </a>
             
            </li>
          </ul>
          <div class="todoList_statistics" v-if="filterTodosListData.length>0">
            <p> {{ GetTodosListData.filter(x=>x.status==true).length }} 個已完成項目</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>