import{d as M,r as _,f as l,eH as O,o as r,c,h as g,F as x,a as v,k as C,w as u,e as b,t as y,b as k,eI as T,m as w,eM as d,u as i,eP as p,_ as $}from"./index-efd6d050.js";import{G}from"./GridRect-82d37b7e.js";import{f as J}from"./index.es-751b33dc.js";import{u as R,$ as V,a as S}from"./useEditorContainer-ee07513a.js";const j={class:"es-container"},F={class:"es-tools"},H=M({__name:"menu",setup(L){const n=_({container:{gridSize:10,markline:{},snapToGrid:!0,style:{}},elements:[{id:p(),component:"div",width:100,height:100,left:100,top:100,text:"div1",style:{backgroundColor:"#fff2cc",border:"2px solid #d6b656"}},{id:p(),component:"div",width:100,height:100,left:300,top:150,text:"div2",style:{backgroundColor:"#f8cecc",border:"2px solid #b85450"}}]}),m=_(null),{onEditorContextMenu:f,onContextmenu:N}=R(n,m),E=[{label:l("examples.export"),handler:()=>{V({title:l("examples.export"),content:JSON.stringify(n.value),confirm(o){n.value=JSON.parse(o)}})}},{label:l("examples.import"),handler:()=>{S({resultType:"json",onChange(o){n.value=JSON.parse(o)}})}},{label:l("examples.uploadImage"),handler:()=>{S({resultType:"image",onChange(o){const t={id:p(),component:"img",props:{src:o,width:160,onLoad(s){const{naturalHeight:e,naturalWidth:a}=s.target,h=n.value.elements.find(I=>I.id===t.id);h.width=a,h.height=e}}};n.value.elements.push(t)}})}}];function B(o){n.value.elements.forEach(s=>s.selected=!1);const t=o;t.selected=!0}function D(o,t){Object.keys(o).forEach(s=>{t[s]=o[s]})}return(o,t)=>{const s=O("el-button");return r(),c("div",j,[g("div",F,[(r(),c(x,null,v(E,e=>C(s,{type:"primary",onClick:e.handler},{default:u(()=>[b(y(e.label),1)]),_:2},1032,["onClick"])),64))]),g("div",{ref_key:"editorRef",ref:m,class:"es-editor",onContextmenu:t[2]||(t[2]=d((...e)=>i(f)&&i(f)(...e),["prevent"]))},[(r(!0),c(x,null,v(n.value.elements,e=>(r(),k(i(J),w(e,{rotatable:"",onDragStart:a=>B(e),onChange:a=>D(a,e),onContextmenu:d(a=>i(N)(a,e),["stop"]),onClick:t[0]||(t[0]=d(()=>{},["stop"])),onMousedown:t[1]||(t[1]=d(()=>{},["stop"]))}),{default:u(()=>[(r(),k(T(e.component),w(e.props,{style:{...e.style,width:"100%",height:"100%"}}),{default:u(()=>[b(y(e.text),1)]),_:2},1040,["style"]))]),_:2},1040,["onDragStart","onChange","onContextmenu"]))),256)),C(G)],544)])}}});const q=$(H,[["__scopeId","data-v-5deb4f1c"]]);export{q as default};