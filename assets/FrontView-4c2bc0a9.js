import{_ as m,R as k,u as E,r as R,o as T,a as u,b as V,c as h,d as i,e as a,w as l,f as I,F as A,g as f,S,h as p}from"./index-ba068148.js";const b={components:{RouterView:k},setup(){const{VITE_URL:c}={VITE_APIKEY:"AIzaSyD8FsfgoAZRnzsJxjCxln-rdUq52jXArQY",VITE_AUTHDOMAIN:"stock-bf37a.firebaseapp.com",VITE_DATABASEURL:"https://stock-bf37a-default-rtdb.firebaseio.com",VITE_PROJECTID:"stock-bf37a",VITE_STORAGEBUCKET:"stock-bf37a.appspot.com",VITE_MWSSAGINGSENDERID:"441545519471",VITE_APPID:"1:441545519471:web:7f747a2a080f4ace73389a",VITE_URL:"https://stock-upq4.onrender.com/",BASE_URL:"/stock/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},o=E(),s=R(""),e=()=>{s.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),f.defaults.headers.common.Authorization=s.value,f.post(`${c}api/users/check`).then(t=>{t.data.success||(S.fire({icon:"success",title:"您尚未登入，請先登入!",showConfirmButton:!0,timer:2e3}),o.push("/login"))}).catch(t=>{console.log(t),o.push("/login")})},n=()=>{document.cookie="stockToken=;expires=;",o.push("/login")};return T(()=>{e()}),{checkAdmin:e,logout:n}}},g={class:"d-flex justify-content-center mt-4 mb-4"};function w(c,o,s,e,n,t){const r=u("RouterLink"),d=u("RouterView");return V(),h(A,null,[i("nav",g,[a(r,{to:"/",class:"me-4"},{default:l(()=>[p("庫存股")]),_:1}),a(r,{to:"/focus",class:"me-4"},{default:l(()=>[p("關注股")]),_:1}),i("a",{href:"#",onClick:o[0]||(o[0]=I((..._)=>e.logout&&e.logout(..._),["prevent"]))},"登出")]),a(d)],64)}const D=m(b,[["render",w]]);export{D as default};
