import{d as I,r as l,h as N,eH as U,o as p,c as x,i as C,l as d,w as i,e as f,t as v,u as a,f as k,F as V,a as F,b as w,eI as j,m as M,eK as G,g as z,eL as H,eM as K,eN as b,_ as O}from"./index-ebf099c7.js";import{u as P,A as X}from"./useArea-6069353b.js";import{G as Y}from"./GridRect-85ee48cd.js";const $={class:"es-container"},q={class:"es-tools"},J=I({__name:"group",setup(Q){const n=l({container:{gridSize:10,markline:{},snapToGrid:!0,style:{}},elements:[{id:b(),component:"div",text:"div1",width:100,height:100,left:100,top:100,style:{border:"1px solid #3a7afe"}},{id:b(),component:"div",text:"div2",width:100,height:100,top:200,left:300,style:{border:"1px solid #3a7afe"}}]}),m=l(null),_=N(()=>{var t;return((t=m.value)==null?void 0:t.getBoundingClientRect())||{}}),g=l(-1),y=l(),{areaSelected:R,onEditorMouseDown:h,onAreaMove:D,onAreaUp:L}=P(n,y),r=l({prevLeft:0,prevTop:0});function T(t){R.value||n.value.elements.forEach(s=>s.selected=!1);const e=n.value.elements[t];e.selected=!0,r.value.prevLeft=e.left,r.value.prevTop=e.top,g.value=t}function A(t){const e=t.left-r.value.prevLeft,s=t.top-r.value.prevTop;n.value.elements.forEach((o,c)=>{o.selected&&g.value!==c&&(o.left+=e,o.top+=s)}),r.value.prevLeft=t.left,r.value.prevTop=t.top}function B(t,e){Object.keys(t).forEach(s=>{e[s]=t[s]})}function E(){n.value.elements=H(n.value.elements,_.value)}function S(){n.value.elements=K(n.value.elements,_.value)}return(t,e)=>{const s=U("el-button");return p(),x("div",$,[C("div",q,[d(s,{type:"primary",onClick:E},{default:i(()=>[f(v(a(k)("examples.group")),1)]),_:1}),d(s,{type:"primary",onClick:S},{default:i(()=>[f(v(a(k)("examples.unGroup")),1)]),_:1})]),C("div",{ref_key:"editorRef",ref:m,class:"es-editor",onMousedown:e[3]||(e[3]=(...o)=>a(h)&&a(h)(...o))},[(p(!0),x(V,null,F(n.value.elements,(o,c)=>(p(),w(a(z),M(o,{rotatable:"",onDragStart:u=>T(c),onDrag:e[0]||(e[0]=u=>A(u)),onChange:u=>B(u,o),onClick:e[1]||(e[1]=G(()=>{},["stop"])),onMousedown:e[2]||(e[2]=G(()=>{},["stop"]))}),{default:i(()=>[(p(),w(j(o.component),M(o.props,{style:{...o.style,width:"100%",height:"100%"}}),{default:i(()=>[f(v(o.text),1)]),_:2},1040,["style"]))]),_:2},1040,["onDragStart","onChange"]))),256)),d(a(Y)),d(a(X),{ref_key:"areaRef",ref:y,onMove:a(D),onUp:a(L)},null,8,["onMove","onUp"])],544)])}}});const te=O(J,[["__scopeId","data-v-f1ec40d9"]]);export{te as default};
