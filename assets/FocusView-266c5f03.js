import{_ as K,L as $,r as d,i as j,j as Y,o as q,k as G,a as J,b as r,c as u,e as H,d as e,l as I,v as Q,F as V,m as z,n as N,h as y,t as c,p as O,g as m,S as T,q as W}from"./index-6f46f39d.js";const X={components:{Loading:$},setup(){const b=d(!1),i=d(null),l=d(""),o=d(null),E=d([]),_=d(""),p=d([]),{VITE_URL:f}={VITE_APIKEY:"AIzaSyD8FsfgoAZRnzsJxjCxln-rdUq52jXArQY",VITE_AUTHDOMAIN:"stock-bf37a.firebaseapp.com",VITE_DATABASEURL:"https://stock-bf37a-default-rtdb.firebaseio.com",VITE_PROJECTID:"stock-bf37a",VITE_STORAGEBUCKET:"stock-bf37a.appspot.com",VITE_MWSSAGINGSENDERID:"441545519471",VITE_APPID:"1:441545519471:web:7f747a2a080f4ace73389a",VITE_URL:"https://stock-upq4.onrender.com/",BASE_URL:"/stock/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},k=d({}),v=d(!1),w=j(()=>l.value?p.value.filter(t=>t.name.match(l.value)||t.code.match(l.value)):"");Y(()=>w.value,()=>{v.value=!0});function S(t){l.value=`${t.code}`,v.value=!1}function h(){_.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),m.defaults.headers.common.Authorization=_.value,m.post(`${f}api/focus/getfocusStock`).then(t=>{k.value=t.data.index,E.value=t.data.resultArray}).catch(t=>{alert(t.data)})}const x=()=>{_.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),m.defaults.headers.common.Authorization=_.value;const t=p.value.filter(s=>s.name.match(l.value)||s.code.match(l.value));if(t.length===0||l.value==="")T.fire({icon:"error",title:"Oops...",text:"沒有該個股資料，請確認是否輸入正確!"});else{const s={code:t[0].code,name:t[0].name,token:_.value,stockCode:t[0].stockCode,uid:Date.parse(new Date),dealPrice:0,updown:0,change:""};m.post(`${f}api/focus/addStock`,s).then(a=>{a.data.success&&(T.fire({title:"加入完成!",icon:"success",showConfirmButton:!1,timer:1500}),h())}).catch(a=>{console.log(a)}),l.value=""}};function g(){m.get(`${f}api/stock/getStocks`).then(t=>{p.value=t.data,b.value=!1}).catch(t=>{console.log(t)})}const D=t=>{_.value=document.cookie.replace(/(?:(?:^|.*;\s*)stockToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),m.defaults.headers.common.Authorization=_.value,T.fire({title:"確定要刪除嗎?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"確定",cancelButtonText:"取消"}).then(s=>{s.isConfirmed&&m.delete(`${f}api/focus/deleteStock?code=${t}`).then(a=>{a.data.success&&(T.fire({title:"已刪除完成!",icon:"success",showConfirmButton:!1,timer:1500}),h())}).catch(a=>{console.log(a)})})};return q(()=>{g(),h(),b.value=!0,i.value=setInterval(()=>{const t=Date.parse(new Date),s=Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()} 09:00:00`),a=Date.parse(`${new Date().getFullYear()}/${new Date().getMonth()+1}/${new Date().getDate()} 13:30:00`);t>=s&&t<=a&&h()},5e3)}),G(()=>{clearInterval(i.value)}),{search:l,stocks:w,inputValue:S,addStock:x,list:o,focusStock:E,getFocusStock:h,getStocks:g,deleteStock:D,index:k,isLoading:b,updateStockPrice,showList:v}}},Z={class:"container"},ee={class:"row"},te={class:"position-relative text-center p-2"},oe={class:"list-unstyled searchList position-absolute"},ne=["onClick","onKeypress"],ae={class:"d-md-inline-block d-lg-flex justify-content-around mt-3"},se={key:0},ce=e("i",{class:"bi bi-arrow-up"},null,-1),le=[ce],ie={key:1},de=e("i",{class:"bi bi-arrow-down"},null,-1),re=[de],ue={key:0},_e=e("i",{class:"bi bi-arrow-up"},null,-1),he=[_e],fe={key:1},me=e("i",{class:"bi bi-arrow-down"},null,-1),ve=[me],pe={class:"table-responsive"},ke={class:"table mt-4"},we=e("thead",null,[e("tr",null,[e("td",null,"名稱"),e("td",null,"現價"),e("td",null,"漲跌"),e("td",null,"幅度"),e("td",{width:"150"})])],-1),ge=e("td",null,null,-1),be=["onClick"];function Se(b,i,l,o,E,_){var f,k,v,w,S,h,x,g,D,t,s,a,A,C,B,L,R,U,F,P;const p=J("loading");return r(),u(V,null,[H(p,{active:o.isLoading,"onUpdate:active":i[0]||(i[0]=n=>o.isLoading=n),"can-cancel":!0},null,8,["active"]),e("main",null,[e("div",Z,[e("div",ee,[e("div",te,[I(e("input",{type:"search",id:"stock_code","onUpdate:modelValue":i[1]||(i[1]=n=>o.search=n),"aria-label":"Search",placeholder:"請輸入股票代號或是股票名稱",class:"input_stock p-2"},null,512),[[Q,o.search]]),e("button",{type:"button",class:"ms-2 btn btn-outline-success",onClick:i[2]||(i[2]=(...n)=>o.addStock&&o.addStock(...n))},"加入"),e("ul",oe,[(r(!0),u(V,null,z(o.stocks,n=>I((r(),u("li",{key:n.code,onClick:M=>o.inputValue(n),onKeypress:W(M=>o.inputValue(n),["enter"]),role:"button",tabIndex:0,class:"p-1"},c(n.code+" "+n.name),41,ne)),[[O,o.showList]])),128))])])]),e("div",ae,[e("div",{class:"mb-2 mb-lg-0",style:N({color:((k=(f=o.index)==null?void 0:f.tse)==null?void 0:k.updown)*1>0?"red":"green"})},[y(" 加權指數："+c((w=(v=o.index)==null?void 0:v.tse)==null?void 0:w.deal)+" ",1),((h=(S=o.index)==null?void 0:S.tse)==null?void 0:h.updown)*1>0?(r(),u("span",se,le)):(r(),u("span",ie,re)),y(" "+c((g=(x=o.index)==null?void 0:x.tse)==null?void 0:g.updown)+" ("+c((t=(D=o.index)==null?void 0:D.tse)==null?void 0:t.change)+") ",1)],4),e("div",{style:N({color:((a=(s=o.index)==null?void 0:s.otc)==null?void 0:a.updown)*1>0?"red":"green"})},[y(" 櫃買指數："+c((C=(A=o.index)==null?void 0:A.otc)==null?void 0:C.deal)+" ",1),((L=(B=o.index)==null?void 0:B.otc)==null?void 0:L.updown)*1>0?(r(),u("span",ue,he)):(r(),u("span",fe,ve)),y(" "+c((U=(R=o.index)==null?void 0:R.otc)==null?void 0:U.updown)+" ("+c((P=(F=o.index)==null?void 0:F.otc)==null?void 0:P.change)+") ",1)],4)]),e("div",pe,[I(e("table",ke,[we,e("tbody",null,[(r(!0),u(V,null,z(o.focusStock,n=>(r(),u("tr",{key:n.code},[e("td",null,c(n.name),1),e("td",null,c(n.dealPrice),1),e("td",null,c(n.updown),1),e("td",null,c(n.change),1),ge,e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger",onClick:M=>o.deleteStock(n==null?void 0:n.code)}," 刪除 ",8,be)])]))),128))])],512),[[O,o.focusStock.length]])])])])],64)}const De=K(X,[["render",Se]]);export{De as default};