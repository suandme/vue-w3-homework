import{r as i,c as r,a as e,w as p,v as m,b as c,d as g,e as h,t as w,f as C,g as b,o as u,h as k}from"./index-8TVy06T7.js";const y={id:"signUpPage",class:"bg-yellow"},x={class:"conatiner signUpPage vhContainer"},U=e("div",{class:"side"},[e("a",{href:"#"},[e("img",{class:"logoImg",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png",alt:""})]),e("img",{class:"d-m-n",src:"https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png",alt:"workImg"})],-1),V={class:"formControls",action:"index.html"},P=e("h2",{class:"formControls_txt"},"註冊帳號",-1),q=e("label",{class:"formControls_label",for:"email"},"Email",-1),E={key:0},L=e("label",{class:"formControls_label",for:"name"},"您的暱稱",-1),N={key:1},A=e("label",{class:"formControls_label",for:"pwd"},"密碼",-1),B={key:2},D=e("label",{class:"formControls_label",for:"pwd"},"再次輸入密碼",-1),M={key:3},R=["textContent"],S="https://todolist-api.hexschool.io/",$={__name:"SignUpPageView",setup(I){const _=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,s=i({email:"",password:"",nickname:""}),l=i(!1),v=i(""),d=i(""),f=()=>{const n=i(!0);v.value="",l.value=!1,Object.values(s.value).every(a=>a!=="")||(n.value=!1,l.value=!0),s.value.email!==""&&!_.test(s.value.email)&&(n.value=!1,alert("E-mail格式錯誤")),!d.value==s.value.password&&(n.value=!1,alert("您輸入的密碼不正確")),n.value&&C.post(`${S}users/sign_up`,s.value).then(a=>{a.data.status&&alert("註冊成功!")}).catch(a=>{a.response.data!=""&&(v.value="註冊失敗:"+a.response.data.message)})};return(n,t)=>{const a=b("RouterLink");return u(),r("div",y,[e("div",x,[U,e("div",null,[e("form",V,[P,q,p(e("input",{class:"formControls_input",type:"text","onUpdate:modelValue":t[0]||(t[0]=o=>s.value.email=o),id:"email",name:"email",placeholder:"請輸入 email",required:""},null,512),[[m,s.value.email]]),l.value&&s.value.email==""?(u(),r("span",E,"此欄位不可留空")):c("",!0),L,p(e("input",{class:"formControls_input",type:"text","onUpdate:modelValue":t[1]||(t[1]=o=>s.value.nickname=o),name:"name",id:"name",placeholder:"請輸入您的暱稱"},null,512),[[m,s.value.nickname]]),l.value&&s.value.nickname==""?(u(),r("span",N,"此欄位不可留空")):c("",!0),A,p(e("input",{class:"formControls_input",type:"password","onUpdate:modelValue":t[2]||(t[2]=o=>s.value.password=o),name:"pwd",id:"pwd",placeholder:"請輸入密碼",required:""},null,512),[[m,s.value.password]]),l.value&&s.value.password==""?(u(),r("span",B,"此欄位不可留空")):c("",!0),D,p(e("input",{class:"formControls_input",type:"password","onUpdate:modelValue":t[3]||(t[3]=o=>d.value=o),name:"pwd",id:"pwd",placeholder:"請再次輸入密碼",required:""},null,512),[[m,d.value]]),l.value&&d.value==""?(u(),r("span",M,"此欄位不可留空")):c("",!0),e("input",{class:"formControls_btnSubmit",type:"button",onClick:f,value:"註冊帳號"}),g(a,{to:"/",class:"formControls_btnLink"},{default:h(()=>[k("登入")]),_:1}),e("span",{class:"errorMsg",textContent:w(v.value)},null,8,R)])])])])}}};export{$ as default};
