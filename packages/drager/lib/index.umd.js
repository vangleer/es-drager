(function(M,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],a):(M=typeof globalThis<"u"?globalThis:M||self,a(M.ESDrager={},M.Vue))})(this,function(M,a){"use strict";const H={tag:{type:[String,Object],default:"div"},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!1},boundary:{type:Boolean},disabled:Boolean,width:{type:Number,default:0},height:{type:Number,default:0},left:{type:Number,default:0},top:{type:Number,default:0},zIndex:{type:Number,default:0},angle:{type:Number,default:0},color:{type:String,default:"#3a7afe"},minWidth:{type:Number,default:-1/0},minHeight:{type:Number,default:-1/0},aspectRatio:{type:Number},selected:Boolean,snapToGrid:Boolean,gridX:{type:Number,default:50},gridY:{type:Number,default:50},scaleRatio:{type:Number,default:1},disabledKeyEvent:Boolean,border:{type:Boolean,default:!0},resizeList:{type:Array}};function C(r,n){const e=t=>{n&&n(t),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",e),document.removeEventListener("mouseleave",e),document.removeEventListener("touchmove",r),document.removeEventListener("touchend",e)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",e),document.addEventListener("mouseleave",e),document.addEventListener("touchmove",r),document.addEventListener("touchend",e)}function Y(r){let n=0,e=0;if(W(r)){const t=r.targetTouches[0];n=t.pageX,e=t.pageY}else n=r.clientX,e=r.clientY;return{clientX:n,clientY:e}}function W(r){const n=Object.prototype.toString.call(r);return n.substring(8,n.length-1)==="TouchEvent"}const z=(r=0)=>parseInt(r+"")+"px",x={n:"top",s:"bottom",e:"right",w:"left",ne:"top-right",nw:"top-left",se:"bottom-right",sw:"bottom-left"},$=["n","ne","e","se","s","sw","w","nw"],ee={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},te={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},ne=(r,n)=>{const e=te[Math.floor(r/30)],c=(ee[n]+e)%8;return $[c]},K=(r=0,n)=>{let e=[];for(let t=0;t<$.length;t++){const c=$[t],[h,d]=x[c].split("-"),f=ne(r,c),u={[h]:"0%",cursor:f+"-resize",side:x[c]};if(d)u[d]="0%";else{const p=["top","bottom"].includes(h)?"left":"top";u[p]="50%"}n?n.includes(x[c])&&e.push(u):e.push(u)}return e},I=r=>r*Math.PI/180,oe=(r,n)=>Math.sqrt(r*r+n*n),w=r=>Math.cos(I(r)),y=r=>Math.sin(I(r)),se=(r,n,e,t,c,h,d)=>{let{width:f,height:u,centerX:p,centerY:m,rotateAngle:o}=n;const g=f<0?-1:1,i=u<0?-1:1;switch(f=Math.abs(f),u=Math.abs(u),r){case"right":{const s=X(f,e,h);f=s.width,e=s.deltaW,c?(t=e/c,u=f/c,p+=e/2*w(o)-t/2*y(o),m+=e/2*y(o)+t/2*w(o)):(p+=e/2*w(o),m+=e/2*y(o));break}case"top-right":{t=-t;const s=X(f,e,h);f=s.width,e=s.deltaW;const l=L(u,t,d);u=l.height,t=l.deltaH,c&&(e=t*c,f=u*c),p+=e/2*w(o)+t/2*y(o),m+=e/2*y(o)-t/2*w(o);break}case"bottom-right":{const s=X(f,e,h);f=s.width,e=s.deltaW;const l=L(u,t,d);u=l.height,t=l.deltaH,c&&(e=t*c,f=u*c),p+=e/2*w(o)-t/2*y(o),m+=e/2*y(o)+t/2*w(o);break}case"bottom":{const s=L(u,t,d);u=s.height,t=s.deltaH,c?(e=t*c,f=u*c,p+=e/2*w(o)-t/2*y(o),m+=e/2*y(o)+t/2*w(o)):(p-=t/2*y(o),m+=t/2*w(o));break}case"bottom-left":{e=-e;const s=X(f,e,h);f=s.width,e=s.deltaW;const l=L(u,t,d);u=l.height,t=l.deltaH,c&&(u=f/c,t=e/c),p-=e/2*w(o)+t/2*y(o),m-=e/2*y(o)-t/2*w(o);break}case"left":{e=-e;const s=X(f,e,h);f=s.width,e=s.deltaW,c?(u=f/c,t=e/c,p-=e/2*w(o)+t/2*y(o),m-=e/2*y(o)-t/2*w(o)):(p-=e/2*w(o),m-=e/2*y(o));break}case"top-left":{e=-e,t=-t;const s=X(f,e,h);f=s.width,e=s.deltaW;const l=L(u,t,d);u=l.height,t=l.deltaH,c&&(f=u*c,e=t*c),p-=e/2*w(o)-t/2*y(o),m-=e/2*y(o)+t/2*w(o);break}case"top":{t=-t;const s=L(u,t,d);u=s.height,t=s.deltaH,c?(f=u*c,e=t*c,p+=e/2*w(o)+t/2*y(o),m+=e/2*y(o)-t/2*w(o)):(p+=t/2*y(o),m-=t/2*w(o));break}}return{position:{centerX:p,centerY:m},size:{width:f*g,height:u*i}}},L=(r,n,e)=>{const t=r+n;return t>e?r=t:(n=e-r,r=e),{height:r,deltaH:n}},X=(r,n,e)=>{const t=r+n;return t>e?r=t:(n=e-r,r=e),{width:r,deltaW:n}},re=({centerX:r,centerY:n,width:e,height:t,angle:c})=>({top:n-t/2,left:r-e/2,width:e,height:t,angle:c}),ae=(r,n,e)=>{const{width:t,height:c}=r;return{width:Math.abs(t),height:Math.abs(c),left:n-Math.abs(t)/2,top:e-Math.abs(c)/2}};function R(r,n){const e=Math.abs(r)%n,t=r>0?n:-n;let c=0;return e>n/2?c=t*Math.ceil(Math.abs(r)/n):c=t*Math.floor(Math.abs(r)/n),c}function ce(r,n,e){const t=a.ref(!1),c=a.ref(!1),h=a.ref({width:n.width,height:n.height,left:n.left,top:n.top,angle:n.angle});function d(o){if(n.disabled)return;t.value=!0,c.value=!0;let{clientX:g,clientY:i}=Y(o);const{left:s,top:l}=h.value;let b=0,v=0;n.boundary&&([b,v]=f()),e&&e("drag-start",h.value),C(D=>{const{clientX:S,clientY:P}=Y(D);let A=(S-g)/n.scaleRatio+s,B=(P-i)/n.scaleRatio+l;if(n.snapToGrid){let{left:_,top:E}=h.value;const G=A-_,j=B-E;A=_+R(G,n.gridX),B=E+R(j,n.gridY)}n.boundary&&([A,B]=u(A,B,b,v)),h.value.left=A,h.value.top=B,e&&e("drag",h.value)},D=>{t.value=!1,document.addEventListener("click",p,{once:!0}),e&&e("drag-end",h.value)})}const f=()=>{const{width:o,height:g}=h.value,s=(r.value.parentElement||document.body).getBoundingClientRect(),l=s.width/n.scaleRatio-o,b=s.height/n.scaleRatio-g;return[l,b]},u=(o,g,i,s)=>(o=o<0?0:o,o=o>i?i:o,g=g<0?0:g,g=g>s?s:g,[o,g]),p=()=>{c.value=!1},m=o=>{if(t.value)return;let{left:g,top:i}=h.value;if(["ArrowRight","ArrowLeft"].includes(o.key)){const s=o.key==="ArrowRight";let l=s?1:-1;n.snapToGrid&&(l=s?n.gridX:-n.gridX),g=g+l}else if(["ArrowUp","ArrowDown"].includes(o.key)){const s=o.key==="ArrowDown";let l=s?1:-1;n.snapToGrid&&(l=s?n.gridY:-n.gridY),i=i+l}if(n.boundary){const[s,l]=f();[g,i]=u(g,i,s,l)}h.value.left=g,h.value.top=i};return a.onMounted(()=>{if(!r.value)return;const{width:o,height:g}=r.value.getBoundingClientRect();console.log(o,g,"width, height"),h.value={...h.value,width:o||100,height:g||100},r.value.addEventListener("mousedown",d),r.value.addEventListener("touchstart",d)}),a.watch(c,o=>{n.disabledKeyEvent||(o?document.addEventListener("keydown",m):document.removeEventListener("keydown",m))}),a.onBeforeUnmount(()=>{document.removeEventListener("keydown",m)}),{isMousedown:t,selected:c,dragData:h}}const ie=a.createElementVNode("div",{class:"es-drager-rotate-handle"},[a.createElementVNode("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},[a.createElementVNode("path",{fill:"currentColor",d:"M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"})])],-1),le=a.defineComponent({__name:"rotate",props:{modelValue:{type:Number,default:0},element:{type:Object,required:!0}},emits:["update:modelValue","rotate","rotate-start","rotate-end"],setup(r,{emit:n}){const e=r,t=a.ref(null),c=a.computed({get:()=>e.modelValue,set:d=>{n("update:modelValue",d)}});function h(d){if(!e.element)return console.warn("[es-drager] rotate component need drag element property");d.stopPropagation(),d.preventDefault();const{width:f,height:u,left:p,top:m}=e.element.getBoundingClientRect(),o=p+f/2,g=m+u/2;n("rotate-start",c.value),C(i=>{const{clientX:s,clientY:l}=Y(i),b=o-s,v=g-l,D=Math.atan2(v,b)*180/Math.PI-90;c.value=(D+360)%360,n("rotate",c.value)},()=>{n("rotate-end",c.value)})}return(d,f)=>(a.openBlock(),a.createElementBlock("div",{ref_key:"rotateRef",ref:t,class:"es-drager-rotate",onMousedown:h,onTouchstart:h},[a.renderSlot(d.$slots,"default",{},()=>[ie])],544))}}),ke="",de=["data-side","onMousedown","onTouchstart"],ue=a.createElementVNode("div",{class:"es-drager-dot-handle"},null,-1),N=a.defineComponent({__name:"drager",props:H,emits:["change","drag","drag-start","drag-end","resize","resize-start","resize-end","rotate","rotate-start","rotate-end"],setup(r,{emit:n}){const e=r,t=(i,...s)=>{n(i,...s),n("change",...s)},c=a.ref(null),{selected:h,dragData:d,isMousedown:f}=ce(c,e,t),u=a.ref(K(0,e.resizeList)),p=a.computed(()=>{const{width:i,height:s,left:l,top:b,angle:v}=d.value,k={};return i&&(k.width=z(i)),s&&(k.height=z(s)),{...k,left:z(l),top:z(b),zIndex:e.zIndex,transform:`rotate(${v}deg)`,"--es-drager-color":e.color}});function m(i){c.value||(c.value=i.$el||i)}function o(i){u.value=K(i,e.resizeList),t("rotate-end",d.value)}function g(i,s){s.stopPropagation(),s.preventDefault();const{clientX:l,clientY:b}=Y(s),v=l,k=b,{width:D,height:S,left:P,top:A}=d.value,B=P+D/2,_=A+S/2,E={width:D,height:S,centerX:B,centerY:_,rotateAngle:d.value.angle},G=i.side,{minWidth:j,minHeight:fe,aspectRatio:F}=e;t("resize-start",d.value),C(U=>{const{clientX:he,clientY:ge}=Y(U);let T=(he-v)/e.scaleRatio,V=(ge-k)/e.scaleRatio;e.snapToGrid&&(T=R(T,e.gridX),V=R(V,e.gridY));const pe=Math.atan2(V,T),q=oe(T,V),me=U.shiftKey,J=pe-I(E.rotateAngle),we=q*Math.cos(J),ye=q*Math.sin(J),be=me&&!F?E.width/E.height:F,{position:{centerX:Q,centerY:Z},size:{width:ve,height:Me}}=se(G,{...E,rotateAngle:E.rotateAngle},we,ye,be,j,fe),Ee=re({centerX:Q,centerY:Z,width:ve,height:Me,angle:d.value.angle});d.value={...d.value,...ae(Ee,Q,Z)},t("resize",d.value)},()=>{t("resize-end",d.value)})}return a.watch(()=>[e.width,e.height,e.left,e.top,e.angle],([i,s,l,b,v])=>{d.value={...d.value,width:i,height:s,left:l,top:b,angle:v}}),a.watch(()=>e.selected,i=>{h.value=i},{immediate:!0}),(i,s)=>(a.openBlock(),a.createBlock(a.resolveDynamicComponent(i.tag),{ref:m,class:a.normalizeClass(["es-drager",{disabled:i.disabled,dragging:a.unref(f),selected:a.unref(h),border:i.border}]),style:a.normalizeStyle(a.unref(p)),onClick:s[3]||(s[3]=a.withModifiers(()=>{},["stop"]))},{default:a.withCtx(()=>[a.renderSlot(i.$slots,"default"),!i.disabled&&i.resizable?(a.openBlock(!0),a.createElementBlock(a.Fragment,{key:0},a.renderList(u.value,(l,b)=>(a.openBlock(),a.createElementBlock("div",{key:b,class:"es-drager-dot","data-side":l.side,style:a.normalizeStyle({...l}),onMousedown:a.withModifiers(v=>g(l,v),["stop","prevent"]),onTouchstart:v=>g(l,v)},[a.renderSlot(i.$slots,"resize",a.normalizeProps(a.guardReactiveProps({side:l.side})),()=>[ue])],44,de))),128)):a.createCommentVNode("",!0),!i.disabled&&a.unref(h)?(a.openBlock(),a.createBlock(le,{key:1,modelValue:a.unref(d).angle,"onUpdate:modelValue":s[0]||(s[0]=l=>a.unref(d).angle=l),"drag-data":a.unref(d),element:c.value,onRotate:s[1]||(s[1]=l=>t("rotate",a.unref(d))),onRotateStart:s[2]||(s[2]=l=>t("rotate-start",a.unref(d))),onRotateEnd:o},{default:a.withCtx(()=>[a.renderSlot(i.$slots,"rotate")]),_:3},8,["modelValue","drag-data","element"])):a.createCommentVNode("",!0)]),_:3},8,["class","style"]))}}),De="",O=r=>{r.component("es-drager",N)};N.install=O,M.ESDrager=N,M.default=N,M.install=O,Object.defineProperties(M,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
