import{d as m,b as w,e as y,y as c,eP as l,g as h,n as r,F as _,_ as x}from"./index-c4559540.js";const g=m({__name:"MarkLine",props:{left:Number,top:Number},setup(t){return(o,e)=>(w(),y(_,null,[c(h("div",{class:"es-editor-markline-left",style:r({left:t.left+"px"})},null,4),[[l,t.left]]),c(h("div",{class:"es-editor-markline-top",style:r({top:t.top+"px"})},null,4),[[l,t.top]])],64))}});const k=x(g,[["__scopeId","data-v-2ff6bec1"]]);function v(t){return{all:t=t||new Map,on:function(o,e){var s=t.get(o);s?s.push(e):t.set(o,[e])},off:function(o,e){var s=t.get(o);s&&(e?s.splice(s.indexOf(e)>>>0,1):t.set(o,[]))},emit:function(o,e){var s=t.get(o);s&&s.slice().map(function(p){p(e)}),(s=t.get("*"))&&s.slice().map(function(p){p(o,e)})}}}const T=v();function b(t){return JSON.parse(JSON.stringify(t))}function M(t,o){const e={x:[],y:[]},{width:s=0,height:p=0}=t[o];return t.forEach((u,d)=>{if(o===d)return;const{top:n,left:i,width:a,height:f}=u;e.y.push({showTop:n,top:n}),e.y.push({showTop:n,top:n-p}),e.y.push({showTop:n+f/2,top:n+f/2-p/2}),e.y.push({showTop:n+f,top:n+f}),e.y.push({showTop:n+f,top:n+f-p}),e.x.push({showLeft:i,left:i}),e.x.push({showLeft:i+a,left:i+a}),e.x.push({showLeft:i+a/2,left:i+a/2-s/2}),e.x.push({showLeft:i+a,left:i+a-s}),e.x.push({showLeft:i,left:i-s})}),e}export{k as M,M as c,b as d,T as e};
