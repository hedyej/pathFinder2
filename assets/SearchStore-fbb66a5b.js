import{_ as K,r as h,i as L,l as U,a as t,o as r,c as i,b as e,w as o,W as j,e as z,f as w,k as b,m as S,F as E,j as M,h as n,t as f,p as R,g as T}from"./index-8540fcb9.js";import{a as C}from"./store-603fa413.js";const V=p=>(R("data-v-2d4e0da3"),p=p(),T(),p),A=V(()=>n("h1",{class:"mb-3"},"搜尋",-1)),G={key:0},H={class:"d-flex align-center"},J={class:"rounded block me-3"},O={class:"mb-1"},P={class:"text-grey mb-1"},Q={class:"text-grey mb-1"},X={key:1},Y={key:0,class:"text-center"},Z={class:"text-center text-grey py-3"},ee=V(()=>n("h5",null,"查無相關結果",-1)),te={__name:"SearchStore",setup(p){const s=h(""),d=h(!1),_=h([]),u=h(0),m=async(l,c)=>{const g=await C({q:l});u.value=g.data;const v=await C({q:l,_page:c});_.value=v.data,d.value=!0},N=l=>{d.value===!0&&m(s.value,l)};L(async()=>{const l=U();l.query.keyword?(s.value=l.query.keyword,m(s.value,1),d.value=!0):_.value=[]});const q=()=>{s.value="",d.value=!1,_.value=[],u.value=0};return(l,c)=>{const g=t("el-input"),v=t("el-form-item"),y=t("el-button"),B=t("el-form"),x=t("el-card"),k=t("el-col"),I=t("el-image"),D=t("el-row"),W=t("router-link"),$=t("font-awesome-icon"),F=t("el-pagination");return r(),i("div",null,[e(j,null,{default:o(()=>[e(x,{class:"search-card mb-3"},{default:o(()=>[A,e(B,{inline:!0,size:"large",style:{"margin-bottom":"-24px"}},{default:o(()=>[e(v,{style:{width:"100%","max-width":"400px"}},{default:o(()=>[e(g,{modelValue:s.value,"onUpdate:modelValue":c[0]||(c[0]=a=>s.value=a),type:"round",placeholder:"搜尋換宿店家",onKeyup:c[1]||(c[1]=z(a=>m(s.value),["enter"]))},null,8,["modelValue"])]),_:1}),e(v,null,{default:o(()=>[e(y,{type:"primary",onClick:c[2]||(c[2]=a=>m(s.value)),tabindex:"0"},{default:o(()=>[w("搜尋")]),_:1}),d.value?(r(),b(y,{key:0,type:"secondary",onClick:q},{default:o(()=>[w("重置")]),_:1})):S("",!0)]),_:1})]),_:1})]),_:1}),_.value.length>0?(r(),i("div",G,[(r(!0),i(E,null,M(_.value,a=>(r(),b(W,{to:`/storeDetail/${a.id}`,key:a.id,class:"router-link"},{default:o(()=>[e(x,{class:"mb-3"},{default:o(()=>[e(D,{gutter:"16",class:"align-center"},{default:o(()=>[e(k,{xs:0,md:1}),e(k,{xs:24,md:18},{default:o(()=>[n("div",H,[n("div",J,[e(I,{style:{width:"100px",height:"100px"},src:a.imgUrl,fit:"cover",class:"rounded"},null,8,["src"])]),n("div",null,[n("h4",O,f(a.name),1),n("p",P,f(a.address),1),n("p",Q,f(a.tel),1)])])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["to"]))),128))])):(r(),i("div",X,[d.value?(r(),i("div",Y,[n("div",Z,[e($,{icon:["fas","face-sad-tear"],style:{width:"80",height:"80"},class:"mb-1"}),ee])])):S("",!0)])),e(F,{background:"",layout:"prev, pager, next",total:u.value.length,onCurrentChange:N,"hide-on-single-page":u.value.length===10||u.value.length<10},null,8,["total","hide-on-single-page"])]),_:1})])}}},ne=K(te,[["__scopeId","data-v-2d4e0da3"]]);export{ne as default};
