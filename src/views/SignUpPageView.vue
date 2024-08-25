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
const signUprequired=ref(false)
const signUpResMsg=ref('')
const signUpPageCkpassword=ref('')
const signUpPageAdd= ()=>
{
    const requiredALL=ref(true);
    signUpResMsg.value="";signUprequired.value=false;
     //every檢查是否有空白
     const isEmpty = Object.values(signUpPageData.value).every(value => value !== '');
      if (!isEmpty)
        {requiredALL.value=false;signUprequired.value=true; } 
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
</script>
<template>
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
        <span v-if="signUprequired && signUpPageData.email==''" >此欄位不可留空</span>
        <label class="formControls_label" for="name">您的暱稱</label>
        <input class="formControls_input" type="text" v-model="signUpPageData.nickname" name="name" id="name" placeholder="請輸入您的暱稱">
        <span v-if="signUprequired && signUpPageData.nickname==''" >此欄位不可留空</span>
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" v-model="signUpPageData.password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
        <span v-if="signUprequired && signUpPageData.password==''" >此欄位不可留空</span>
        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input class="formControls_input" type="password" v-model="signUpPageCkpassword" name="pwd" id="pwd" placeholder="請再次輸入密碼" required>
        <span v-if="signUprequired && signUpPageCkpassword==''" >此欄位不可留空</span>
        <input class="formControls_btnSubmit" type="button" @click="signUpPageAdd" value="註冊帳號">
        <RouterLink to="/" class="formControls_btnLink">登入</RouterLink> 
        <span class="errorMsg" v-text="signUpResMsg"></span>
      </form>
    </div>
  </div>

</div>
</template>