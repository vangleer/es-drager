import{d as le,r as X,f as V,eL as $,o as Y,b as te,w as ae,eM as W,c as K,a as ke,n as oe,eI as Ee,eJ as ze,F as Le,eN as ne,u as B,eO as Be,eP as Re,eH as Ne,eC as Xe,eF as Ye,g as _}from"./index-0e1211f5.js";const Ae={tag:{type:[String,Object],default:"div"},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!1},boundary:{type:Boolean},disabled:Boolean,width:{type:Number,default:0},height:{type:Number,default:0},left:{type:Number,default:0},top:{type:Number,default:0},zIndex:{type:Number,default:0},angle:{type:Number,default:0},color:{type:String,default:"#3a7afe"},minWidth:{type:Number,default:-1/0},minHeight:{type:Number,default:-1/0},aspectRatio:{type:Number},selected:Boolean,snapToGrid:Boolean,gridX:{type:Number,default:50},gridY:{type:Number,default:50},scaleRatio:{type:Number,default:1},disabledKeyEvent:Boolean,border:{type:Boolean,default:!0},resizeList:{type:Array},equalProportion:{type:Boolean}};function O(o,a){const e=t=>{a&&a(t),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e),document.removeEventListener("mouseleave",e),document.removeEventListener("touchmove",o),document.removeEventListener("touchend",e)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",e),document.addEventListener("mouseleave",e),document.addEventListener("touchmove",o),document.addEventListener("touchend",e)}function A(o){let a=0,e=0;if(Pe(o)){const t=o.targetTouches[0];a=t.pageX,e=t.pageY}else a=o.clientX,e=o.clientY;return{clientX:a,clientY:e}}function Pe(o){const a=Object.prototype.toString.call(o);return a.substring(8,a.length-1)==="TouchEvent"}const S=(o=0)=>parseInt(o+"")+"px",G={n:"top",s:"bottom",e:"right",w:"left",ne:"top-right",nw:"top-left",se:"bottom-right",sw:"bottom-left"},F=["n","ne","e","se","s","sw","w","nw"],Ce={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},He={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},Te=(o,a)=>{const e=He[Math.floor(o/30)],t=(Ce[a]+e)%8;return F[t]},re=(o=0,a)=>{let e=[];for(let t=0;t<F.length;t++){const n=F[t],[u,d]=G[n].split("-"),c=Te(o,n),i={[u]:"0%",cursor:c+"-resize",side:G[n]};if(d)i[d]="0%";else{const p=["top","bottom"].includes(u)?"left":"top";i[p]="50%"}a?a.includes(G[n])&&e.push(i):e.push(i)}return e},j=o=>o*Math.PI/180,xe=(o,a)=>Math.sqrt(o*o+a*a),f=o=>Math.cos(j(o)),w=o=>Math.sin(j(o)),Se=(o,a,e,t,n,u,d)=>{let{width:c,height:i,centerX:p,centerY:b,rotateAngle:l}=a;const g=c<0?-1:1,v=i<0?-1:1;switch(c=Math.abs(c),i=Math.abs(i),o){case"right":{const s=N(c,e,u);c=s.width,e=s.deltaW,n?(t=e/n,i=c/n,p+=e/2*f(l)-t/2*w(l),b+=e/2*w(l)+t/2*f(l)):(p+=e/2*f(l),b+=e/2*w(l));break}case"top-right":{t=-t;const s=N(c,e,u);c=s.width,e=s.deltaW;const r=R(i,t,d);i=r.height,t=r.deltaH,n&&(e=t*n,c=i*n),p+=e/2*f(l)+t/2*w(l),b+=e/2*w(l)-t/2*f(l);break}case"bottom-right":{const s=N(c,e,u);c=s.width,e=s.deltaW;const r=R(i,t,d);i=r.height,t=r.deltaH,n&&(e=t*n,c=i*n),p+=e/2*f(l)-t/2*w(l),b+=e/2*w(l)+t/2*f(l);break}case"bottom":{const s=R(i,t,d);i=s.height,t=s.deltaH,n?(e=t*n,c=i*n,p+=e/2*f(l)-t/2*w(l),b+=e/2*w(l)+t/2*f(l)):(p-=t/2*w(l),b+=t/2*f(l));break}case"bottom-left":{e=-e;const s=N(c,e,u);c=s.width,e=s.deltaW;const r=R(i,t,d);i=r.height,t=r.deltaH,n&&(i=c/n,t=e/n),p-=e/2*f(l)+t/2*w(l),b-=e/2*w(l)-t/2*f(l);break}case"left":{e=-e;const s=N(c,e,u);c=s.width,e=s.deltaW,n?(i=c/n,t=e/n,p-=e/2*f(l)+t/2*w(l),b-=e/2*w(l)-t/2*f(l)):(p-=e/2*f(l),b-=e/2*w(l));break}case"top-left":{e=-e,t=-t;const s=N(c,e,u);c=s.width,e=s.deltaW;const r=R(i,t,d);i=r.height,t=r.deltaH,n&&(c=i*n,e=t*n),p-=e/2*f(l)-t/2*w(l),b-=e/2*w(l)+t/2*f(l);break}case"top":{t=-t;const s=R(i,t,d);i=s.height,t=s.deltaH,n?(c=i*n,e=t*n,p+=e/2*f(l)+t/2*w(l),b+=e/2*w(l)-t/2*f(l)):(p+=t/2*w(l),b-=t/2*f(l));break}}return{position:{centerX:p,centerY:b},size:{width:c*g,height:i*v}}},R=(o,a,e)=>{const t=o+a;return t>e?o=t:(a=e-o,o=e),{height:o,deltaH:a}},N=(o,a,e)=>{const t=o+a;return t>e?o=t:(a=e-o,o=e),{width:o,deltaW:a}},Ve=({centerX:o,centerY:a,width:e,height:t,angle:n})=>({top:a-t/2,left:o-e/2,width:e,height:t,angle:n}),We=(o,a,e)=>{const{width:t,height:n}=o;return{width:Math.abs(t),height:Math.abs(n),left:a-Math.abs(t)/2,top:e-Math.abs(n)/2}};function I(o,a){const e=Math.abs(o)%a,t=o>0?a:-a;let n=0;return e>a/2?n=t*Math.ceil(Math.abs(o)/a):n=t*Math.floor(Math.abs(o)/a),n}function _e(o,a,e){const t=X(!1),n=X(!1),u=X({width:a.width,height:a.height,left:a.left,top:a.top,angle:a.angle}),d=new Set;function c(g){if(d.add(g.button),a.disabled)return;t.value=!0,n.value=!0;let{clientX:v,clientY:s}=A(g);const{left:r,top:h}=u.value;let m=0,y=0;a.boundary&&([m,y]=i()),e&&e("drag-start",u.value),O(M=>{if(d.size>1)return;const{clientX:E,clientY:P}=A(M);let k=(E-v)/a.scaleRatio+r,z=(P-s)/a.scaleRatio+h;if(a.snapToGrid){let{left:C,top:H}=u.value;const D=k-C,L=z-H;k=C+I(D,a.gridX),z=H+I(L,a.gridY)}a.boundary&&([k,z]=p(k,z,m,y)),u.value.left=k,u.value.top=z,e&&e("drag",u.value)},M=>{d.clear(),t.value=!1,document.addEventListener("click",b,{once:!0}),e&&e("drag-end",u.value)})}const i=()=>{const{width:g,height:v}=u.value,s=(o.value.parentElement||document.body).getBoundingClientRect(),r=s.width/a.scaleRatio-g,h=s.height/a.scaleRatio-v;return[r,h]},p=(g,v,s,r)=>(g=g<0?0:g,g=g>s?s:g,v=v<0?0:v,v=v>r?r:v,[g,v]),b=()=>{n.value=!1},l=g=>{if(t.value)return;let{left:v,top:s}=u.value;if(["ArrowRight","ArrowLeft"].includes(g.key)){const r=g.key==="ArrowRight";let h=r?1:-1;a.snapToGrid&&(h=r?a.gridX:-a.gridX),v=v+h}else if(["ArrowUp","ArrowDown"].includes(g.key)){const r=g.key==="ArrowDown";let h=r?1:-1;a.snapToGrid&&(h=r?a.gridY:-a.gridY),s=s+h}if(a.boundary){const[r,h]=i();[v,s]=p(v,s,r,h)}u.value.left=v,u.value.top=s};return Xe(()=>{if(o.value){if(!u.value.width&&!u.value.height){const{width:g,height:v}=o.value.getBoundingClientRect();u.value={...u.value,width:g||100,height:v||100},e("change",{...u.value})}o.value.addEventListener("mousedown",c),o.value.addEventListener("touchstart",c,{passive:!0})}}),$(n,g=>{a.disabledKeyEvent||(g?document.addEventListener("keydown",l):document.removeEventListener("keydown",l))}),Ye(()=>{document.removeEventListener("keydown",l)}),{isMousedown:t,selected:n,dragData:u}}const Ie=_("div",{class:"es-drager-rotate-handle"},[_("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},[_("path",{fill:"currentColor",d:"M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"})])],-1),De=le({__name:"rotate",props:{modelValue:{type:Number,default:0},element:{type:Object}},emits:["update:modelValue","rotate","rotate-start","rotate-end"],setup(o,{emit:a}){const e=o,t=X(null),n=V({get:()=>e.modelValue,set:d=>{a("update:modelValue",d)}});function u(d){if(!e.element)return console.warn("[es-drager] rotate component need drag element property");d.stopPropagation();const{width:c,height:i,left:p,top:b}=e.element.getBoundingClientRect(),l=p+c/2,g=b+i/2;a("rotate-start",n.value),O(v=>{const{clientX:s,clientY:r}=A(v),h=l-s,m=g-r,y=Math.atan2(m,h)*180/Math.PI-90;n.value=(y+360)%360,a("rotate",n.value)},()=>{a("rotate-end",n.value)})}return(d,c)=>(Y(),K("div",{ref_key:"rotateRef",ref:t,class:"es-drager-rotate",onMousedown:u,onTouchstartPassive:u},[W(d.$slots,"default",{},()=>[Ie])],544))}}),Ge=["data-side","onMousedown","onTouchstartPassive"],$e=_("div",{class:"es-drager-dot-handle"},null,-1),se=le({__name:"drager",props:Ae,emits:["change","drag","drag-start","drag-end","resize","resize-start","resize-end","rotate","rotate-start","rotate-end"],setup(o,{emit:a}){const e=o,t=(r,...h)=>{a(r,...h),a("change",...h)},n=X(null),{selected:u,dragData:d,isMousedown:c}=_e(n,e,t),i=X(re(0,e.resizeList)),p=V(()=>e.resizable&&!e.disabled),b=V(()=>e.rotatable&&!e.disabled&&u.value),l=V(()=>{const{width:r,height:h,left:m,top:y,angle:M}=d.value,E={};return r&&(E.width=S(r)),h&&(E.height=S(h)),{...E,left:S(m),top:S(y),zIndex:e.zIndex,transform:`rotate(${M}deg)`,"--es-drager-color":e.color}});function g(r){n.value||(n.value=r.$el||r)}function v(r){i.value=re(r,e.resizeList),t("rotate-end",d.value)}function s(r,h){h.stopPropagation();const{clientX:m,clientY:y}=A(h),M=m,E=y,{width:P,height:k,left:z,top:C}=d.value,H=z+P/2,D=C+k/2,L={width:P,height:k,centerX:H,centerY:D,rotateAngle:d.value.angle},ie=r.side,{minWidth:de,minHeight:ue,aspectRatio:q,equalProportion:ce}=e;t("resize-start",d.value),O(U=>{const{clientX:he,clientY:ge}=A(U);let T=(he-M)/e.scaleRatio,x=(ge-E)/e.scaleRatio;e.snapToGrid&&(T=I(T,e.gridX),x=I(x,e.gridY));const ve=Math.atan2(x,T),J=xe(T,x),pe=U.shiftKey,Q=ve-j(L.rotateAngle),me=J*Math.cos(Q),fe=J*Math.sin(Q),we=(ce||pe)&&!q?L.width/L.height:q,{position:{centerX:Z,centerY:ee},size:{width:be,height:ye}}=Se(ie,{...L,rotateAngle:L.rotateAngle},me,fe,we,de,ue),Me=Ve({centerX:Z,centerY:ee,width:be,height:ye,angle:d.value.angle});d.value={...d.value,...We(Me,Z,ee)},t("resize",d.value)},()=>{t("resize-end",d.value)})}return $(()=>[e.width,e.height,e.left,e.top,e.angle],([r,h,m,y,M])=>{d.value={...d.value,width:r,height:h,left:m,top:y,angle:M}}),$(()=>e.selected,r=>{u.value=r},{immediate:!0}),(r,h)=>(Y(),te(Ne(r.tag),{ref:g,class:Be(["es-drager",{disabled:r.disabled,dragging:B(c),selected:B(u),border:r.border}]),style:oe(l.value),onClick:h[3]||(h[3]=Re(()=>{},["stop"]))},{default:ae(()=>[W(r.$slots,"default"),p.value?(Y(!0),K(Le,{key:0},ke(i.value,(m,y)=>(Y(),K("div",{key:y,class:"es-drager-dot","data-side":m.side,style:oe({...m}),onMousedown:M=>s(m,M),onTouchstartPassive:M=>s(m,M)},[W(r.$slots,"resize",Ee(ze({side:m.side})),()=>[$e])],44,Ge))),128)):ne("",!0),b.value?(Y(),te(De,{key:1,modelValue:B(d).angle,"onUpdate:modelValue":h[0]||(h[0]=m=>B(d).angle=m),element:n.value,onRotate:h[1]||(h[1]=m=>t("rotate",B(d))),onRotateStart:h[2]||(h[2]=m=>t("rotate-start",B(d))),onRotateEnd:v},{default:ae(()=>[W(r.$slots,"rotate")]),_:3},8,["modelValue","element"])):ne("",!0)]),_:3},8,["class","style"]))}}),Ke=o=>{o.component("es-drager",se)};se.install=Ke;export{se as i};
