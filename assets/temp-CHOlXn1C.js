import{i as $e}from"./demo-CVebzJpm.js";import{i as K,r as N,s as xe,D as j,E as Pe,y as Ie,d as se,o as V,c as J,G as O,j as G,b as ge,w as Q,a as Ke,q as me,m as Me,F as Le,H as ve,u as D,C as pe,I as Ve,A as Ge,g as ye}from"./index-BmVjITA3.js";const qe={type:{type:String,default:"rect"},tag:{type:[String,Object],default:"div"},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!1},boundary:{type:Boolean},disabled:Boolean,width:{type:Number,default:0},height:{type:Number,default:0},left:{type:Number,default:0},top:{type:Number,default:0},zIndex:{type:Number,default:0},angle:{type:Number,default:0},color:{type:String,default:"#3a7afe"},minWidth:{type:Number,default:-1/0},minHeight:{type:Number,default:-1/0},maxWidth:{type:Number,default:0},maxHeight:{type:Number,default:0},aspectRatio:{type:Number},selected:Boolean,snapToGrid:Boolean,gridX:{type:Number,default:50},gridY:{type:Number,default:50},scaleRatio:{type:Number,default:1},disabledKeyEvent:Boolean,border:{type:Boolean,default:!0},resizeList:{type:Array},equalProportion:{type:Boolean},checkCollision:{type:Boolean},snap:Boolean,snapThreshold:{type:Number,default:10},markline:[Boolean,Function]};function ie(o,n){const e=t=>{n&&n(t),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e),document.removeEventListener("mouseleave",e),document.removeEventListener("touchmove",o),document.removeEventListener("touchend",e)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",e),document.addEventListener("mouseleave",e),document.addEventListener("touchmove",o),document.addEventListener("touchend",e)}function q(o){let n=0,e=0;if(Fe(o)){const t=o.targetTouches[0];n=t.pageX,e=t.pageY}else n=o.clientX,e=o.clientY;return{clientX:n,clientY:e}}function Fe(o){const n=Object.prototype.toString.call(o);return n.substring(8,n.length-1)==="TouchEvent"}const U=(o=0)=>parseInt(o+"")+"px",ee={n:"top",s:"bottom",e:"right",w:"left",ne:"top-right",nw:"top-left",se:"bottom-right",sw:"bottom-left"},oe=["n","ne","e","se","s","sw","w","nw"],_e={n:0,ne:1,e:2,se:3,s:4,sw:5,w:6,nw:7},Ue={0:0,1:1,2:2,3:2,4:3,5:4,6:4,7:5,8:6,9:6,10:7,11:8},je=(o,n)=>{const e=Ue[Math.floor(o/30)],i=(_e[n]+e)%8;return oe[i]},we=(o=0,n)=>{let e=[];for(let t=0;t<oe.length;t++){const i=oe[t],[c,f]=ee[i].split("-"),s=je(o,i),u={[c]:"0%",cursor:s+"-resize",side:ee[i]};if(f)u[f]="0%";else{const g=["top","bottom"].includes(c)?"left":"top";u[g]="50%"}n?n.includes(ee[i])&&e.push(u):e.push(u)}return e},le=o=>o*Math.PI/180,Oe=(o,n)=>Math.sqrt(o*o+n*n),k=o=>Math.cos(le(o)),x=o=>Math.sin(le(o)),Je=(o,n,e,t,i,c,f)=>{let{width:s,height:u,centerX:g,centerY:w,rotateAngle:a}=n;const M=s<0?-1:1,m=u<0?-1:1;if(s=Math.abs(s),u=Math.abs(u),["top-left","top-right","bottom-left","bottom-right"].includes(o)){o==="top-right"?t=-t:o==="bottom-left"?e=-e:o==="top-left"&&(e=-e,t=-t);const d=ne(s,e,c);s=d.width,e=d.deltaW;const r=te(u,t,f);u=r.height,t=r.deltaH,i&&(t=e/i,u=s/i)}switch(o){case"right":{const d=ne(s,e,c);s=d.width,e=d.deltaW,i?(t=e/i,u=s/i,g+=e/2*k(a)-t/2*x(a),w+=e/2*x(a)+t/2*k(a)):(g+=e/2*k(a),w+=e/2*x(a));break}case"top-right":{g+=e/2*k(a)+t/2*x(a),w+=e/2*x(a)-t/2*k(a);break}case"bottom-right":{g+=e/2*k(a)-t/2*x(a),w+=e/2*x(a)+t/2*k(a);break}case"bottom":{const d=te(u,t,f);u=d.height,t=d.deltaH,i?(e=t*i,s=u*i,g+=e/2*k(a)-t/2*x(a),w+=e/2*x(a)+t/2*k(a)):(g-=t/2*x(a),w+=t/2*k(a));break}case"bottom-left":{g-=e/2*k(a)+t/2*x(a),w-=e/2*x(a)-t/2*k(a);break}case"left":{e=-e;const d=ne(s,e,c);s=d.width,e=d.deltaW,i?(u=s/i,t=e/i,g-=e/2*k(a)+t/2*x(a),w-=e/2*x(a)-t/2*k(a)):(g-=e/2*k(a),w-=e/2*x(a));break}case"top-left":{g-=e/2*k(a)-t/2*x(a),w-=e/2*x(a)+t/2*k(a);break}case"top":{t=-t;const d=te(u,t,f);u=d.height,t=d.deltaH,i?(s=u*i,e=t*i,g+=e/2*k(a)+t/2*x(a),w+=e/2*x(a)-t/2*k(a)):(g+=t/2*x(a),w-=t/2*k(a));break}}return{position:{centerX:g,centerY:w},size:{width:s*M,height:u*m}}},te=(o,n,e)=>{const t=o+n;return t>e?o=t:(n=e-o,o=e),{height:o,deltaH:n}},ne=(o,n,e)=>{const t=o+n;return t>e?o=t:(n=e-o,o=e),{width:o,deltaW:n}},Qe=({centerX:o,centerY:n,width:e,height:t,angle:i})=>({top:n-t/2,left:o-e/2,width:e,height:t,angle:i}),Ze=(o,n,e)=>{const{width:t,height:i}=o;return{width:Math.abs(t),height:Math.abs(i),left:n-Math.abs(t)/2,top:e-Math.abs(i)/2}};function Z(o,n){const e=Math.abs(o)%n,t=o>0?n:-n;let i=0;return e>n/2?i=t*Math.ceil(Math.abs(o)/n):i=t*Math.floor(Math.abs(o)/n),i}function He(o,n,e){if(!o||!n)return!1;const t=R(o,e),i=R(n,e);return t.left<i.left+i.width&&t.left+t.width>i.left&&t.top<i.top+i.height&&t.top+t.height>i.top}const R=(o,n)=>{var e=o.getBoundingClientRect();return{...e,left:e.left/n,top:e.top/n,right:e.right/n,bottom:e.bottom/n,width:e.width/n,height:e.height/n}},be=o=>typeof o=="function";function We(o,n){let e=null,t=null;const i=K(()=>o.value.offsetParent||document.body),c=K(()=>R(i.value,n.scaleRatio)),f=N({x:[],y:[]}),s=()=>{n.markline&&!be(n.markline)&&(e||(e=document.querySelector(".es-drager-markline-x")||ke("x",i.value,n.color)),t||(t=document.querySelector(".es-drager-markline-y")||ke("y",i.value,n.color)))},u=(m={})=>{if(n.markline){if(be(n.markline))return n.markline(m);m.left===null?e.style.display="none":(e.style.left=m.left+"px",e.style.backgroundColor=n.color,e.style.display="block"),m.top===null?t.style.display="none":(t.style.top=m.top+"px",t.style.backgroundColor=n.color,t.style.display="block")}},g=()=>{const m=R(o.value,n.scaleRatio),d=document.querySelectorAll(".es-drager"),r=[];for(let h=0;h<d.length;h++){const p=d[h];p!==o.value&&r.push(R(p,n.scaleRatio))}f.value=et(r,m)},w=()=>{const m={top:null,left:null,diffX:0,diffY:0},d=R(o.value,n.scaleRatio);for(let r=0;r<f.value.y.length;r++){const{top:h,showTop:p}=f.value.y[r];if(Math.abs(h-d.top)<n.snapThreshold){m.diffY=h-d.top,m.top=p-c.value.top;break}}for(let r=0;r<f.value.x.length;r++){const{left:h,showLeft:p}=f.value.x[r];if(Math.abs(h-d.left)<n.snapThreshold){m.diffX=h-d.left,m.left=p-c.value.left;break}}return u(m),m},a=()=>{u({left:null,top:null})},M=m=>{if(!(!n.snap&&!n.markline))switch(m){case"drag-start":g();break;case"drag":return w();case"drag-end":a();break}};return xe(()=>{s()}),{marklineEmit:M}}function ke(o="x",n,e=""){const t=document.createElement("div");return t.classList.add(`es-drager-markline-${o}`),t.style.position="absolute",t.style.top="0px",t.style.left="0px",t.style.zIndex="9999",t.style.backgroundColor=e,t.style.display="none",o==="x"?(t.style.height="100%",t.style.width="1px"):(t.style.height="1px",t.style.width="100%"),n.appendChild(t),t}function et(o,n){const e={x:[],y:[]},{width:t=0,height:i=0}=n;return o.forEach(c=>{const{top:f,left:s,width:u,height:g}=c;e.y.push({showTop:f,top:f}),e.y.push({showTop:f,top:f-i}),e.y.push({showTop:f+g/2,top:f+g/2-i/2}),e.y.push({showTop:f+g,top:f+g}),e.y.push({showTop:f+g,top:f+g-i}),e.x.push({showLeft:s,left:s}),e.x.push({showLeft:s+u,left:s+u}),e.x.push({showLeft:s+u/2,left:s+u/2-t/2}),e.x.push({showLeft:s+u,left:s+u-t}),e.x.push({showLeft:s,left:s-t})}),e}function tt(o,n,e,{getBoundary:t,fixBoundary:i,checkDragerCollision:c,emit:f}){let s=0,u=0;return{onKeydown:a=>{let{left:M,top:m}=n.value;if(s||(s=M),u||(u=m),["ArrowRight","ArrowLeft"].includes(a.key)){const d=a.key==="ArrowRight";let r=d?1:-1;o.snapToGrid&&(r=d?o.gridX:-o.gridX),M=M+r}else if(["ArrowUp","ArrowDown"].includes(a.key)){const d=a.key==="ArrowDown";let r=d?1:-1;o.snapToGrid&&(r=d?o.gridY:-o.gridY),m=m+r}if(o.boundary){const[d,r,h,p]=t();[M,m]=i(M,m,d,r,h,p)}n.value.left=M,n.value.top=m},onKeyup:a=>{["ArrowRight","ArrowLeft","ArrowUp","ArrowDown"].includes(a.key)&&o.checkCollision&&c()&&(n.value.left=s,n.value.top=u),s=0,u=0}}}function nt(o,n,e){const t=N(!1),i=N(!1),c=N({width:n.width,height:n.height,left:n.left,top:n.top,angle:n.angle}),{marklineEmit:f}=We(o,n),s=new Set;function u(r){if(s.add(r.button),n.disabled)return;t.value=!0,i.value=!0;let{clientX:h,clientY:p}=q(r);const{left:X,top:C}=c.value;let l=0,v=0,y=0,b=0;n.boundary&&([l,v,y,b]=g()),f("drag-start"),e&&e("drag-start",c.value),ie(L=>{if(s.size>1)return;const{clientX:E,clientY:S}=q(L);let T=(E-h)/n.scaleRatio+X,B=(S-p)/n.scaleRatio+C;if(n.snapToGrid){let{left:A,top:$}=c.value;const z=T-A,P=B-$;T=A+Z(z,n.gridX),B=$+Z(P,n.gridY)}n.boundary&&([T,B]=w(T,B,l,v,y,b)),c.value.left=T,c.value.top=B,e&&e("drag",c.value),Pe(()=>{const A=f("drag");n.snap&&(A.diffX&&(c.value.left+=A.diffX),A.diffY&&(c.value.top+=A.diffY))})},L=>{n.checkCollision&&a()&&(c.value.top=C,c.value.left=X),s.clear(),t.value=!1,f("drag-end"),e&&e("drag-end",c.value)})}const g=()=>{let r=0,h=0;const{left:p,top:X,height:C,width:l,angle:v}=c.value,y=o.value.offsetParent||document.body,b=R(y,n.scaleRatio);if(v){const E=R(o.value,n.scaleRatio);r=E.left-Math.floor(p-(E.width-l)+b.left),h=E.top-Math.floor(X-(E.height-C)+b.top)}const Y=b.width-l,L=b.height-C;return[r,Y-r,h,L-h,b.width,b.height]},w=(r,h,p,X,C,l)=>(r=r<p?p:r,r=r>X?X:r,h=h<C?C:h,h=h>l?l:h,[r,h]),a=()=>{const r=o.value.offsetParent||document.body,h=Array.from(r.children).filter(p=>p!==o.value&&p.classList.contains("es-drager"));for(let p=0;p<h.length;p++){const X=h[p];if(He(o.value,X,n.scaleRatio))return!0}},M=()=>{i.value=!1},{onKeydown:m,onKeyup:d}=tt(n,c,i,{getBoundary:g,fixBoundary:w,checkDragerCollision:a,emit:e});return j(i,r=>{r?(e("focus",r),document.addEventListener("click",M,{once:!0})):e("blur",r),!n.disabledKeyEvent&&(r?(document.addEventListener("keydown",m),document.addEventListener("keyup",d)):(document.removeEventListener("keydown",m),document.removeEventListener("keyup",d)))}),xe(()=>{if(o.value){if(!c.value.width&&!c.value.height){const{width:r,height:h}=R(o.value,n.scaleRatio);c.value={...c.value,width:r+2,height:h+2}}if(o.value.addEventListener("mousedown",u),o.value.addEventListener("touchstart",u,{passive:!0}),n.type==="text"){const r=window.getComputedStyle(o.value);c.value.height=parseInt(r.fontSize)}}}),Ie(()=>{document.removeEventListener("click",M),document.removeEventListener("keydown",m),document.removeEventListener("keyup",d)}),{isMousedown:t,selected:i,dragData:c,getBoundary:g,checkDragerCollision:a}}const ot=se({__name:"rotate",props:{modelValue:{type:Number,default:0},element:{type:Object}},emits:["update:modelValue","rotate","rotate-start","rotate-end"],setup(o,{emit:n}){const e=o,t=n,i=N(null),c=K({get:()=>e.modelValue,set:s=>{t("update:modelValue",s)}});function f(s){if(!e.element)return console.warn("[es-drager] rotate component need drag element property");s.stopPropagation();const{width:u,height:g,left:w,top:a}=e.element.getBoundingClientRect(),M=w+u/2,m=a+g/2;t("rotate-start",c.value),ie(d=>{const{clientX:r,clientY:h}=q(d),p=M-r,X=m-h,l=Math.atan2(X,p)*180/Math.PI-90;c.value=(l+360)%360,t("rotate",c.value)},()=>{t("rotate-end",c.value)})}return(s,u)=>(V(),J("div",{ref_key:"rotateRef",ref:i,class:"es-drager-rotate",onMousedown:f,onTouchstartPassive:f},[O(s.$slots,"default",{},()=>[u[0]||(u[0]=G("div",{class:"es-drager-rotate-handle"},[G("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},[G("path",{fill:"currentColor",d:"M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"})])],-1))])],544))}}),st=["data-side","onMousedown","onTouchstartPassive"],H=se({__name:"drager",props:qe,emits:["change","drag","drag-start","drag-end","resize","resize-start","resize-end","rotate","rotate-start","rotate-end","focus","blur"],setup(o,{emit:n}){const e=o,t=n,i=(l,...v)=>{t(l,...v)},c=N(null),{selected:f,dragData:s,isMousedown:u,getBoundary:g,checkDragerCollision:w}=nt(c,e,i),a=N(we(0,e.resizeList)),M=K(()=>e.resizable&&!e.disabled),m=K(()=>e.rotatable&&!e.disabled&&f.value),d=K(()=>e.type!="text"?a.value:a.value.filter(l=>!["top","bottom"].includes(l.side))),r=K(()=>{const{width:l,height:v,left:y,top:b,angle:Y}=s.value,L={};l&&(L.width=U(l)),v&&(e.type==="text"?L.fontSize=v+"px":L.height=U(v));let E=[`translateX(${U(y)})`,`translateY(${U(b)})`,`rotate(${Y}deg)`];return{...L,zIndex:e.zIndex,transform:E.join(" "),"--es-drager-color":e.color}});function h(l){c.value||(c.value=l.$el||l)}function p(l){a.value=we(l,e.resizeList),i("rotate-end",s.value)}function X(l,v){if(e.disabled)return;v.stopPropagation();const{clientX:y,clientY:b}=q(v),Y=y,L=b,{width:E,height:S,left:T,top:B}=s.value,A=T+E/2,$=B+S/2,z={width:E,height:S,centerX:A,centerY:$,rotateAngle:s.value.angle},P=l.side;let{minWidth:Ee,minHeight:Xe,aspectRatio:W,equalProportion:Ye}=e;i("resize-start",s.value,P);let ae=[];e.boundary&&(ae=g()),["text","image"].includes(e.type)&&P.includes("-")&&(W=z.width/z.height),ie(re=>{const{clientX:Ae,clientY:ze}=q(re);let F=(Ae-Y)/e.scaleRatio,_=(ze-L)/e.scaleRatio;e.snapToGrid&&(F=Z(F,e.gridX),_=Z(_,e.gridY));const Te=Math.atan2(_,F),ue=Oe(F,_),Be=re.shiftKey,ce=Te-le(z.rotateAngle),Ce=ue*Math.cos(ce),Se=ue*Math.sin(ce),de=(Ye||Be)&&!W?z.width/z.height:W,{position:{centerX:fe,centerY:he},size:{width:De,height:Re}}=Je(P,{...z,rotateAngle:z.rotateAngle},Ce,Se,de,Ee,Xe),Ne=Qe({centerX:fe,centerY:he,width:De,height:Re,angle:s.value.angle});let I={...s.value,...Ze(Ne,fe,he)};e.maxWidth>0&&(I.width=Math.min(I.width,e.maxWidth)),e.maxHeight>0&&(I.height=Math.min(I.height,e.maxHeight)),e.boundary&&(I=C(I,ae,de)),s.value=I,i("resize",s.value,P)},()=>{e.checkCollision&&w()&&(s.value={...s.value,width:E,height:S,left:T,top:B}),i("resize-end",s.value,P)})}function C(l,v,y){const[b,Y,L,E,S,T]=v,B=l.left<b,A=l.left+l.width>S,$=l.top<L,z=l.top+l.height>T;return B&&(l.left=b,l.width=s.value.width),$&&(l.top=L,l.height=s.value.height),(A||z)&&(A&&(l.left=s.value.left),z&&(l.top=s.value.top),z||(l.width=S-l.left),A||(l.height=T-l.top)),(z||$)&&y&&(l.width=s.value.width,l.left=s.value.left),(A||B)&&y&&(l.height=s.value.height,l.top=s.value.top),l}return j(()=>[e.width,e.height,e.left,e.top,e.angle],([l,v,y,b,Y],[L,E,S,T,B])=>{l!==L&&(s.value.width=l),v!==E&&(s.value.height=v),y!==S&&(s.value.left=y),b!==T&&(s.value.top=b),Y!==B&&(s.value.angle=Y)}),j(()=>s.value,l=>{t("change",{...l})},{deep:!0}),j(()=>e.selected,l=>{f.value=l},{immediate:!0}),(l,v)=>(V(),ge(Ge(l.tag),{ref:h,class:Ve(["es-drager",`es-drager-${l.type}`,{disabled:l.disabled,dragging:D(u),selected:D(f),border:l.border}]),style:me(r.value),onClick:v[3]||(v[3]=pe(()=>{},["stop"])),onMousedown:v[4]||(v[4]=pe(()=>{},["stop"]))},{default:Q(()=>[O(l.$slots,"default"),M.value?(V(!0),J(Le,{key:0},Ke(d.value,(y,b)=>(V(),J("div",{key:b,class:"es-drager-dot","data-side":y.side,style:me({...y}),onMousedown:Y=>X(y,Y),onTouchstartPassive:Y=>X(y,Y)},[O(l.$slots,"resize",Me({ref_for:!0},{side:y.side}),()=>[v[5]||(v[5]=G("div",{class:"es-drager-dot-handle"},null,-1))])],44,st))),128)):ve("",!0),m.value?(V(),ge(ot,{key:1,modelValue:D(s).angle,"onUpdate:modelValue":v[0]||(v[0]=y=>D(s).angle=y),element:c.value,onRotate:v[1]||(v[1]=y=>i("rotate",D(s))),onRotateStart:v[2]||(v[2]=y=>i("rotate-start",D(s))),onRotateEnd:p},{default:Q(()=>[O(l.$slots,"rotate")]),_:3},8,["modelValue","element"])):ve("",!0)]),_:3},40,["class","style"]))}}),it=o=>{o.component("es-drager",H)};H.install=it;const lt=["src"],ct=se({__name:"temp",setup(o){N();const n=N({left:100,top:100});function e(t,i){}return(t,i)=>(V(),J(Le,null,[ye(D(H),Me({type:"text"},n.value,{rotatable:"",boundary:"",onResize:e}),{default:Q(()=>i[0]||(i[0]=[G("div",{contenteditable:!0,style:{"text-align":"center",width:"100%"}},"啦啦啦啦啦啦啦啦",-1)])),_:1},16),ye(D(H),{type:"image",width:200,height:120,left:200,top:200,rotatable:""},{default:Q(()=>[G("img",{class:"img",style:{width:"100%",height:"100%"},src:D($e)},null,8,lt)]),_:1})],64))}});export{ct as default};