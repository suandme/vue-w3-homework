import{r as u,o as d,c,F as G,j as I,b as _,w as D,k as K,a as s,l as v,t as S,v as z,m as M,n as R,f as k,p as j,g as F,d as P,e as A,q as x,h as H,i as J}from"./index-B8kWNHsC.js";const Q={key:0,class:"todoList_item"},W={key:0,class:"todoList_label"},X=["onUpdate:modelValue","onChange"],Y={key:1,class:"inputBox"},Z=["onKeyup"],tt=["onClick"],et=s("i",{class:"fa-solid fa-pen-to-square"},null,-1),st=[et],at=["onClick"],ot=s("i",{class:"fa-solid fa-pen-to-square"},null,-1),nt=[ot],lt=["onClick"],it=s("i",{class:"fa-solid fa-trash"},null,-1),ut=[it],rt={__name:"TodoList",props:["list-todos","put-status"],emits:["emit-edit","emit-del","emit-patch","emit-put","update:put-status"],setup(U,{emit:y}){const p=u({content:""}),o=u(0),C=l=>{o.value=l.id,p.value.content=l.content,m("update:put-status",!1)},m=y;return(l,h)=>l.listTodos?(d(),c("ul",Q,[(d(!0),c(G,null,I(l.listTodos,a=>(d(),c("li",{key:a.id},[o.value!==a.id||o.value===a.id&&l.putStatus?(d(),c("label",W,[D(s("input",{class:"todoList_input","onUpdate:modelValue":i=>a.status=i,type:"checkbox",value:"true",onChange:v(i=>m("emit-patch",a),["prevent"])},null,40,X),[[K,a.status]]),s("span",null,S(a.content),1)])):_("",!0),o.value===a.id&&!l.putStatus?(d(),c("div",Y,[D(s("input",{type:"text",placeholder:"請輸入待辦事項","onUpdate:modelValue":h[0]||(h[0]=i=>p.value.content=i),onKeyup:M(i=>m("emit-put",p.value,a.id),["enter"])},null,40,Z),[[z,p.value.content]]),o.value===a.id?(d(),c("a",{key:0,href:"#",onClick:v(i=>m("emit-put",p.value,a.id),["prevent"]),title:"送出"},st,8,tt)):_("",!0)])):_("",!0),o.value!==a.id||o.value===a.id&&l.putStatus?(d(),c("a",{key:2,href:"#",onClick:v(i=>C(a),["prevent"]),title:"編輯"},nt,8,at)):_("",!0),o.value!==a.id||o.value===a.id&&l.putStatus?(d(),c("a",{key:3,href:"#",onClick:v(i=>m("emit-del",a),["prevent"]),title:"刪除"},ut,8,lt)):_("",!0)]))),128))])):_("",!0)}},dt={id:"todoListPage",class:"bg-half"},ct={class:"todo_sm"},vt={class:"conatiner todoListPage vhContainer"},pt={class:"todoList_Content"},ht={class:"inputBox"},_t=s("i",{class:"fa fa-plus"},null,-1),mt=[_t],ft={class:"errorMsg"},kt={class:"todoList_list"},$t={class:"todoList_tab"},gt={class:"todoList_items"},yt={key:0},Ct={key:1,class:"todoList_statistics"},$="https://todolist-api.hexschool.io/",N="hexschooltoken",Lt={__name:"TodoListPageView",setup(U){const y=u(""),p=u("");R(async()=>{await m()});const o=u(""),C=u(""),m=async()=>{try{const e=document.cookie;if(e!=""&&e.split("=")[0]==N){o.value=e.split("=")[1];const t=await k.get(`${$}users/checkout`,{headers:{Authorization:o.value}});t.data.status&&(p.value=t.data.token,y.value=t.data.nickname,C.value="驗證成功",g())}else alert("尚未取得Token"),V()}catch(e){e.response.data!=""&&(C.value="驗證失敗:"+e.response.data.message)}},l=u(""),h=u([]),a=u([]),i=u(0),T=e=>{a.value=h.value,i.value=e,e>0&&(a.value=h.value.filter(t=>t.status==(e==2)))},g=async()=>{try{const e=await k.get(`${$}todos`,{headers:{Authorization:o.value}});e.data.status&&(a.value=h.value=e.data.data,T(i.value))}catch(e){e.response.data!=""&&(l.value="驗證失敗:"+e.response.data.message)}},b=j(()=>a.value.sort((e,t)=>new Date(t.createTime)-new Date(e.createTime))),w=u(!1),f=u({content:""}),E=async()=>{try{i.value=0;const e=u(!0);w.value=!1,Object.values(f.value).every(n=>n!=="")||(e.value=!1,w.value=!0,alert("請輸入代辦事項")),o.value==""&&(w.value=!1,alert("尚未取得Token")),e.value&&(console.log("add",f.value),(await k.post(`${$}todos`,f.value,{headers:{Authorization:o.value}})).data.status&&(f.value={...f},g()))}catch(e){e.response.data!=""&&(l.value="驗證失敗:"+e.response.data.message)}},L=u(!1),B=async(e,t)=>{try{const n=await k.put(`${$}todos/${t}`,e,{headers:{Authorization:o.value}});n.data.status&&(console.log(n.data.status),L.value=n.data.status,alert(`${n.data.message}`),g())}catch(n){n.response.data!=""&&(l.value="驗證失敗:"+n.response.data.message)}},q=async e=>{try{const t={...e},n=await k.delete(`${$}todos/${t.id}`,{headers:{Authorization:o.value}});n.data.status&&(alert(`${n.data.message}`),g())}catch(t){t.response.data!=""&&(l.value="驗證失敗:"+t.response.data.message)}},O=async e=>{try{const t={...e},n=await k.patch(`${$}todos/${t.id}/toggle`,{},{headers:{Authorization:o.value}});n.data.status&&(alert(`${n.data.message}`),g())}catch(t){t.response.data!=""&&(l.value="驗證失敗:"+t.response.data.message)}},V=()=>{h.value=[],a.value=[],o.value="",document.cookie=`${N}=${p.value}; max-age=-1`,F.push("/")};return(e,t)=>{const n=H("RouterLink");return d(),c("div",dt,[s("nav",null,[s("h1",null,[P(n,{to:"/Todo"},{default:A(()=>[J("ONLINE TODO LIST ")]),_:1})]),s("ul",null,[s("li",ct,[P(n,{to:"/Todo"},{default:A(()=>[s("span",null,S(y.value)+" 的代辦",1)]),_:1})]),s("li",null,[s("a",{href:"#",onClick:t[0]||(t[0]=v(r=>V(),["prevent"]))},"登出")])])]),s("div",vt,[s("div",pt,[s("div",ht,[D(s("input",{type:"text",placeholder:"請輸入待辦事項","onUpdate:modelValue":t[1]||(t[1]=r=>f.value.content=r),onKeyup:t[2]||(t[2]=M(r=>E(),["enter"]))},null,544),[[z,f.value.content]]),s("a",{href:"#",onClick:t[3]||(t[3]=v(r=>E(),["prevent"]))},mt)]),s("span",ft,S(l.value),1),s("div",kt,[s("ul",$t,[s("li",null,[s("a",{href:"#",class:x(i.value==0?"active":""),onClick:t[4]||(t[4]=v(r=>T(0),["prevent"]))},"全部",2)]),s("li",null,[s("a",{href:"#",class:x(i.value==1?"active":""),onClick:t[5]||(t[5]=v(r=>T(1),["prevent"]))},"待完成",2)]),s("li",null,[s("a",{href:"#",class:x(i.value==2?"active":""),onClick:t[6]||(t[6]=v(r=>T(2),["prevent"]))},"已完成",2)])]),s("div",gt,[!a.value.length>0?(d(),c("span",yt,"「目前尚無待辦事項」")):_("",!0),P(rt,{"list-todos":b.value,"put-status":L.value,onEmitDel:q,onEmitPatch:O,onEmitPut:B,putStatus:L.value,"onUpdate:putStatus":t[7]||(t[7]=r=>L.value=r)},null,8,["list-todos","put-status","putStatus"]),a.value.length>0?(d(),c("div",Ct,[s("p",null,S(h.value.filter(r=>r.status==!1).length)+" 待完成項目總數",1)])):_("",!0)])])])])])}}};export{Lt as default};
