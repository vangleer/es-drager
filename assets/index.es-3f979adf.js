import{d as te,r as z,f as ae,eE as P,o as N,c as W,eF as _,F as fe,a as pe,n as U,eG as me,eH as ve,eI as J,u as y,b as we,w as be,eJ as ye,eK as Me,eC as ke,eL as Re,g as x}from"./index-63baa5a0.js";const ze={resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!1},boundary:{type:Boolean},disabled:Boolean,width:{type:Number,default:100},height:{type:Number,default:100},left:{type:Number,default:0},top:{type:Number,default:0},angle:{type:Number,default:0},color:{type:String,default:"#3a7afe"},minWidth:{type:Number,default:-1/0},minHeight:{type:Number,default:-1/0},aspectRatio:{type:Number},selected:Boolean,snapToGrid:Boolean,gridX:{type:Number,default:50},gridY:{type:Number,default:50},scaleRatio:{type:Number,default:1},disabledKeyEvent:Boolean},V=(l=0)=>parseInt(l+"")+"px",Z={n:"top",s:"bottom",e:"right",w:"left",ne:"top-right",nw:"top-left",se:"bottom-right",sw:"bottom-left"},G=["n","ne","e","se","s","sw","w","nw"],Ye={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},Be={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},Ee=(l,n)=>{const e=Be[Math.floor(l/30)],t=(Ye[n]+e)%8;return G[t]},Q=(l=0)=>{let n=[];for(let e=0;e<G.length;e++){const t=G[e],[s,f]=Z[t].split("-"),d=Ee(l,t),u={[s]:"0%",cursor:d+"-resize",side:Z[t]};if(f)u[f]="0%";else{const c=["top","bottom"].includes(s)?"left":"top";u[c]="50%"}n[e]=u}return n},T=l=>l*Math.PI/180,Xe=(l,n)=>Math.sqrt(l*l+n*n),m=l=>Math.cos(T(l)),v=l=>Math.sin(T(l)),Ne=(l,n,e,t,s,f,d)=>{let{width:u,height:c,centerX:p,centerY:w,rotateAngle:r}=n;const h=u<0?-1:1,o=c<0?-1:1;switch(u=Math.abs(u),c=Math.abs(c),l){case"right":{const a=B(u,e,f);u=a.width,e=a.deltaW,s?(t=e/s,c=u/s,p+=e/2*m(r)-t/2*v(r),w+=e/2*v(r)+t/2*m(r)):(p+=e/2*m(r),w+=e/2*v(r));break}case"top-right":{t=-t;const a=B(u,e,f);u=a.width,e=a.deltaW;const i=Y(c,t,d);c=i.height,t=i.deltaH,s&&(e=t*s,u=c*s),p+=e/2*m(r)+t/2*v(r),w+=e/2*v(r)-t/2*m(r);break}case"bottom-right":{const a=B(u,e,f);u=a.width,e=a.deltaW;const i=Y(c,t,d);c=i.height,t=i.deltaH,s&&(e=t*s,u=c*s),p+=e/2*m(r)-t/2*v(r),w+=e/2*v(r)+t/2*m(r);break}case"bottom":{const a=Y(c,t,d);c=a.height,t=a.deltaH,s?(e=t*s,u=c*s,p+=e/2*m(r)-t/2*v(r),w+=e/2*v(r)+t/2*m(r)):(p-=t/2*v(r),w+=t/2*m(r));break}case"bottom-left":{e=-e;const a=B(u,e,f);u=a.width,e=a.deltaW;const i=Y(c,t,d);c=i.height,t=i.deltaH,s&&(c=u/s,t=e/s),p-=e/2*m(r)+t/2*v(r),w-=e/2*v(r)-t/2*m(r);break}case"left":{e=-e;const a=B(u,e,f);u=a.width,e=a.deltaW,s?(c=u/s,t=e/s,p-=e/2*m(r)+t/2*v(r),w-=e/2*v(r)-t/2*m(r)):(p-=e/2*m(r),w-=e/2*v(r));break}case"top-left":{e=-e,t=-t;const a=B(u,e,f);u=a.width,e=a.deltaW;const i=Y(c,t,d);c=i.height,t=i.deltaH,s&&(u=c*s,e=t*s),p-=e/2*m(r)-t/2*v(r),w-=e/2*v(r)+t/2*m(r);break}case"top":{t=-t;const a=Y(c,t,d);c=a.height,t=a.deltaH,s?(u=c*s,e=t*s,p+=e/2*m(r)+t/2*v(r),w+=e/2*v(r)-t/2*m(r)):(p+=t/2*v(r),w-=t/2*m(r));break}}return{position:{centerX:p,centerY:w},size:{width:u*h,height:c*o}}},Y=(l,n,e)=>{const t=l+n;return t>e?l=t:(n=e-l,l=e),{height:l,deltaH:n}},B=(l,n,e)=>{const t=l+n;return t>e?l=t:(n=e-l,l=e),{width:l,deltaW:n}},Le=({centerX:l,centerY:n,width:e,height:t,angle:s})=>({top:n-t/2,left:l-e/2,width:e,height:t,angle:s}),Ae=(l,n,e)=>{const{width:t,height:s}=l;return{width:Math.abs(t),height:Math.abs(s),left:n-Math.abs(t)/2,top:e-Math.abs(s)/2}};let Ce=1e3;function He(l,n,e){const t=z(),s=z(!1),f=z(!1),d=z({width:n.width,height:n.height,left:n.left,top:n.top,angle:n.angle});function u(h){if(n.disabled)return;s.value=!0,f.value=!0;const o=l.value;let{clientX:a,clientY:i}=h;const{left:g,top:b}=d.value;o.style.zIndex=Ve();let E=0,L=0;n.boundary&&([E,L]=c()),e&&e("drag-start",d.value),$(X=>{let k=(X.clientX-a)/n.scaleRatio+g,R=(X.clientY-i)/n.scaleRatio+b;if(n.snapToGrid){let{left:M,top:A}=d.value;const D=k-M,I=R-A;k=ee(D,n.gridX,M),R=ee(I,n.gridY,A)}n.boundary&&([k,R]=p(k,R,E,L)),d.value.left=k,d.value.top=R,e&&e("drag",d.value)},X=>{s.value=!1,document.addEventListener("click",w,{once:!0}),e&&e("drag-end",d.value)})}const c=()=>{const{width:h,height:o}=d.value,a=(l.value.parentElement||document.body).getBoundingClientRect(),i=a.width/n.scaleRatio-h,g=a.height/n.scaleRatio-o;return[i,g]},p=(h,o,a,i)=>(h=h<0?0:h,h=h>a?a:h,o=o<0?0:o,o=o>i?i:o,[h,o]),w=()=>{f.value=!1},r=h=>{if(s.value)return;let{left:o,top:a}=d.value;if(["ArrowRight","ArrowLeft"].includes(h.key)){const i=h.key==="ArrowRight";let g=i?1:-1;n.snapToGrid&&(g=i?n.gridX:-n.gridX),o=o+g}else if(["ArrowUp","ArrowDown"].includes(h.key)){const i=h.key==="ArrowDown";let g=i?1:-1;n.snapToGrid&&(g=i?n.gridY:-n.gridY),a=a+g}if(n.boundary){const[i,g]=c();[o,a]=p(o,a,i,g)}d.value.left=o,d.value.top=a};return ke(()=>{l.value&&l.value.addEventListener("mousedown",u)}),P(f,h=>{n.disabledKeyEvent||(h?document.addEventListener("keydown",r):document.removeEventListener("keydown",r))}),Re(()=>{document.removeEventListener("keydown",r)}),{isMousedown:s,selected:f,dragRef:t,dragData:d}}function Ve(){return++Ce+""}function $(l,n){const e=t=>{n&&n(t),document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",e)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",e)}function ee(l,n,e){let t=e;return Math.abs(l)>n/2&&(t=e+(l>0?n:-n)),t}const We=x("div",{class:"es-drager-rotate-handle"},[x("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},[x("path",{fill:"currentColor",d:"M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"})])],-1),_e=te({__name:"rotate",props:{modelValue:{type:Number,default:0},element:{type:Object,required:!0}},emits:["update:modelValue","rotate","rotate-start","rotate-end"],setup(l,{emit:n}){const e=l,t=z(null),s=ae({get:()=>e.modelValue,set:d=>{n("update:modelValue",d)}});function f(d){if(!e.element)return console.warn("[es-drager] rotate component need drag element property");d.stopPropagation(),d.preventDefault();const{width:u,height:c,left:p,top:w}=e.element.getBoundingClientRect(),r=p+u/2,h=w+c/2;n("rotate-start",s.value),$(o=>{const a=r-o.clientX,i=h-o.clientY,g=Math.atan2(i,a)*180/Math.PI-90;s.value=(g+360)%360,n("rotate",s.value)},()=>{n("rotate-end",s.value)})}return(d,u)=>(N(),W("div",{ref_key:"rotateRef",ref:t,class:"es-drager-rotate",onMousedown:f},[_(d.$slots,"default",{},()=>[We])],544))}}),xe=["data-side","onMousedown"],De=x("div",{class:"es-drager-dot-handle"},null,-1),ne=te({__name:"drager",props:ze,emits:["change","drag","drag-start","drag-end","resize","resize-start","resize-end","rotate","rotate-start","rotate-end"],setup(l,{emit:n}){const e=l,t=(o,...a)=>{n(o,...a),n("change",...a)},s=z(null),{selected:f,dragData:d,isMousedown:u}=He(s,e,t),c=z(Q()),p=ae(()=>{const{width:o,height:a,left:i,top:g,angle:b}=d.value;return{width:V(o),height:V(a),left:V(i),top:V(g),transform:`rotate(${b}deg)`,"--es-drager-color":e.color}});function w(o){c.value=Q(o),t("rotate-end",d.value)}function r(o,a){const i=Math.abs(o)%a,g=o>0?a:-a;let b=0;return i>a/2?b=g*Math.ceil(Math.abs(o)/a):b=g*Math.floor(Math.abs(o)/a),b}function h(o,a){a.stopPropagation(),a.preventDefault();const i=a.clientX,g=a.clientY,{width:b,height:E,left:L,top:X}=d.value,k=L+b/2,R=X+E/2,M={width:b,height:E,centerX:k,centerY:R,rotateAngle:d.value.angle},A=o.side,{minWidth:D,minHeight:I,aspectRatio:K}=e;t("resize-start",d.value),$(S=>{const{clientX:le,clientY:re}=S;let C=(le-i)/e.scaleRatio,H=(re-g)/e.scaleRatio;e.snapToGrid&&(C=r(C,e.gridX),H=r(H,e.gridY));const oe=Math.atan2(H,C),F=Xe(C,H),se=S.shiftKey,q=oe-T(M.rotateAngle),de=F*Math.cos(q),ie=F*Math.sin(q),ue=se&&!K?M.width/M.height:K,{position:{centerX:j,centerY:O},size:{width:ce,height:he}}=Ne(A,{...M,rotateAngle:M.rotateAngle},de,ie,ue,D,I),ge=Le({centerX:j,centerY:O,width:ce,height:he,angle:d.value.angle});d.value={...d.value,...Ae(ge,j,O)},t("resize",d.value)},()=>{t("resize-end",d.value)})}return P(()=>[e.width,e.height,e.left,e.top,e.angle],([o,a,i,g,b])=>{d.value={...d.value,width:o,height:a,left:i,top:g,angle:b}}),P(()=>e.selected,o=>{f.value=o},{immediate:!0}),(o,a)=>(N(),W("div",{ref_key:"dragRef",ref:s,class:ye(["es-drager",{disabled:o.disabled,dragging:y(u),selected:y(f)}]),style:U(y(p)),onClick:a[3]||(a[3]=Me(()=>{},["stop"]))},[_(o.$slots,"default"),!o.disabled&&o.resizable?(N(!0),W(fe,{key:0},pe(c.value,(i,g)=>(N(),W("div",{key:g,class:"es-drager-dot","data-side":i.side,style:U({...i}),onMousedown:b=>h(i,b)},[_(o.$slots,"resize",me(ve({side:i.side})),()=>[De])],44,xe))),128)):J("",!0),!o.disabled&&y(f)?(N(),we(_e,{key:1,modelValue:y(d).angle,"onUpdate:modelValue":a[0]||(a[0]=i=>y(d).angle=i),"drag-data":y(d),element:s.value,onRotate:a[1]||(a[1]=i=>t("rotate",y(d))),onRotateStart:a[2]||(a[2]=i=>t("rotate-start",y(d))),onRotateEnd:w},{default:be(()=>[_(o.$slots,"rotate")]),_:3},8,["modelValue","drag-data","element"])):J("",!0)],6))}}),Ie=l=>{l.component("es-drager",ne)};ne.install=Ie;export{ne as o};
