import{_,R as i,u as d,r as m,o as E,a as r,b as R,c as V,d as k,e as a,w as u,F as I,f,g as l}from"./index-5a59fb8a.js";const T={components:{RouterView:i},setup(){const{VITE_URL:c}={VITE_APIKEY:"AIzaSyD8FsfgoAZRnzsJxjCxln-rdUq52jXArQY",VITE_AUTHDOMAIN:"stock-bf37a.firebaseapp.com",VITE_DATABASEURL:"https://stock-bf37a-default-rtdb.firebaseio.com",VITE_PROJECTID:"stock-bf37a",VITE_STORAGEBUCKET:"stock-bf37a.appspot.com",VITE_MWSSAGINGSENDERID:"441545519471",VITE_APPID:"1:441545519471:web:7f747a2a080f4ace73389a",VITE_URL:"https://stock-upq4.onrender.com/",BASE_URL:"/stock/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},o=d(),t=m(""),s=()=>{t.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),f.defaults.headers.common.Authorization=t.value,f.post(`${c}api/users/check`).then(e=>{console.log(e),e.data.success||(alert("您尚未登入，請先登入!"),o.push("/login"))}).catch(e=>{console.log(e),o.push("/login")})};return E(()=>{s()}),{checkAdmin:s}}},A={class:"d-flex justify-content-center mt-4 mb-4"};function h(c,o,t,s,e,b){const n=r("RouterLink"),p=r("RouterView");return R(),V(I,null,[k("nav",A,[a(n,{to:"/",class:"me-4"},{default:u(()=>[l("庫存股")]),_:1}),a(n,{to:"/focus"},{default:u(()=>[l("關注股")]),_:1})]),a(p)],64)}const x=_(T,[["render",h]]);export{x as default};
