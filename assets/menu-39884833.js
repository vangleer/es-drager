import{d as O,r as g,f as d,eH as T,o as r,c,i as h,F as x,a as v,l as C,w as u,e as b,t as y,b as k,eI as $,m as w,eK as i,u as l,g as G,eN as p,_ as J}from"./index-ebf099c7.js";import{G as M}from"./GridRect-85ee48cd.js";import{u as R,$ as V,a as N}from"./useEditorContainer-af051780.js";const j={class:"es-container"},F={class:"es-tools"},H=O({__name:"menu",setup(L){const n=g({container:{gridSize:10,markline:{},snapToGrid:!0,style:{}},elements:[{id:p(),component:"div",width:100,height:100,left:100,top:100,text:"div1",style:{backgroundColor:"#fff2cc",border:"2px solid #d6b656"}},{id:p(),component:"div",width:100,height:100,left:300,top:150,text:"div2",style:{backgroundColor:"#f8cecc",border:"2px solid #b85450"}}]}),m=g(null),{onEditorContextMenu:f,onContextmenu:S}=R(n,m),E=[{label:d("examples.export"),handler:()=>{V({title:d("examples.export"),content:JSON.stringify(n.value),confirm(o){n.value=JSON.parse(o)}})}},{label:d("examples.import"),handler:()=>{N({resultType:"json",onChange(o){n.value=JSON.parse(o)}})}},{label:d("examples.uploadImage"),handler:()=>{N({resultType:"image",onChange(o){const t={id:p(),component:"img",props:{src:o,width:160,onLoad(s){const{naturalHeight:e,naturalWidth:a}=s.target,_=n.value.elements.find(I=>I.id===t.id);_.width=a,_.height=e}}};n.value.elements.push(t)}})}}];function B(o){n.value.elements.forEach(s=>s.selected=!1);const t=o;t.selected=!0}function D(o,t){Object.keys(o).forEach(s=>{t[s]=o[s]})}return(o,t)=>{const s=T("el-button");return r(),c("div",j,[h("div",F,[(r(),c(x,null,v(E,e=>C(s,{type:"primary",onClick:e.handler},{default:u(()=>[b(y(e.label),1)]),_:2},1032,["onClick"])),64))]),h("div",{ref_key:"editorRef",ref:m,class:"es-editor",onContextmenu:t[2]||(t[2]=i((...e)=>l(f)&&l(f)(...e),["prevent"]))},[(r(!0),c(x,null,v(n.value.elements,e=>(r(),k(l(G),w(e,{rotatable:"",onDragStart:a=>B(e),onChange:a=>D(a,e),onContextmenu:i(a=>l(S)(a,e),["stop"]),onClick:t[0]||(t[0]=i(()=>{},["stop"])),onMousedown:t[1]||(t[1]=i(()=>{},["stop"]))}),{default:u(()=>[(r(),k($(e.component),w(e.props,{style:{...e.style,width:"100%",height:"100%"}}),{default:u(()=>[b(y(e.text),1)]),_:2},1040,["style"]))]),_:2},1040,["onDragStart","onChange","onContextmenu"]))),256)),C(l(M))],544)])}}});const P=J(H,[["__scopeId","data-v-dd1f6cb8"]]);export{P as default};
