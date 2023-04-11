import{_ as F,r as k,h as U,o as z,b as l,c as i,d as t,i as D,v as L,n as $,F as B,j as R,g as T,t as c,k as K,f as d,S as P,l as M}from"./index-5a59fb8a.js";const N={setup(){const a=k(""),r=k(null),v=k([]),e=k(""),b=k([]),{VITE_URL:h}={VITE_APIKEY:"AIzaSyD8FsfgoAZRnzsJxjCxln-rdUq52jXArQY",VITE_AUTHDOMAIN:"stock-bf37a.firebaseapp.com",VITE_DATABASEURL:"https://stock-bf37a-default-rtdb.firebaseio.com",VITE_PROJECTID:"stock-bf37a",VITE_STORAGEBUCKET:"stock-bf37a.appspot.com",VITE_MWSSAGINGSENDERID:"441545519471",VITE_APPID:"1:441545519471:web:7f747a2a080f4ace73389a",VITE_URL:"https://stock-upq4.onrender.com/",BASE_URL:"/stock/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},f=k({}),p=U(()=>(console.log(a.value),a.value?b.value.filter(o=>o.name.match(a.value)||o.code.match(a.value)):""));function g(o){a.value=`${o.code}`,p.value.length=0}function u(){e.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),d.defaults.headers.common.Authorization=e.value,d.post(`${h}api/focus/getfocusStock`).then(o=>{console.log(o.data),f.value=o.data.index,v.value=o.data.resultArray}).catch(o=>{console.log(o)})}const S=()=>{e.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),d.defaults.headers.common.Authorization=e.value;const o=b.value.filter(s=>s.name.match(a.value)||s.code.match(a.value));console.log(o);const _={code:o[0].code,name:o[0].name,token:e.value,stockCode:o[0].stockCode,uid:Date.parse(new Date),dealPrice:0,updown:0,change:""};d.post(`${h}api/focus/addStock`,_).then(s=>{P.fire({title:"加入完成!",icon:"success",showConfirmButton:!1,timer:1500}),console.log(s),u()}).catch(s=>{console.log(s)}),a.value=""};function m(){d.get(`${h}api/stock/getStocks`).then(o=>{b.value=o.data}).catch(o=>{console.log(o)})}function w(){e.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),d.defaults.headers.common.Authorization=e.value,d.post(`${h}api/focus/updateFocusStockPrice`).then(o=>{console.log(o),v.value=o.data,u()}).catch(o=>{console.log(o)})}const x=o=>{e.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),d.defaults.headers.common.Authorization=e.value,P.fire({title:"確定要刪除嗎?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"確定",cancelButtonText:"取消"}).then(_=>{_.isConfirmed&&d.delete(`${h}api/focus/deleteStock?code=${o}`).then(s=>{s.data.success&&u()}).catch(s=>{console.log(s)})})};return z(()=>{m(),u()}),{search:a,stocks:p,inputValue:g,addStock:S,list:r,focusStock:v,getFocusStock:u,getStocks:m,updateFocusStockPrice:w,deleteStock:x,index:f}}},O={class:"container"},j={class:"row"},G={class:"position-relative text-center"},q=["onClick","onKeypress"],J={class:"d-flex justify-content-around mt-3"},Y={key:0},H=t("i",{class:"bi bi-arrow-up"},null,-1),Q=[H],W={key:1},X=t("i",{class:"bi bi-arrow-down"},null,-1),Z=[X],ee={key:0},oe=t("i",{class:"bi bi-arrow-up"},null,-1),te=[oe],ne={key:1},se=t("i",{class:"bi bi-arrow-down"},null,-1),ce=[se],ae={class:"table mt-4 table-responsive"},le=t("thead",null,[t("tr",null,[t("td",null,"名稱"),t("td",null,"現價"),t("td",null,"漲跌"),t("td",null,"幅度"),t("td")])],-1),ie=["onClick"];function de(a,r,v,e,b,h){var f,p,g,u,S,m,w,x,o,_,s,y,E,A,V,I;return l(),i("main",null,[t("div",O,[t("div",j,[t("div",G,[D(t("input",{type:"search",id:"stock_code","onUpdate:modelValue":r[0]||(r[0]=n=>e.search=n),"aria-label":"Search",placeholder:"請輸入股票代號或是股票名稱",class:"input_stock p-2"},null,512),[[L,e.search]]),t("ul",{class:$(["list-unstyled searchList",{"d-none":!e.stocks.length,"position-absolute":e.stocks.length}])},[(l(!0),i(B,null,R(e.stocks,n=>(l(),i("li",{key:n.code,onClick:C=>e.inputValue(n),onKeypress:M(C=>e.inputValue(n),["enter"]),role:"button",tabIndex:0,class:"p-1"},c(n.code+" "+n.name),41,q))),128))],2),t("button",{type:"button",class:"ms-2 btn btn-outline-primary",onClick:r[1]||(r[1]=(...n)=>e.addStock&&e.addStock(...n))}," 加入 ")])]),t("div",J,[t("div",null,[T(" 加權指數："+c((p=(f=e.index)==null?void 0:f.tse)==null?void 0:p.deal)+" ",1),((u=(g=e.index)==null?void 0:g.tse)==null?void 0:u.updown)*1>0?(l(),i("span",Y,Q)):(l(),i("span",W,Z)),T(" "+c((m=(S=e.index)==null?void 0:S.tse)==null?void 0:m.updown)+" ("+c((x=(w=e.index)==null?void 0:w.tse)==null?void 0:x.change)+") ",1)]),t("div",null,[T("櫃買指數："+c((_=(o=e.index)==null?void 0:o.otc)==null?void 0:_.deal)+" ",1),((y=(s=e.index)==null?void 0:s.otc)==null?void 0:y.updown)*1>0?(l(),i("span",ee,te)):(l(),i("span",ne,ce)),T(" "+c((A=(E=e.index)==null?void 0:E.otc)==null?void 0:A.updown)+" ("+c((I=(V=e.index)==null?void 0:V.otc)==null?void 0:I.change)+") ",1)])]),D(t("table",ae,[le,t("tbody",null,[(l(!0),i(B,null,R(e.focusStock,n=>(l(),i("tr",{key:n.code},[t("td",null,c(n.name),1),t("td",null,c(n.dealPrice),1),t("td",null,c(n.updown),1),t("td",null,c(n.change),1),t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger",onClick:C=>e.deleteStock(n.code)}," 刪除 ",8,ie)])]))),128))])],512),[[K,e.focusStock.length]])])])}const re=F(N,[["render",de]]);export{re as default};