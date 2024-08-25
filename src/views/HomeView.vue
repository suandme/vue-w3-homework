<script setup>
import router from '@/router';
import axios from 'axios';
import { ref} from "vue";

//API
const ApiUrl="https://todolist-api.hexschool.io/";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cookieName='hexschooltoken';
//1.註冊會員:SignUPPageView

//2.登入會員
const SignInrequired=ref(false);
const SignInResMsg=ref('');


const SignInpDataObject=ref({
    email: '',
    password: '',
});
const SignInSend=()=>{
  
    const requiredALL=ref(true);SignInrequired.value=false; 
    //every檢查是否有空白
    const isEmpty = Object.values(SignInpDataObject.value).every(value => value !== '');
    if (!isEmpty)
    {requiredALL.value=false;SignInrequired.value=true; } 
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
                  //存入cookie
                  const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    document.cookie = `${cookieName}=${res.data.token}; expires=${tomorrow.toUTCString()}`;
                  router.push('/Todo');
                }
            }).catch((error)=>{
              if (error.response?.data)
                 SignInResMsg.value="登入失敗:"+error.response.data.message;
            })
    }
      
}

//3.註冊會員:TodoListPageView

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
        <span v-if="SignInrequired && SignInpDataObject.email==''" >此欄位不可留空</span>
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="SignInpDataObject.password" required>
        <span v-if="SignInrequired && SignInpDataObject.password==''" >此欄位不可留空</span>
        <input class="formControls_btnSubmit" type="button" @click="SignInSend" value="登入">
        <RouterLink to="/Register" class="formControls_btnLink">註冊帳號</RouterLink> 
        <span class="errorMsg"  v-text="SignInResMsg"></span>
      </form>
    </div>
  </div>
</div>



</template>
