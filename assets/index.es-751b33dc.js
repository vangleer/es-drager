import{d as ce,r as H,g as G,eQ as U,o as D,b as re,w as ie,eR as _,c as O,a as Le,n as se,eJ as Xe,eK as Ye,F as Ae,eS as de,u as C,eT as Ce,eM as Ne,eI as xe,eD as He,eG as Pe,h as $}from"./index-efd6d050.js";const De={tag:{type:[String,Object],default:"div"},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!1},boundary:{type:Boolean},disabled:Boolean,width:{type:Number,default:0},height:{type:Number,default:0},left:{type:Number,default:0},top:{type:Number,default:0},zIndex:{type:Number,default:0},angle:{type:Number,default:0},color:{type:String,default:"#3a7afe"},minWidth:{type:Number,default:-1/0},minHeight:{type:Number,default:-1/0},maxWidth:{type:Number,default:0},maxHeight:{type:Number,default:0},aspectRatio:{type:Number},selected:Boolean,snapToGrid:Boolean,gridX:{type:Number,default:50},gridY:{type:Number,default:50},scaleRatio:{type:Number,default:1},disabledKeyEvent:Boolean,border:{type:Boolean,default:!0},resizeList:{type:Array},equalProportion:{type:Boolean},checkCollision:{type:Boolean}};function J(o,a){const e=t=>{a&&a(t),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e),document.removeEventListener("mouseleave",e),document.removeEventListener("touchmove",o),document.removeEventListener("touchend",e)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",e),document.addEventListener("mouseleave",e),document.addEventListener("touchmove",o),document.addEventListener("touchend",e)}function T(o){let a=0,e=0;if(Te(o)){const t=o.targetTouches[0];a=t.pageX,e=t.pageY}else a=o.clientX,e=o.clientY;return{clientX:a,clientY:e}}function Te(o){const a=Object.prototype.toString.call(o);return a.substring(8,a.length-1)==="TouchEvent"}const S=(o=0)=>parseInt(o+"")+"px",K={n:"top",s:"bottom",e:"right",w:"left",ne:"top-right",nw:"top-left",se:"bottom-right",sw:"bottom-left"},F=["n","ne","e","se","s","sw","w","nw"],We={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},Ve={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},Ie=(o,a)=>{const e=Ve[Math.floor(o/30)],t=(We[a]+e)%8;return F[t]},ue=(o=0,a)=>{let e=[];for(let t=0;t<F.length;t++){const n=F[t],[u,s]=K[n].split("-"),h=Ie(o,n),d={[u]:"0%",cursor:h+"-resize",side:K[n]};if(s)d[s]="0%";else{const m=["top","bottom"].includes(u)?"left":"top";d[m]="50%"}a?a.includes(K[n])&&e.push(d):e.push(d)}return e},Q=o=>o*Math.PI/180,Se=(o,a)=>Math.sqrt(o*o+a*a),b=o=>Math.cos(Q(o)),y=o=>Math.sin(Q(o)),Ge=(o,a,e,t,n,u,s)=>{let{width:h,height:d,centerX:m,centerY:w,rotateAngle:i}=a;const B=h<0?-1:1,g=d<0?-1:1;switch(h=Math.abs(h),d=Math.abs(d),o){case"right":{const l=x(h,e,u);h=l.width,e=l.deltaW,n?(t=e/n,d=h/n,m+=e/2*b(i)-t/2*y(i),w+=e/2*y(i)+t/2*b(i)):(m+=e/2*b(i),w+=e/2*y(i));break}case"top-right":{t=-t;const l=x(h,e,u);h=l.width,e=l.deltaW;const c=N(d,t,s);d=c.height,t=c.deltaH,n&&(e=t*n,h=d*n),m+=e/2*b(i)+t/2*y(i),w+=e/2*y(i)-t/2*b(i);break}case"bottom-right":{const l=x(h,e,u);h=l.width,e=l.deltaW;const c=N(d,t,s);d=c.height,t=c.deltaH,n&&(e=t*n,h=d*n),m+=e/2*b(i)-t/2*y(i),w+=e/2*y(i)+t/2*b(i);break}case"bottom":{const l=N(d,t,s);d=l.height,t=l.deltaH,n?(e=t*n,h=d*n,m+=e/2*b(i)-t/2*y(i),w+=e/2*y(i)+t/2*b(i)):(m-=t/2*y(i),w+=t/2*b(i));break}case"bottom-left":{e=-e;const l=x(h,e,u);h=l.width,e=l.deltaW;const c=N(d,t,s);d=c.height,t=c.deltaH,n&&(d=h/n,t=e/n),m-=e/2*b(i)+t/2*y(i),w-=e/2*y(i)-t/2*b(i);break}case"left":{e=-e;const l=x(h,e,u);h=l.width,e=l.deltaW,n?(d=h/n,t=e/n,m-=e/2*b(i)+t/2*y(i),w-=e/2*y(i)-t/2*b(i)):(m-=e/2*b(i),w-=e/2*y(i));break}case"top-left":{e=-e,t=-t;const l=x(h,e,u);h=l.width,e=l.deltaW;const c=N(d,t,s);d=c.height,t=c.deltaH,n&&(h=d*n,e=t*n),m-=e/2*b(i)-t/2*y(i),w-=e/2*y(i)+t/2*b(i);break}case"top":{t=-t;const l=N(d,t,s);d=l.height,t=l.deltaH,n?(h=d*n,e=t*n,m+=e/2*b(i)+t/2*y(i),w+=e/2*y(i)-t/2*b(i)):(m+=t/2*y(i),w-=t/2*b(i));break}}return{position:{centerX:m,centerY:w},size:{width:h*B,height:d*g}}},N=(o,a,e)=>{const t=o+a;return t>e?o=t:(a=e-o,o=e),{height:o,deltaH:a}},x=(o,a,e)=>{const t=o+a;return t>e?o=t:(a=e-o,o=e),{width:o,deltaW:a}},_e=({centerX:o,centerY:a,width:e,height:t,angle:n})=>({top:a-t/2,left:o-e/2,width:e,height:t,angle:n}),$e=(o,a,e)=>{const{width:t,height:n}=o;return{width:Math.abs(t),height:Math.abs(n),left:a-Math.abs(t)/2,top:e-Math.abs(n)/2}};function j(o,a){const e=Math.abs(o)%a,t=o>0?a:-a;let n=0;return e>a/2?n=t*Math.ceil(Math.abs(o)/a):n=t*Math.floor(Math.abs(o)/a),n}function je(o,a){if(!o||!a)return!1;const e=o.getBoundingClientRect(),t=a.getBoundingClientRect();return e.left<t.left+t.width&&e.left+e.width>t.left&&e.top<t.top+t.height&&e.top+e.height>t.top}function qe(o,a,e){const t=H(!1),n=H(!1),u=H({width:a.width,height:a.height,left:a.left,top:a.top,angle:a.angle}),s=new Set;function h(g){if(s.add(g.button),a.disabled)return;t.value=!0,n.value=!0;let{clientX:l,clientY:c}=T(g);const{left:f,top:M}=u.value;let r=0,p=0,v=0,E=0;a.boundary&&([r,p,v,E]=d()),e&&e("drag-start",u.value),J(k=>{if(s.size>1)return;const{clientX:z,clientY:L}=T(k);let R=(z-l)/a.scaleRatio+f,X=(L-c)/a.scaleRatio+M;if(a.snapToGrid){let{left:P,top:W}=u.value;const q=R-P,Y=X-W;R=P+j(q,a.gridX),X=W+j(Y,a.gridY)}a.boundary&&([R,X]=m(R,X,r,p,v,E)),u.value.left=R,u.value.top=X,e&&e("drag",u.value)},k=>{a.checkCollision&&w()&&(u.value.top=M,u.value.left=f),s.clear(),t.value=!1,document.addEventListener("click",i,{once:!0}),e&&e("drag-end",u.value)})}const d=()=>{let g=0,l=0;const{left:c,top:f,height:M,width:r,angle:p}=u.value,v=(o.value.parentElement||document.body).getBoundingClientRect();if(p&&a.scaleRatio===1){const z=o.value.getBoundingClientRect();g=Math.abs(z.left-(c+v.left)),l=Math.abs(z.top-(f+v.top))}const E=v.width/a.scaleRatio-r,k=v.height/a.scaleRatio-M;return[g,E-g,l,k-l,v.width,v.height]},m=(g,l,c,f,M,r)=>(g=g<c?c:g,g=g>f?f:g,l=l<M?M:l,l=l>r?r:l,[g,l]),w=()=>{const g=o.value.parentElement||document.body,l=Array.from(g.children).filter(c=>c!==o.value&&c.classList.contains("es-drager"));for(let c=0;c<l.length;c++){const f=l[c];if(je(o.value,f))return!0}},i=()=>{n.value=!1},B=g=>{if(t.value)return;let{left:l,top:c}=u.value;if(["ArrowRight","ArrowLeft"].includes(g.key)){const f=g.key==="ArrowRight";let M=f?1:-1;a.snapToGrid&&(M=f?a.gridX:-a.gridX),l=l+M}else if(["ArrowUp","ArrowDown"].includes(g.key)){const f=g.key==="ArrowDown";let M=f?1:-1;a.snapToGrid&&(M=f?a.gridY:-a.gridY),c=c+M}if(a.boundary){const[f,M,r,p]=d();[l,c]=m(l,c,f,M,r,p)}u.value.left=l,u.value.top=c};return He(()=>{if(o.value){if(!u.value.width&&!u.value.height){const{width:g,height:l}=o.value.getBoundingClientRect();u.value={...u.value,width:g||100,height:l||100},e("change",{...u.value})}o.value.addEventListener("mousedown",h),o.value.addEventListener("touchstart",h,{passive:!0})}}),U(n,g=>{a.disabledKeyEvent||(g?document.addEventListener("keydown",B):document.removeEventListener("keydown",B))}),Pe(()=>{document.removeEventListener("keydown",B)}),{isMousedown:t,selected:n,dragData:u,getBoundary:d,checkDragerCollision:w}}const Ke=$("div",{class:"es-drager-rotate-handle"},[$("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},[$("path",{fill:"currentColor",d:"M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"})])],-1),Ue=ce({__name:"rotate",props:{modelValue:{type:Number,default:0},element:{type:Object}},emits:["update:modelValue","rotate","rotate-start","rotate-end"],setup(o,{emit:a}){const e=o,t=H(null),n=G({get:()=>e.modelValue,set:s=>{a("update:modelValue",s)}});function u(s){if(!e.element)return console.warn("[es-drager] rotate component need drag element property");s.stopPropagation();const{width:h,height:d,left:m,top:w}=e.element.getBoundingClientRect(),i=m+h/2,B=w+d/2;a("rotate-start",n.value),J(g=>{const{clientX:l,clientY:c}=T(g),f=i-l,M=B-c,r=Math.atan2(M,f)*180/Math.PI-90;n.value=(r+360)%360,a("rotate",n.value)},()=>{a("rotate-end",n.value)})}return(s,h)=>(D(),O("div",{ref_key:"rotateRef",ref:t,class:"es-drager-rotate",onMousedown:u,onTouchstartPassive:u},[_(s.$slots,"default",{},()=>[Ke])],544))}}),Oe=["data-side","onMousedown","onTouchstartPassive"],Fe=$("div",{class:"es-drager-dot-handle"},null,-1),he=ce({__name:"drager",props:De,emits:["change","drag","drag-start","drag-end","resize","resize-start","resize-end","rotate","rotate-start","rotate-end"],setup(o,{emit:a}){const e=o,t=(r,...p)=>{a(r,...p),a("change",...p)},n=H(null),{selected:u,dragData:s,isMousedown:h,getBoundary:d,checkDragerCollision:m}=qe(n,e,t),w=H(ue(0,e.resizeList)),i=G(()=>e.resizable&&!e.disabled),B=G(()=>e.rotatable&&!e.disabled&&u.value),g=G(()=>{const{width:r,height:p,left:v,top:E,angle:k}=s.value,z={};return r&&(z.width=S(r)),p&&(z.height=S(p)),{...z,left:S(v),top:S(E),zIndex:e.zIndex,transform:`rotate(${k}deg)`,"--es-drager-color":e.color}});function l(r){n.value||(n.value=r.$el||r)}function c(r){w.value=ue(r,e.resizeList),t("rotate-end",s.value)}function f(r,p){p.stopPropagation();const{clientX:v,clientY:E}=T(p),k=v,z=E,{width:L,height:R,left:X,top:P}=s.value,W=X+L/2,q=P+R/2,Y={width:L,height:R,centerX:W,centerY:q,rotateAngle:s.value.angle},ge=r.side,{minWidth:pe,minHeight:ve,aspectRatio:Z,equalProportion:me}=e;t("resize-start",s.value);let ee=[];e.boundary&&(ee=d()),J(te=>{const{clientX:fe,clientY:we}=T(te);let V=(fe-k)/e.scaleRatio,I=(we-z)/e.scaleRatio;e.snapToGrid&&(V=j(V,e.gridX),I=j(I,e.gridY));const be=Math.atan2(I,V),ae=Se(V,I),ye=te.shiftKey,oe=be-Q(Y.rotateAngle),Me=ae*Math.cos(oe),ke=ae*Math.sin(oe),Ee=(me||ye)&&!Z?Y.width/Y.height:Z,{position:{centerX:ne,centerY:le},size:{width:Re,height:ze}}=Ge(ge,{...Y,rotateAngle:Y.rotateAngle},Me,ke,Ee,pe,ve),Be=_e({centerX:ne,centerY:le,width:Re,height:ze,angle:s.value.angle});let A={...s.value,...$e(Be,ne,le)};e.maxWidth>0&&(A.width=Math.min(A.width,e.maxWidth)),e.maxHeight>0&&(A.height=Math.min(A.height,e.maxHeight)),e.boundary&&(A=M(A,ee)),s.value=A,t("resize",s.value)},()=>{e.checkCollision&&m()&&(s.value={...s.value,width:L,height:R,left:X,top:P}),t("resize-end",s.value)})}function M(r,p){const[v,E,k,z,L,R]=p;return r.left<v&&(r.left=v,r.width=s.value.width),r.left+r.width>L&&(r.left=s.value.left,r.width=L-r.left),r.top<k&&(r.top=k,r.height=s.value.height),r.top+r.height>R&&(r.top=s.value.top,r.height=R-r.top),r}return U(()=>[e.width,e.height,e.left,e.top,e.angle],([r,p,v,E,k])=>{s.value={...s.value,width:r,height:p,left:v,top:E,angle:k}}),U(()=>e.selected,r=>{u.value=r},{immediate:!0}),(r,p)=>(D(),re(xe(r.tag),{ref:l,class:Ce(["es-drager",{disabled:r.disabled,dragging:C(h),selected:C(u),border:r.border}]),style:se(g.value),onClick:p[3]||(p[3]=Ne(()=>{},["stop"]))},{default:ie(()=>[_(r.$slots,"default"),i.value?(D(!0),O(Ae,{key:0},Le(w.value,(v,E)=>(D(),O("div",{key:E,class:"es-drager-dot","data-side":v.side,style:se({...v}),onMousedown:k=>f(v,k),onTouchstartPassive:k=>f(v,k)},[_(r.$slots,"resize",Xe(Ye({side:v.side})),()=>[Fe])],44,Oe))),128)):de("",!0),B.value?(D(),re(Ue,{key:1,modelValue:C(s).angle,"onUpdate:modelValue":p[0]||(p[0]=v=>C(s).angle=v),element:n.value,onRotate:p[1]||(p[1]=v=>t("rotate",C(s))),onRotateStart:p[2]||(p[2]=v=>t("rotate-start",C(s))),onRotateEnd:c},{default:ie(()=>[_(r.$slots,"rotate")]),_:3},8,["modelValue","element"])):de("",!0)]),_:3},8,["class","style"]))}}),Je=o=>{o.component("es-drager",he)};he.install=Je;export{he as f};