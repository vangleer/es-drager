import{d as B,eZ as z,o as g,b as K,w as y,l as h,e as M,u as C,fc as $,m as P,fd as X,i as U,fe as q,ff as Z,f0 as H,fg as O,r as V,h as A,eE as N,eG as Q,c as x,n as T,j as W,eJ as ee,F as te,a as ne,t as oe,eV as se,eK as F,fh as le,fi as ce,fj as ie,fk as ae,_ as G,e$ as re,eY as E,eL as ue,eM as pe,eN as de}from"./index-ebf099c7.js";const me=U("div",{id:"esEditor"},null,-1),fe=B({__name:"Dialog",props:{option:{type:Object,default:()=>({})}},setup(n,{expose:u}){const o=z({option:n.option,visible:!1});let i;const s=l=>{o.option=l,o.visible=!0,q(()=>{i=Z.edit("esEditor",{maxLines:34,minLines:34,fontSize:14,theme:"ace/theme/one_dark",mode:"ace/mode/json5",tabSize:4,readOnly:!1}),i.setValue(JSON.stringify(JSON.parse(o.option.content),null,4))})},f=()=>{o.visible=!1},v=()=>{const{confirm:l}=o.option;l&&l(i&&i.getValue())},p=()=>{if(!i)return;const l=document.createElement("a"),c=H().format("YYYY-MM-DD")+"-es-drager.json";l.download=c;const d=new Blob([i.getValue()]),e=URL.createObjectURL(d);l.href=e,l.click(),URL.revokeObjectURL(e)};return u({open:s,close:f}),(l,c)=>(g(),K(C(X),P({modelValue:o.visible,"onUpdate:modelValue":c[0]||(c[0]=d=>o.visible=d)},o.option,{draggable:""}),{footer:y(()=>[h(C($),{onClick:f},{default:y(()=>[M("取消")]),_:1}),h(C($),{type:"primary",onClick:v},{default:y(()=>[M("保存编辑")]),_:1}),h(C($),{type:"primary",onClick:p},{default:y(()=>[M("导出JSON")]),_:1})]),default:y(()=>[me]),_:1},16,["modelValue"]))}});let w=null;function Ee(n){if(!w){const{container:a}=Y(),o=document.createElement("div");w=h(fe,{option:n}),O(w,o),a.appendChild(o.firstElementChild)}const{open:u}=w.component.exposed;u(n)}const ve={key:0},be=["onClick"],ge=B({__name:"Menu",props:{option:{type:Object,default:()=>({})}},setup(n,{expose:u}){const a=n,o=V(),i=V(),s=z({option:a.option,visible:!1,top:0,left:0}),f=A(()=>({left:s.left+"px",top:s.top+"px"})),v=A(()=>({left:s.option.clientX+"px",top:s.option.clientY+"px"})),p=[ce(),ie(),ae(10)],l=e=>{s.option=e,s.visible=!0,le(o.value,i.value,{middleware:p}).then(t=>{s.left=t.x,s.top=t.y})},c=()=>{s.visible=!1},d=e=>{s.option.onClick&&s.option.onClick(e),c()};return N(()=>{document.addEventListener("mousedown",c)}),Q(()=>{document.removeEventListener("mousedown",c)}),u({open:l,close:c}),(e,t)=>(g(),x("div",null,[U("div",{ref_key:"triggerRef",ref:o,class:"es-trigger",style:T(v.value)},null,4),W(U("div",{ref_key:"menuRef",ref:i,class:"es-contentmenu",style:T(f.value),onClick:t[0]||(t[0]=F(()=>{},["stop"])),onMousedown:t[1]||(t[1]=F(()=>{},["stop"]))},[s.option.items?(g(),x("ul",ve,[(g(!0),x(te,null,ne(s.option.items,r=>(g(),x("li",{onClick:m=>d(r)},oe(r.label),9,be))),256))])):se("",!0)],36),[[ee,s.visible]])]))}}),he=G(ge,[["__scopeId","data-v-b6d1f345"]]);let L=null;function J(n){if(!L){const{container:a}=Y(),o=document.createElement("div");L=h(he,{option:n}),O(L,o),a.appendChild(o.firstElementChild)}const{open:u}=L.component.exposed;u(n)}const ye=["accept"],xe=B({__name:"Upload",props:{option:{type:Object,required:!0}},setup(n,{expose:u}){const a={json:".json",image:"image/*"},o=n,i={option:o.option},s=V(),f=l=>{i.option=l;let c=a[l.resultType];l.accept&&(c=l.accept),s.value.setAttribute("accept",c),s.value.click()},v=async l=>{if(!i.option||!i.option.onChange)return;const{resultType:c,onChange:d}=i.option;let e=l;const t=l.target.files[0];["json","text"].includes(c)?e=await p(t):c==="image"&&(e=await p(t,c)),d(e),s.value.value=""},p=(l,c="text")=>new Promise(d=>{const e=new FileReader;e.addEventListener("load",t=>{const r=t.target.result||"{}";d(r)}),c==="text"?e.readAsText(l):e.readAsDataURL(l)});return N(()=>{f(o.option)}),u({open:f}),(l,c)=>{var d;return g(),x("input",{ref_key:"inpurRef",ref:s,type:"file",accept:(d=i.option)==null?void 0:d.accept,class:"es-upload",onChange:v},null,40,ye)}}}),ke=G(xe,[["__scopeId","data-v-bff817d0"]]);let R=null;function we(n){if(R){const{open:u}=R.component.exposed;u(n)}else{const{container:u}=Y(),a=document.createElement("div");R=h(ke,{option:n}),O(R,a),u.appendChild(a.firstElementChild)}}const _e={"ctrl+x":"cut","ctrl+c":"copy","ctrl+v":"paste",Delete:"remove","ctrl+a":"selectAll","ctrl+d":"duplicate"};function Le(n,u){const a=A(()=>{var e;return((e=u.value)==null?void 0:e.getBoundingClientRect())||{}});let o=null,i=null;const s=e=>e?n.value.elements.findIndex(t=>t.id===e.id):-1,f=(e,t)=>{[n.value.elements[e],n.value.elements[t]]=[n.value.elements[t],n.value.elements[e]]},v=e=>{if(!e)return;const t=E(e);t.id=de(),n.value.elements.push(t)},p={remove(){const e=s(o);e>-1&&n.value.elements.splice(e,1)},cut(e){i=e,p.remove(e)},copy(e){i=e},duplicate(e){const t=E(e);t.left+=10,t.top+=10,v(t)},top(e){const t=s(e),[r]=n.value.elements.splice(t,1);n.value.elements.push(r)},bottom(e){const t=s(e),[r]=n.value.elements.splice(t,1);n.value.elements.unshift(r)},group(){n.value.elements=ue(n.value.elements,a.value)},ungroup(){n.value.elements=pe(n.value.elements,a.value)},paste(e,t,r){if(!i)return;const m=E(i);m.left=t-a.value.left,m.top=r-a.value.top,v(m)},selectAll(){n.value.elements.forEach(e=>e.selected=!0)},lock(e){const t=s(e);n.value.elements[t].disabled=!n.value.elements[t].disabled},moveUp(e){const t=s(e);t>=n.value.elements.length-1||f(t,t+1)},moveDown(e){const t=s(e);t<=0||f(t,t-1)}},l=(e,t)=>{e.preventDefault();const{clientX:r,clientY:m}=e;o=E(t);const j=n.value.elements.filter(_=>_.selected),b=[{action:"remove",label:"删除"},{action:"cut",label:"剪切"},{action:"copy",label:"复制"},{action:"duplicate",label:"创建副本"},{action:"top",label:"置顶"},{action:"bottom",label:"置底"},{action:"moveUp",label:"上移一层"},{action:"moveDown",label:"下移一层"}];!t.group&&j.length>1?b.push({action:"group",label:"组合"}):t.group&&b.push({action:"ungroup",label:"取消组合"});const k=o.disabled,I={action:"lock",label:"锁定 / 解锁"};k||b.push(I),J({clientX:r,clientY:m,items:k?[I]:b,onClick:({action:_})=>{p[_]&&p[_](o)}})},c=e=>{const{clientX:t,clientY:r}=e;J({clientX:t,clientY:r,items:[{action:"paste",label:"在这粘贴"},{action:"selectAll",label:"全选"}],onClick({action:m}){m==="paste"?p.paste(o,t,r):p[m]&&p[m](o)}})},d=e=>{const{ctrlKey:t,key:r}=e,m=[];t&&m.push("ctrl"),m.push(r);const j=m.join("+"),b=_e[j];p[b]&&(e.preventDefault(),o=n.value.elements.find(k=>k.selected)||null,p[b](o))};return N(()=>{window.addEventListener("keydown",d)}),re(()=>{window.removeEventListener("keydown",d)}),{editorRect:a,onContextmenu:l,onEditorContextMenu:c}}let D;const S="es-editor-container-1996",Y=()=>{if(!D&&!document.querySelector(`#${S}`)){const n=document.createElement("div");n.id=S,D=n,document.body.appendChild(n)}return{container:D,selector:S}};export{Ee as $,we as a,Le as u};