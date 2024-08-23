<script setup>
import axios from 'axios';
import { ref} from "vue";

//API
const ApiUrl="https://todolist-api.hexschool.io/";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//1.註冊會員
const signUpPageData=ref({
  "email":'',
  "password": '',
  "nickname": ''
})
const signUpResMsg=ref('')
const signUpPageCkpassword=ref('')
const signUpPageAdd= ()=>
{
    const requiredALL=ref(true);
    signUpResMsg.value="";
     //every檢查是否有空白
     const isEmpty = Object.values(signUpPageData.value).every(value => value !== '');
      if (!isEmpty)
        {requiredALL.value=false; alert("您尚未填寫資料");} 
      if (signUpPageData.value.email!=='' &&!emailPattern.test(signUpPageData.value.email))
        {requiredALL.value=false; alert("E-mail格式錯誤");} 
      if (!signUpPageCkpassword.value==signUpPageData.value.password)
        { requiredALL.value=false;  alert("您輸入的密碼不正確");}
      if (requiredALL.value)
      {
          axios.post(`${ApiUrl}users/sign_up`,signUpPageData.value)
                    .then((res)=>
                      {
                          if (res.data.status)
                              alert("註冊成功!");
                      }).catch((error)=>{
                        if (error.response.data!='')
                          signUpResMsg.value="註冊失敗:"+error.response.data.message;
                    })

      }
            
}
//2.登入會員
const SignInResMsg=ref('');
const SignIntoken=ref('');
const SignInpDataObject=ref({
    email: '',
    password: '',
});
const SignInSend=()=>{
    const requiredALL=ref(true);
    //every檢查是否有空白
    const isEmpty = Object.values(SignInpDataObject.value).every(value => value !== '');
    if (!isEmpty)
    {requiredALL.value=false; alert("您尚未填寫資料");} 
    if (SignInpDataObject.value.email!=='' && !emailPattern.test(SignInpDataObject.value.email))
      {requiredALL.value=false; alert("E-mail格式錯誤");} 
    if (requiredALL.value)
    {
      axios.post(`${ApiUrl}users/sign_in`,SignInpDataObject.value)
        .then((res)=>
            {
              SignInResMsg.value="登入失敗";
                if (res.data.status)
                {//exp,token,nickname
                  SignInResMsg.value="";
                  SignIntoken.value=res.data.token;
                  //存入cookie
                  const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    document.cookie = `hexschooltoken=${SignIntoken.value}; expires=${tomorrow.toUTCString()}`;
                    alert(`歡迎 ${res.data.nickname} 登入成功`)

                }
            }).catch((error)=>{
              if (error.response.data!='')
                 SignInResMsg.value="登入失敗:"+error.response.data.message;
            })
    }
      
}
//3.TodolistPage 驗證
const CheckToken=ref('');
const CheckoutResMsg=ref('');
const CheckoutToken=async ()=>{
    try {
      const output =document.cookie;
      if (output!='' && output.split('=')[0]=="hexschooltoken")
      {
        CheckToken.value= output.split('=')[1];
         console.log(output.split('=')[1]);
          const res = await axios.get(`${ApiUrl}users/checkout`, {
                          headers: {
                              Authorization:  CheckToken.value,
                          },
                     });
           if (res.data.status)
                  CheckoutResMsg.value = '驗證成功';
      }
     else{
        alert(`尚未取得Token`)
     }
  } catch (error) {
    if (error.response.data!='')
         CheckoutResMsg.value="驗證失敗:"+error.response.data.message;
      
  }
      
}

</script>

<template>
  

<!-- login_page -->
<div id="loginPage" class="bg-yellow">
  <div class="conatiner loginPage vhContainer ">
    <div class="side">
      <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
      <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" v-model="SignInpDataObject.email" required>
        <span>此欄位不可留空</span>
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="SignInpDataObject.password" required>
        <input class="formControls_btnSubmit" type="button" @click="SignInSend" value="登入">
        <a class="formControls_btnLink" href="#signUpPage">註冊帳號</a>
        <span class="errorMsg"  v-text="SignInResMsg"></span>
        <input class="formControls_btnSubmit" type="button" @click="CheckoutToken" value="進入測試用">
        <span class="errorMsg"  v-text="CheckoutResMsg"></span>  <span class="errorMsg"  v-text="SignInResMsg"></span>
        <a class="formControls_btnLink" href="#todoListPage">進入測試用</a>
      </form>
    </div>
  </div>
</div>

<!-- sign up -->
<div id="signUpPage" class="bg-yellow">
  <div class="conatiner signUpPage vhContainer">
    <div class="side">
      <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
      <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">註冊帳號</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="text" v-model="signUpPageData.email" id="email" name="email" placeholder="請輸入 email" required>
        <label class="formControls_label" for="name">您的暱稱</label>
        <input class="formControls_input" type="text" v-model="signUpPageData.nickname" name="name" id="name" placeholder="請輸入您的暱稱">
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" v-model="signUpPageData.password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input class="formControls_input" type="password" v-model="signUpPageCkpassword" name="pwd" id="pwd" placeholder="請再次輸入密碼" required>
        <input class="formControls_btnSubmit" type="button" @click="signUpPageAdd" value="註冊帳號">
        <a class="formControls_btnLink" href="#loginPage">登入</a>
        <span class="errorMsg" v-text="signUpResMsg"></span>
      </form>
    </div>
  </div>

</div>

<!-- ToDo List -->
<div id="todoListPage" class="bg-half">
  <nav>
    <h1><a href="#">ONLINE TODO LIST</a></h1>
    <ul>
      <li class="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
      <li><a href="#loginPage">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <div class="inputBox">
        <input type="text" placeholder="請輸入待辦事項">
        <a href="#">
          <i class="fa fa-plus"></i>
        </a>
      </div>
      <div class="todoList_list">
        <ul class="todoList_tab">
          <li><a href="#" class="active">全部</a></li>
          <li><a href="#">待完成</a></li>
          <li><a href="#">已完成</a></li>
        </ul>
        <div class="todoList_items">
          <ul class="todoList_item">
            <li>
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true">
                <span>把冰箱發霉的檸檬拿去丟</span>
              </label>
              <a href="#">
                <i class="fa fa-times"></i>
              </a>
            </li>
            <li>
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true">
                <span>打電話叫媽媽匯款給我</span>
              </label>
              <a href="#">
                <i class="fa fa-times"></i>
              </a>
            </li>
            <li>
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true">
                <span>整理電腦資料夾</span>
              </label>
              <a href="#">
                <i class="fa fa-times"></i>
              </a>
            </li>
            <li>
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true">
                <span>繳電費水費瓦斯費</span>
              </label>
              <a href="#">
                <i class="fa fa-times"></i>
              </a>
            </li>
            <li>
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true">
                <span>約vicky禮拜三泡溫泉</span>
              </label>
              <a href="#">
                <i class="fa fa-times"></i>
              </a>
            </li>
            <li>
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" value="true">
                <span>約ada禮拜四吃晚餐</span>
              </label>
              <a href="#">
                <i class="fa fa-times"></i>
              </a>
            </li>
          </ul>
          <div class="todoList_statistics">
            <p> 5 個已完成項目</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>
