import{d as O,r as y,eG as V,eH as j,o as r,c as g,i as c,l as d,w as l,e as u,t as f,u as s,f as w,F as z,a as F,b as x,eI as I,m as K,g as C,j as L,eJ as B,n as D,_ as q}from"./index-ebf099c7.js";import{G as H}from"./GridRect-85ee48cd.js";const M={class:"es-container"},P={class:"es-tools"},R={class:"es-editor"},T=O({__name:"markline",setup(U){const a=y({left:null,top:null}),_=y({componentList:[{id:"div1",component:"div",text:"div1",width:100,height:100,left:0,top:0},{id:"div2",component:"div",text:"div2",width:100,height:100,top:100,left:100}]}),p=S(_);function E(){p.record()}function N(t,n){Object.keys(t).forEach(e=>{n[e]=t[e]})}function S(t){const n=[];let e=-1;const o=()=>{console.log("redo",e,n),e<n.length-1&&(e++,t.value.componentList=m(n[e]))},i=()=>{console.log("undo",e,n),e>=0&&(e--,n[e]&&(t.value.componentList=m(n[e])))},v=()=>{n[++e]=m(t.value.componentList)};v();const h=G=>{const{ctrlKey:J,key:k}=G;J&&(k==="z"?i():k==="y"&&o())};return window.addEventListener("keydown",h),V(()=>{window.removeEventListener("keydown",h)}),{redo:o,undo:i,record:v}}function m(t){return JSON.parse(JSON.stringify(t))}function b(t){a.value=t}return(t,n)=>{const e=j("el-button");return r(),g("div",M,[c("div",P,[d(e,{type:"primary",onClick:s(p).undo},{default:l(()=>[u(f(s(w)("examples.undo")),1)]),_:1},8,["onClick"]),d(e,{type:"primary",onClick:s(p).redo},{default:l(()=>[u(f(s(w)("examples.redo")),1)]),_:1},8,["onClick"])]),c("div",R,[(r(!0),g(z,null,F(_.value.componentList,o=>(r(),x(s(C),K(o,{snap:"","snap-threshold":10,markline:"",onChange:i=>N(i,o),onDragEnd:E}),{default:l(()=>[(r(),x(I(o.component),null,{default:l(()=>[u(f(o.text),1)]),_:2},1024))]),_:2},1040,["onChange"]))),256)),d(s(C),{width:100,height:100,left:200,top:200,snap:"",markline:b},{default:l(()=>[u(" custom markline ")]),_:1}),L(c("div",{class:"es-editor-markline-left",style:D({left:a.value.left+"px"})},null,4),[[B,a.value.left]]),L(c("div",{class:"es-editor-markline-top",style:D({top:a.value.top+"px"})},null,4),[[B,a.value.top]]),d(s(H),{class:"grid-rect"})])])}}});const W=q(T,[["__scopeId","data-v-d372880d"]]);export{W as default};
