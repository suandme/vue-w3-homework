<script setup>
import router from '@/router';
import axios from 'axios';
import { computed, onMounted, onUpdated, ref} from "vue";
import TodoList from  '@/components/TodoList.vue'
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
const NowGetselectStaus=ref(0)
const GetselectStaus= (bools)=>{
  filterTodosListData.value= GetTodosListData.value;
  NowGetselectStaus.value=bools;
  if (bools>0)
     filterTodosListData.value= GetTodosListData.value.filter(x=>x.status==(bools==2));
   
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
                GetselectStaus( NowGetselectStaus.value);
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
   
    NowGetselectStaus.value=0;
    const requiredALL=ref(true);PostTodosContenrequired.value=false; 
     //every檢查是否有空白
     const isEmpty = Object.values(PostTodosConten.value).every(value => value !== '');
    if (!isEmpty)
        {requiredALL.value=false;PostTodosContenrequired.value=true;alert(`請輸入代辦事項`); } 
      if (CheckToken.value=='')
         {PostTodosContenrequired.value=false; alert(`尚未取得Token`);} 
   
     if (requiredALL.value)
      { console.log('add',PostTodosConten.value)
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
const PutSendstatus=ref(false);
const PutTodosContenSend=async (content,id)=>{

try {
 
   const res = await axios.put(`${ApiUrl}todos/${id}`,content, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                      });
           if (res.data.status)
                {
                  console.log(res.data.status);
                  PutSendstatus.value=res.data.status;
                  alert(`${res.data.message}`);
                  GetTodosList();
                  
                }
 
  } catch (error) {
  if (error.response.data!='')
      TodosResMsg.value="驗證失敗:"+error.response.data.message;
  }

}
//7.代辦事項-刪除代辦事項
const DeleteTodosConten=async (todo)=>{
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
                    {  
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
    <h1> <RouterLink to="/Todo" >ONLINE TODO LIST </RouterLink> </h1>
    <ul>
      <li class="todo_sm">
        <RouterLink to="/Todo" ><span>{{ SignInUser }} 的代辦</span></RouterLink> 
      </li>
      <li>
        <a href="#" @click.prevent="SingOut()">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <div class="inputBox">
        <input type="text" placeholder="請輸入待辦事項" v-model="PostTodosConten.content"
          @keyup.enter="PostTodosContenSend()">
        <a href="#" @click.prevent="PostTodosContenSend()">
          <i class="fa fa-plus"></i>
        </a>
      </div>
      <span class="errorMsg" >{{TodosResMsg}}</span>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" :class="NowGetselectStaus==0?'active':''" @click.prevent="GetselectStaus(0)">全部</a></li>
          <li><a href="#" :class="NowGetselectStaus==1?'active':''" @click.prevent="GetselectStaus(1)">待完成</a></li>
          <li><a href="#"  :class="NowGetselectStaus==2?'active':''" @click.prevent="GetselectStaus(2)">已完成</a></li>
        </ul>
        <div class="todoList_items">
          <span v-if="!filterTodosListData.length>0" >「目前尚無待辦事項」</span>
          <TodoList :list-todos="SortTodosListData" 
         :put-status="PutSendstatus"
          v-on:emit-del="DeleteTodosConten"
          v-on:emit-patch="PatchTodosContenSend"
          v-on:emit-put="PutTodosContenSend"
         v-model:putStatus="PutSendstatus"
          />      
          <div class="todoList_statistics" v-if="filterTodosListData.length>0">
            <p> {{ GetTodosListData.filter(x=>x.status==false).length }} 待完成項目總數</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>