import{d as D,r as x,eC as N,eJ as V,eA as P,eD as W,g as Q,eP as F,o as _,c as b,F as G,a as J,t as H,eO as Z,eM as j,eN as Y,_ as I,i as h,eQ as K,b as O,w as E,eH as ee,m as B,e as q,u as k,eF as te,eG as ne,eR as oe,eS as T,eT as se,eU as le,eV as re,f as z,eW as ae}from"./index-c7156e89.js";import{i as ue}from"./index.es-02b4857d.js";import{M as ie,c as ce,e as w,d as de}from"./common-e4951e25.js";import{G as pe}from"./GridRect-212b5856.js";const fe={key:0},me=["onClick"],ve=D({__name:"Dropdown",props:{option:{type:Object,default:()=>({})}},setup(c,{expose:t}){const n=c,i=x(),e=N({option:n.option,visible:!1,top:0,left:0}),r=V(()=>({left:e.left+"px",top:e.top+"px"})),f=p=>{e.option=p;const{top:v,left:y,height:C}=p.el.getBoundingClientRect();e.top=v+C,e.left=y,e.visible=!0},a=()=>{e.visible=!1},o=p=>{n.option.onClick&&n.option.onClick(p)};function d(p){i.value.contains(p.target)||(console.log("asdasd"),a())}return P(()=>{document.addEventListener("mousedown",d,!0)}),W(()=>{document.removeEventListener("mousedown",d)}),t({open:f,close:a}),(p,v)=>Q((_(),b("div",{ref_key:"menuRef",ref:i,class:"es-contentmenu",style:j(r.value),onClick:v[0]||(v[0]=Y(()=>{},["stop"]))},[c.option.items?(_(),b("ul",fe,[(_(!0),b(G,null,J(c.option.items,y=>(_(),b("li",{onClick:C=>o(y)},H(y.label),9,me))),256))])):Z("",!0)],4)),[[F,e.visible]])}});const ge=I(ve,[["__scopeId","data-v-434519cb"]]);let $=null;function _e(c){const t=document.createElement("div");if(!$){$=h(ge,{option:c});const i=K($,t);console.log(i,t.firstElementChild,"containercontainer"),document.body.appendChild(t.firstElementChild)}const{open:n}=$.component.exposed;n(c)}const he=D({__name:"Area",emits:["move","up"],setup(c,{expose:t,emit:n}){const i=x(!1),e=x({width:0,height:0,top:0,left:0}),r=V(()=>{const{width:a,height:o,top:d,left:p}=e.value;return{width:a+"px",height:o+"px",top:d+"px",left:p+"px"}});function f(a){i.value=!0;const{pageX:o,pageY:d}=a,p=a.target.getBoundingClientRect();console.log(o,d,p,"elRectelRect");const v=o-p.left,y=d-p.top,C=L=>{const S=L.pageX-o,R=L.pageY-d;let A=v,s=y,u=Math.abs(S),l=Math.abs(R);S<0&&(A=v-u),R<0&&(s=y-l),e.value={width:u,height:l,left:A,top:s},n("move",{...e.value})},M=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",M),i.value=!1,e.value={width:0,height:0,top:0,left:0},n("up",e.value)};document.addEventListener("mousemove",C),document.addEventListener("mouseup",M)}return t({onMouseDown:f,areaData:e}),(a,o)=>Q((_(),b("div",{class:"es-editor-area",style:j(r.value)},null,4)),[[F,i.value]])}});const ye=I(he,[["__scopeId","data-v-5716d9fe"]]),xe=D({__name:"index",props:{modelValue:{type:Object,required:!0,default:()=>({})},commands:{type:Object}},setup(c){const t=c,n=V({get(){return t.modelValue},set(){}}),i=V(()=>t.modelValue.container.gridSize||10),e=V(()=>({"--es-editor-grid-size":i.value+"px",transformOrigin:"left top"})),r=x({startX:0,startY:0,disX:0,disY:0}),f=x(),a=N({left:null,top:null}),o=x({x:[],y:[]});function d(s){n.value.elements[f.value]&&(n.value.elements[f.value].selected=!1);const u=n.value.elements[s];u.selected=!0,r.value.startX=u.left,r.value.startY=u.top,f.value=s,o.value=ce(n.value.elements,f.value),w.emit("dragstart")}function p(){w.emit("dragend"),a.left=null,a.top=null}function v(s){const u=s.left-r.value.startX,l=s.top-r.value.startY;a.top=null,a.left=null;for(let m=0;m<o.value.y.length;m++){const{top:g,showTop:U}=o.value.y[m];if(Math.abs(g-s.top)<5){a.top=U;break}}for(let m=0;m<o.value.x.length;m++){const{left:g,showLeft:U}=o.value.x[m];if(Math.abs(g-s.left)<5){a.left=U;break}}n.value.elements.forEach((m,g)=>{m.selected&&f.value!==g&&(m.left+=u,m.top+=l)}),r.value.startX=s.left,r.value.startY=s.top}function y(s,u){Object.keys(s).forEach(l=>{u[l]=s[l]})}function C(s,u){console.log(u),s.preventDefault(),_e({el:s.target,items:[{label:"置顶"},{label:"置底"}],onClick(l){console.log(l)}})}const M=x();function L(s){let u=!1;n.value.elements.forEach(l=>{l.selected&&(l.selected=!1,u=!0)}),u||M.value.onMouseDown(s)}function S(s){for(let u=0;u<n.value.elements.length;u++){const l=n.value.elements[u],m=s.left<l.left&&s.left+s.width>l.left+l.width,g=s.top<l.top&&s.top+s.height>l.top+l.height;m&&g?l.selected=!0:l.selected=!1}}function R(){document.removeEventListener("click",A),n.value.elements.some(u=>u.selected)&&document.addEventListener("click",A,{once:!0})}function A(){console.log(123465)}return(s,u)=>(_(),b("div",{class:"es-editor",style:j(e.value),onMousedown:L},[(_(!0),b(G,null,J(n.value.elements,(l,m)=>(_(),O(k(ue),B(l,{"grid-x":i.value,"grid-y":i.value,boundary:"",onDragStart:g=>d(m),onDragEnd:p,onDrag:u[0]||(u[0]=g=>v(g)),onChange:g=>y(g,l),onContextmenu:g=>C(g,l),onMousedown:u[1]||(u[1]=Y(()=>{},["stop"])),onClick:u[2]||(u[2]=Y(()=>{},["stop"]))}),{default:E(()=>[(_(),O(ee(l.component),B(l.props,{style:{...l.style,width:"100%",height:"100%"}}),{default:E(()=>[q(H(l.text),1)]),_:2},1040,["style"]))]),_:2},1040,["grid-x","grid-y","onDragStart","onChange","onContextmenu"]))),256)),h(ie,te(ne(a)),null,16),h(pe),h(ye,{ref_key:"areaRef",ref:M,onMove:S,onUp:R},null,512)],36))}});const be=I(xe,[["__scopeId","data-v-be020985"]]);function we(c){const t={current:-1,queue:[],commands:{},commandArray:[],destoryArray:[]},n=e=>{t.commandArray.push(e),t.commands[e.name]=(...r)=>{const{redo:f,undo:a}=e.execute(...r);if(f(),e.pushQueue){let{queue:o}=t;o.length>0&&(o=o.slice(0,t.current+1),t.queue=o),t.queue.push({redo:f,undo:a}),t.current+=1}}};n({name:"redo",keyboard:"ctrl+y",execute(){return{redo(){let e=t.queue[t.current+1];e&&(e.redo&&e.redo(),t.current++)}}}}),n({name:"undo",keyboard:"ctrl+z",execute(){return{redo(){if(t.current===-1)return;let e=t.queue[t.current];e&&(e.undo&&e.undo(),t.current--)}}}}),n({name:"drag",pushQueue:!0,init(){const e=()=>{this.before=de(c.value.elements)},r=()=>t.commands.drag();return w.on("dragstart",e),w.on("dragend",r),()=>{w.off("dragstart",e),w.off("dragend",r)}},execute(){const e=this.before,r=c.value.elements;return{redo(){c.value={...c.value,elements:r}},undo(){c.value={...c.value,elements:e}}}}}),n({name:"updateContainer",pushQueue:!0,execute(e){const r={before:c.value,after:e};return{redo(){c.value=r.after},undo(){c.value=r.before}}}}),t.commandArray.forEach(e=>{e.init&&t.destoryArray.push(e.init())});const i=()=>{const e=r=>{const{ctrlKey:f,key:a}=r,o=[];f&&o.push("ctrl"),o.push(a);const d=o.join("+");t.commandArray.forEach(({name:p,keyboard:v})=>{v&&v===d&&(t.commands[p](),r.preventDefault())})};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}};return P(()=>{t.destoryArray.push(i())}),oe(()=>{t.destoryArray.forEach(e=>e&&e())}),t}const Ce=D({__name:"Dialog",props:{option:{type:Object,default:()=>({})}},setup(c,{expose:t}){const i=N({option:c.option,visible:!1}),e=a=>{i.option=a,i.visible=!0},r=()=>{i.visible=!1},f=()=>{const{confirm:a}=i.option;a&&a(i.option.content)};return t({open:e,close:r}),(a,o)=>(_(),O(k(le),B({modelValue:i.visible,"onUpdate:modelValue":o[1]||(o[1]=d=>i.visible=d)},i.option,{draggable:""}),{footer:E(()=>[h(k(T),{onClick:r},{default:E(()=>[q("取消")]),_:1}),h(k(T),{type:"primary",onClick:f},{default:E(()=>[q("确定")]),_:1})]),default:E(()=>[h(k(se),{modelValue:i.option.content,"onUpdate:modelValue":o[0]||(o[0]=d=>i.option.content=d),type:"textarea",rows:10},null,8,["modelValue"])]),_:1},16,["modelValue"]))}});let X=null;function Ee(c){const t=document.createElement("div");X||(X=h(Ce,{option:c}),K(X,t),document.body.appendChild(t.firstElementChild));const{open:n}=X.component.exposed;n(c)}const ke={class:"es-layout"},De={class:"es-layout-container"},Me={ref:"mainRef",class:"es-layout-main"},Ae=z("div",{class:"es-layout-info"},null,-1),Ve="ES Drager Editor 开发中...",Le=D({__name:"index",setup(c){const t=x({container:{gridSize:10,style:{width:"500px",height:"500px"}},elements:[]}),{commands:n}=we(t),i=[{label:"撤销",handler:n.undo},{label:"重做",handler:n.redo},{label:"导出",handler:()=>{Ee({title:"导出",content:JSON.stringify(t.value),confirm(d){n.updateContainer(JSON.parse(d))}})}},{label:"导入",handler:()=>console.log("导入")}];let e=null;function r(d){w.emit("dragstart"),e=d}function f(){w.emit("dragend")}function a(d){d.dataTransfer.dropEffect="move"}function o(d){if(!e)return;const p=[...t.value.elements,{...e,left:d.offsetX-e.width/2,top:d.offsetY-e.height/2}];t.value.elements=p,e=null}return(d,p)=>(_(),b("div",ke,[h(re,{title:Ve,tools:i}),z("div",De,[h(ae,{onDragstart:r,onDragend:f}),z("div",Me,[h(be,{modelValue:t.value,"onUpdate:modelValue":p[0]||(p[0]=v=>t.value=v),commands:k(n),onDragenter:a,onDrop:o,onDragover:p[1]||(p[1]=Y(()=>{},["prevent"]))},null,8,["modelValue","commands"])],512),Ae])]))}});const Ye=D({__name:"index",setup(c){return(t,n)=>(_(),O(Le))}});export{Ye as default};
