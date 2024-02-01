import{a8 as Q,d as W,J as X,h as x,o as z,c as $,i as M,K as U,n as Y,_ as Z}from"./index-831a37bf.js";var K={exports:{}},L={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},R={exports:{}},tt=function(e){return!e||typeof e=="string"?!1:e instanceof Array||Array.isArray(e)||e.length>=0&&(e.splice instanceof Function||Object.getOwnPropertyDescriptor(e,e.length-1)&&e.constructor.name!=="String")},et=tt,nt=Array.prototype.concat,rt=Array.prototype.slice,B=R.exports=function(e){for(var n=[],r=0,o=e.length;r<o;r++){var a=e[r];et(a)?n=nt.call(n,rt.call(a)):n.push(a)}return n};B.wrap=function(t){return function(){return t(B(arguments))}};var ot=R.exports,F=L,O=ot,J=Object.hasOwnProperty,T=Object.create(null);for(var N in F)J.call(F,N)&&(T[F[N]]=N);var m=K.exports={to:{},get:{}};m.get=function(t){var e=t.substring(0,3).toLowerCase(),n,r;switch(e){case"hsl":n=m.get.hsl(t),r="hsl";break;case"hwb":n=m.get.hwb(t),r="hwb";break;default:n=m.get.rgb(t),r="rgb";break}return n?{model:r,value:n}:null};m.get.rgb=function(t){if(!t)return null;var e=/^#([a-f0-9]{3,4})$/i,n=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,r=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,o=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,a=/^(\w+)$/,s=[0,0,0,1],l,i,h;if(l=t.match(n)){for(h=l[2],l=l[1],i=0;i<3;i++){var d=i*2;s[i]=parseInt(l.slice(d,d+2),16)}h&&(s[3]=parseInt(h,16)/255)}else if(l=t.match(e)){for(l=l[1],h=l[3],i=0;i<3;i++)s[i]=parseInt(l[i]+l[i],16);h&&(s[3]=parseInt(h+h,16)/255)}else if(l=t.match(r)){for(i=0;i<3;i++)s[i]=parseInt(l[i+1],0);l[4]&&(l[5]?s[3]=parseFloat(l[4])*.01:s[3]=parseFloat(l[4]))}else if(l=t.match(o)){for(i=0;i<3;i++)s[i]=Math.round(parseFloat(l[i+1])*2.55);l[4]&&(l[5]?s[3]=parseFloat(l[4])*.01:s[3]=parseFloat(l[4]))}else return(l=t.match(a))?l[1]==="transparent"?[0,0,0,0]:J.call(F,l[1])?(s=F[l[1]],s[3]=1,s):null:null;for(i=0;i<3;i++)s[i]=y(s[i],0,255);return s[3]=y(s[3],0,1),s};m.get.hsl=function(t){if(!t)return null;var e=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,n=t.match(e);if(n){var r=parseFloat(n[4]),o=(parseFloat(n[1])%360+360)%360,a=y(parseFloat(n[2]),0,100),s=y(parseFloat(n[3]),0,100),l=y(isNaN(r)?1:r,0,1);return[o,a,s,l]}return null};m.get.hwb=function(t){if(!t)return null;var e=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,n=t.match(e);if(n){var r=parseFloat(n[4]),o=(parseFloat(n[1])%360+360)%360,a=y(parseFloat(n[2]),0,100),s=y(parseFloat(n[3]),0,100),l=y(isNaN(r)?1:r,0,1);return[o,a,s,l]}return null};m.to.hex=function(){var t=O(arguments);return"#"+A(t[0])+A(t[1])+A(t[2])+(t[3]<1?A(Math.round(t[3]*255)):"")};m.to.rgb=function(){var t=O(arguments);return t.length<4||t[3]===1?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"};m.to.rgb.percent=function(){var t=O(arguments),e=Math.round(t[0]/255*100),n=Math.round(t[1]/255*100),r=Math.round(t[2]/255*100);return t.length<4||t[3]===1?"rgb("+e+"%, "+n+"%, "+r+"%)":"rgba("+e+"%, "+n+"%, "+r+"%, "+t[3]+")"};m.to.hsl=function(){var t=O(arguments);return t.length<4||t[3]===1?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"};m.to.hwb=function(){var t=O(arguments),e="";return t.length>=4&&t[3]!==1&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")"};m.to.keyword=function(t){return T[t.slice(0,3)]};function y(t,e,n){return Math.min(Math.max(e,t),n)}function A(t){var e=Math.round(t).toString(16).toUpperCase();return e.length<2?"0"+e:e}var st=K.exports;const S=L,j={};for(const t of Object.keys(S))j[S[t]]=t;const c={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};var V=c;for(const t of Object.keys(c)){if(!("channels"in c[t]))throw new Error("missing channels property: "+t);if(!("labels"in c[t]))throw new Error("missing channel labels property: "+t);if(c[t].labels.length!==c[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:n}=c[t];delete c[t].channels,delete c[t].labels,Object.defineProperty(c[t],"channels",{value:e}),Object.defineProperty(c[t],"labels",{value:n})}c.rgb.hsl=function(t){const e=t[0]/255,n=t[1]/255,r=t[2]/255,o=Math.min(e,n,r),a=Math.max(e,n,r),s=a-o;let l,i;a===o?l=0:e===a?l=(n-r)/s:n===a?l=2+(r-e)/s:r===a&&(l=4+(e-n)/s),l=Math.min(l*60,360),l<0&&(l+=360);const h=(o+a)/2;return a===o?i=0:h<=.5?i=s/(a+o):i=s/(2-a-o),[l,i*100,h*100]};c.rgb.hsv=function(t){let e,n,r,o,a;const s=t[0]/255,l=t[1]/255,i=t[2]/255,h=Math.max(s,l,i),d=h-Math.min(s,l,i),u=function(v){return(h-v)/6/d+1/2};return d===0?(o=0,a=0):(a=d/h,e=u(s),n=u(l),r=u(i),s===h?o=r-n:l===h?o=1/3+e-r:i===h&&(o=2/3+n-e),o<0?o+=1:o>1&&(o-=1)),[o*360,a*100,h*100]};c.rgb.hwb=function(t){const e=t[0],n=t[1];let r=t[2];const o=c.rgb.hsl(t)[0],a=1/255*Math.min(e,Math.min(n,r));return r=1-1/255*Math.max(e,Math.max(n,r)),[o,a*100,r*100]};c.rgb.cmyk=function(t){const e=t[0]/255,n=t[1]/255,r=t[2]/255,o=Math.min(1-e,1-n,1-r),a=(1-e-o)/(1-o)||0,s=(1-n-o)/(1-o)||0,l=(1-r-o)/(1-o)||0;return[a*100,s*100,l*100,o*100]};function at(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}c.rgb.keyword=function(t){const e=j[t];if(e)return e;let n=1/0,r;for(const o of Object.keys(S)){const a=S[o],s=at(t,a);s<n&&(n=s,r=o)}return r};c.keyword.rgb=function(t){return S[t]};c.rgb.xyz=function(t){let e=t[0]/255,n=t[1]/255,r=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,n=n>.04045?((n+.055)/1.055)**2.4:n/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;const o=e*.4124+n*.3576+r*.1805,a=e*.2126+n*.7152+r*.0722,s=e*.0193+n*.1192+r*.9505;return[o*100,a*100,s*100]};c.rgb.lab=function(t){const e=c.rgb.xyz(t);let n=e[0],r=e[1],o=e[2];n/=95.047,r/=100,o/=108.883,n=n>.008856?n**(1/3):7.787*n+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,o=o>.008856?o**(1/3):7.787*o+16/116;const a=116*r-16,s=500*(n-r),l=200*(r-o);return[a,s,l]};c.hsl.rgb=function(t){const e=t[0]/360,n=t[1]/100,r=t[2]/100;let o,a,s;if(n===0)return s=r*255,[s,s,s];r<.5?o=r*(1+n):o=r+n-r*n;const l=2*r-o,i=[0,0,0];for(let h=0;h<3;h++)a=e+1/3*-(h-1),a<0&&a++,a>1&&a--,6*a<1?s=l+(o-l)*6*a:2*a<1?s=o:3*a<2?s=l+(o-l)*(2/3-a)*6:s=l,i[h]=s*255;return i};c.hsl.hsv=function(t){const e=t[0];let n=t[1]/100,r=t[2]/100,o=n;const a=Math.max(r,.01);r*=2,n*=r<=1?r:2-r,o*=a<=1?a:2-a;const s=(r+n)/2,l=r===0?2*o/(a+o):2*n/(r+n);return[e,l*100,s*100]};c.hsv.rgb=function(t){const e=t[0]/60,n=t[1]/100;let r=t[2]/100;const o=Math.floor(e)%6,a=e-Math.floor(e),s=255*r*(1-n),l=255*r*(1-n*a),i=255*r*(1-n*(1-a));switch(r*=255,o){case 0:return[r,i,s];case 1:return[l,r,s];case 2:return[s,r,i];case 3:return[s,l,r];case 4:return[i,s,r];case 5:return[r,s,l]}};c.hsv.hsl=function(t){const e=t[0],n=t[1]/100,r=t[2]/100,o=Math.max(r,.01);let a,s;s=(2-n)*r;const l=(2-n)*o;return a=n*o,a/=l<=1?l:2-l,a=a||0,s/=2,[e,a*100,s*100]};c.hwb.rgb=function(t){const e=t[0]/360;let n=t[1]/100,r=t[2]/100;const o=n+r;let a;o>1&&(n/=o,r/=o);const s=Math.floor(6*e),l=1-r;a=6*e-s,s&1&&(a=1-a);const i=n+a*(l-n);let h,d,u;switch(s){default:case 6:case 0:h=l,d=i,u=n;break;case 1:h=i,d=l,u=n;break;case 2:h=n,d=l,u=i;break;case 3:h=n,d=i,u=l;break;case 4:h=i,d=n,u=l;break;case 5:h=l,d=n,u=i;break}return[h*255,d*255,u*255]};c.cmyk.rgb=function(t){const e=t[0]/100,n=t[1]/100,r=t[2]/100,o=t[3]/100,a=1-Math.min(1,e*(1-o)+o),s=1-Math.min(1,n*(1-o)+o),l=1-Math.min(1,r*(1-o)+o);return[a*255,s*255,l*255]};c.xyz.rgb=function(t){const e=t[0]/100,n=t[1]/100,r=t[2]/100;let o,a,s;return o=e*3.2406+n*-1.5372+r*-.4986,a=e*-.9689+n*1.8758+r*.0415,s=e*.0557+n*-.204+r*1.057,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,a=a>.0031308?1.055*a**(1/2.4)-.055:a*12.92,s=s>.0031308?1.055*s**(1/2.4)-.055:s*12.92,o=Math.min(Math.max(0,o),1),a=Math.min(Math.max(0,a),1),s=Math.min(Math.max(0,s),1),[o*255,a*255,s*255]};c.xyz.lab=function(t){let e=t[0],n=t[1],r=t[2];e/=95.047,n/=100,r/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,n=n>.008856?n**(1/3):7.787*n+16/116,r=r>.008856?r**(1/3):7.787*r+16/116;const o=116*n-16,a=500*(e-n),s=200*(n-r);return[o,a,s]};c.lab.xyz=function(t){const e=t[0],n=t[1],r=t[2];let o,a,s;a=(e+16)/116,o=n/500+a,s=a-r/200;const l=a**3,i=o**3,h=s**3;return a=l>.008856?l:(a-16/116)/7.787,o=i>.008856?i:(o-16/116)/7.787,s=h>.008856?h:(s-16/116)/7.787,o*=95.047,a*=100,s*=108.883,[o,a,s]};c.lab.lch=function(t){const e=t[0],n=t[1],r=t[2];let o;o=Math.atan2(r,n)*360/2/Math.PI,o<0&&(o+=360);const s=Math.sqrt(n*n+r*r);return[e,s,o]};c.lch.lab=function(t){const e=t[0],n=t[1],o=t[2]/360*2*Math.PI,a=n*Math.cos(o),s=n*Math.sin(o);return[e,a,s]};c.rgb.ansi16=function(t,e=null){const[n,r,o]=t;let a=e===null?c.rgb.hsv(t)[2]:e;if(a=Math.round(a/50),a===0)return 30;let s=30+(Math.round(o/255)<<2|Math.round(r/255)<<1|Math.round(n/255));return a===2&&(s+=60),s};c.hsv.ansi16=function(t){return c.rgb.ansi16(c.hsv.rgb(t),t[2])};c.rgb.ansi256=function(t){const e=t[0],n=t[1],r=t[2];return e===n&&n===r?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5)};c.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const n=(~~(t>50)+1)*.5,r=(e&1)*n*255,o=(e>>1&1)*n*255,a=(e>>2&1)*n*255;return[r,o,a]};c.ansi256.rgb=function(t){if(t>=232){const a=(t-232)*10+8;return[a,a,a]}t-=16;let e;const n=Math.floor(t/36)/5*255,r=Math.floor((e=t%36)/6)/5*255,o=e%6/5*255;return[n,r,o]};c.rgb.hex=function(t){const n=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(n.length)+n};c.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let n=e[0];e[0].length===3&&(n=n.split("").map(l=>l+l).join(""));const r=parseInt(n,16),o=r>>16&255,a=r>>8&255,s=r&255;return[o,a,s]};c.rgb.hcg=function(t){const e=t[0]/255,n=t[1]/255,r=t[2]/255,o=Math.max(Math.max(e,n),r),a=Math.min(Math.min(e,n),r),s=o-a;let l,i;return s<1?l=a/(1-s):l=0,s<=0?i=0:o===e?i=(n-r)/s%6:o===n?i=2+(r-e)/s:i=4+(e-n)/s,i/=6,i%=1,[i*360,s*100,l*100]};c.hsl.hcg=function(t){const e=t[1]/100,n=t[2]/100,r=n<.5?2*e*n:2*e*(1-n);let o=0;return r<1&&(o=(n-.5*r)/(1-r)),[t[0],r*100,o*100]};c.hsv.hcg=function(t){const e=t[1]/100,n=t[2]/100,r=e*n;let o=0;return r<1&&(o=(n-r)/(1-r)),[t[0],r*100,o*100]};c.hcg.rgb=function(t){const e=t[0]/360,n=t[1]/100,r=t[2]/100;if(n===0)return[r*255,r*255,r*255];const o=[0,0,0],a=e%1*6,s=a%1,l=1-s;let i=0;switch(Math.floor(a)){case 0:o[0]=1,o[1]=s,o[2]=0;break;case 1:o[0]=l,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=s;break;case 3:o[0]=0,o[1]=l,o[2]=1;break;case 4:o[0]=s,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=l}return i=(1-n)*r,[(n*o[0]+i)*255,(n*o[1]+i)*255,(n*o[2]+i)*255]};c.hcg.hsv=function(t){const e=t[1]/100,n=t[2]/100,r=e+n*(1-e);let o=0;return r>0&&(o=e/r),[t[0],o*100,r*100]};c.hcg.hsl=function(t){const e=t[1]/100,r=t[2]/100*(1-e)+.5*e;let o=0;return r>0&&r<.5?o=e/(2*r):r>=.5&&r<1&&(o=e/(2*(1-r))),[t[0],o*100,r*100]};c.hcg.hwb=function(t){const e=t[1]/100,n=t[2]/100,r=e+n*(1-e);return[t[0],(r-e)*100,(1-r)*100]};c.hwb.hcg=function(t){const e=t[1]/100,r=1-t[2]/100,o=r-e;let a=0;return o<1&&(a=(r-o)/(1-o)),[t[0],o*100,a*100]};c.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]};c.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]};c.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]};c.gray.hsl=function(t){return[0,0,t[0]]};c.gray.hsv=c.gray.hsl;c.gray.hwb=function(t){return[0,100,t[0]]};c.gray.cmyk=function(t){return[0,0,0,t[0]]};c.gray.lab=function(t){return[t[0],0,0]};c.gray.hex=function(t){const e=Math.round(t[0]/100*255)&255,r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r};c.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]};const I=V;function lt(){const t={},e=Object.keys(I);for(let n=e.length,r=0;r<n;r++)t[e[r]]={distance:-1,parent:null};return t}function it(t){const e=lt(),n=[t];for(e[t].distance=0;n.length;){const r=n.pop(),o=Object.keys(I[r]);for(let a=o.length,s=0;s<a;s++){const l=o[s],i=e[l];i.distance===-1&&(i.distance=e[r].distance+1,i.parent=r,n.unshift(l))}}return e}function ct(t,e){return function(n){return e(t(n))}}function ht(t,e){const n=[e[t].parent,t];let r=I[e[t].parent][t],o=e[t].parent;for(;e[o].parent;)n.unshift(e[o].parent),r=ct(I[e[o].parent][o],r),o=e[o].parent;return r.conversion=n,r}var ut=function(t){const e=it(t),n={},r=Object.keys(e);for(let o=r.length,a=0;a<o;a++){const s=r[a];e[s].parent!==null&&(n[s]=ht(s,e))}return n};const q=V,ft=ut,w={},dt=Object.keys(q);function gt(t){const e=function(...n){const r=n[0];return r==null?r:(r.length>1&&(n=r),t(n))};return"conversion"in t&&(e.conversion=t.conversion),e}function pt(t){const e=function(...n){const r=n[0];if(r==null)return r;r.length>1&&(n=r);const o=t(n);if(typeof o=="object")for(let a=o.length,s=0;s<a;s++)o[s]=Math.round(o[s]);return o};return"conversion"in t&&(e.conversion=t.conversion),e}dt.forEach(t=>{w[t]={},Object.defineProperty(w[t],"channels",{value:q[t].channels}),Object.defineProperty(w[t],"labels",{value:q[t].labels});const e=ft(t);Object.keys(e).forEach(r=>{const o=e[r];w[t][r]=pt(o),w[t][r].raw=gt(o)})});var bt=w;const k=st,b=bt,H=["keyword","gray","hex"],G={};for(const t of Object.keys(b))G[[...b[t].labels].sort().join("")]=t;const C={};function p(t,e){if(!(this instanceof p))return new p(t,e);if(e&&e in H&&(e=null),e&&!(e in b))throw new Error("Unknown model: "+e);let n,r;if(t==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof p)this.model=t.model,this.color=[...t.color],this.valpha=t.valpha;else if(typeof t=="string"){const o=k.get(t);if(o===null)throw new Error("Unable to parse color from string: "+t);this.model=o.model,r=b[this.model].channels,this.color=o.value.slice(0,r),this.valpha=typeof o.value[r]=="number"?o.value[r]:1}else if(t.length>0){this.model=e||"rgb",r=b[this.model].channels;const o=Array.prototype.slice.call(t,0,r);this.color=P(o,r),this.valpha=typeof t[r]=="number"?t[r]:1}else if(typeof t=="number")this.model="rgb",this.color=[t>>16&255,t>>8&255,t&255],this.valpha=1;else{this.valpha=1;const o=Object.keys(t);"alpha"in t&&(o.splice(o.indexOf("alpha"),1),this.valpha=typeof t.alpha=="number"?t.alpha:0);const a=o.sort().join("");if(!(a in G))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=G[a];const{labels:s}=b[this.model],l=[];for(n=0;n<s.length;n++)l.push(t[s[n]]);this.color=P(l)}if(C[this.model])for(r=b[this.model].channels,n=0;n<r;n++){const o=C[this.model][n];o&&(this.color[n]=o(this.color[n]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}p.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let e=this.model in k.to?this:this.rgb();e=e.round(typeof t=="number"?t:1);const n=e.valpha===1?e.color:[...e.color,this.valpha];return k.to[e.model](n)},percentString(t){const e=this.rgb().round(typeof t=="number"?t:1),n=e.valpha===1?e.color:[...e.color,this.valpha];return k.to.rgb.percent(n)},array(){return this.valpha===1?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:e}=b[this.model],{labels:n}=b[this.model];for(let r=0;r<e;r++)t[n[r]]=this.color[r];return this.valpha!==1&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,this.valpha!==1&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,this.valpha!==1&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new p([...this.color.map(vt(t)),this.valpha],this.model)},alpha(t){return t!==void 0?new p([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:f("rgb",0,g(255)),green:f("rgb",1,g(255)),blue:f("rgb",2,g(255)),hue:f(["hsl","hsv","hsl","hwb","hcg"],0,t=>(t%360+360)%360),saturationl:f("hsl",1,g(100)),lightness:f("hsl",2,g(100)),saturationv:f("hsv",1,g(100)),value:f("hsv",2,g(100)),chroma:f("hcg",1,g(100)),gray:f("hcg",2,g(100)),white:f("hwb",1,g(100)),wblack:f("hwb",2,g(100)),cyan:f("cmyk",0,g(100)),magenta:f("cmyk",1,g(100)),yellow:f("cmyk",2,g(100)),black:f("cmyk",3,g(100)),x:f("xyz",0,g(95.047)),y:f("xyz",1,g(100)),z:f("xyz",2,g(108.833)),l:f("lab",0,g(100)),a:f("lab",1),b:f("lab",2),keyword(t){return t!==void 0?new p(t):b[this.model].keyword(this.color)},hex(t){return t!==void 0?new p(t):k.to.hex(this.rgb().round().color)},hexa(t){if(t!==void 0)return new p(t);const e=this.rgb().round().color;let n=Math.round(this.valpha*255).toString(16).toUpperCase();return n.length===1&&(n="0"+n),k.to.hex(e)+n},rgbNumber(){const t=this.rgb().color;return(t[0]&255)<<16|(t[1]&255)<<8|t[2]&255},luminosity(){const t=this.rgb().color,e=[];for(const[n,r]of t.entries()){const o=r/255;e[n]=o<=.04045?o/12.92:((o+.055)/1.055)**2.4}return .2126*e[0]+.7152*e[1]+.0722*e[2]},contrast(t){const e=this.luminosity(),n=t.luminosity();return e>n?(e+.05)/(n+.05):(n+.05)/(e+.05)},level(t){const e=this.contrast(t);return e>=7?"AAA":e>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(t[0]*2126+t[1]*7152+t[2]*722)/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let e=0;e<3;e++)t.color[e]=255-t.color[e];return t},lighten(t){const e=this.hsl();return e.color[2]+=e.color[2]*t,e},darken(t){const e=this.hsl();return e.color[2]-=e.color[2]*t,e},saturate(t){const e=this.hsl();return e.color[1]+=e.color[1]*t,e},desaturate(t){const e=this.hsl();return e.color[1]-=e.color[1]*t,e},whiten(t){const e=this.hwb();return e.color[1]+=e.color[1]*t,e},blacken(t){const e=this.hwb();return e.color[2]+=e.color[2]*t,e},grayscale(){const t=this.rgb().color,e=t[0]*.3+t[1]*.59+t[2]*.11;return p.rgb(e,e,e)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const e=this.hsl();let n=e.color[0];return n=(n+t)%360,n=n<0?360+n:n,e.color[0]=n,e},mix(t,e){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const n=t.rgb(),r=this.rgb(),o=e===void 0?.5:e,a=2*o-1,s=n.alpha()-r.alpha(),l=((a*s===-1?a:(a+s)/(1+a*s))+1)/2,i=1-l;return p.rgb(l*n.red()+i*r.red(),l*n.green()+i*r.green(),l*n.blue()+i*r.blue(),n.alpha()*o+r.alpha()*(1-o))}};for(const t of Object.keys(b)){if(H.includes(t))continue;const{channels:e}=b[t];p.prototype[t]=function(...n){return this.model===t?new p(this):n.length>0?new p(n,t):new p([...yt(b[this.model][t].raw(this.color)),this.valpha],t)},p[t]=function(...n){let r=n[0];return typeof r=="number"&&(r=P(n,e)),new p(r,t)}}function mt(t,e){return Number(t.toFixed(e))}function vt(t){return function(e){return mt(e,t)}}function f(t,e,n){t=Array.isArray(t)?t:[t];for(const r of t)(C[r]||(C[r]=[]))[e]=n;return t=t[0],function(r){let o;return r!==void 0?(n&&(r=n(r)),o=this[t](),o.color[e]=r,o):(o=this[t]().color[e],n&&(o=n(o)),o)}}function g(t){return function(e){return Math.max(0,Math.min(t,e))}}function yt(t){return Array.isArray(t)?t:[t]}function P(t,e){for(let n=0;n<e;n++)typeof t[n]!="number"&&(t[n]=0);return t}var wt=p;const kt=Q(wt);let xt=1;function _(t="drager"){return`${t}${xt++}`}function Ct(t){return JSON.parse(JSON.stringify(t))}function Nt(t,e){const n=t.filter(u=>u.selected);if(!n.length)return t;let r=1/0,o=1/0,a=-1/0,s=-1/0;Math.max(...n.map(u=>u.left)),n.forEach(u=>{const v=document.getElementById(u.id).getBoundingClientRect();r=Math.min(r,v.left-e.left),a=Math.max(a,v.right-e.left),o=Math.min(o,v.top-e.top),s=Math.max(s,v.bottom-e.top)});const l={left:r,top:o,width:a-r,height:s-o};let i=!1;n.forEach(u=>{u.left=u.left-r,u.top=u.top-o,u.groupStyle={...u.style,width:E(u.width/l.width),height:E(u.height/l.height),left:E(u.left/l.width),top:E(u.top/l.height),transform:`rotate(${u.angle||0}deg)`,position:"absolute"},u.angle&&(i=!0)});const h={id:_(),component:"es-group",group:!0,selected:!0,...l,equalProportion:i,props:{elements:n}};return[...t.filter(u=>!u.selected),h]}function qt(t,e){const n=t.find(s=>s.selected);if(!n||n.component!=="es-group")return t;const o=n.props.elements.map(s=>{const l=document.getElementById(s.id).getBoundingClientRect(),i={x:l.left-e.left+l.width/2,y:l.top-e.top+l.height/2},h=s.groupStyle,d=n.width*D(h.width),u=n.height*D(h.height),v={width:d,height:u,left:i.x-d/2,top:i.y-u/2,angle:(s.angle||0)+(n.angle||0)};return s.groupStyle={},{...s,...v}});return[...t.filter(s=>s!==n),...o]}function E(t){return t*100+"%"}function D(t){return parseFloat(t)/100}function Gt(t){return`${t}`.match(/^[0-9.-]+(px|%|rem|em|vh|vw)$/)?t:t+"px"}const Mt={width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},Ft=["id","width","height"],St=["d","stroke"],Ot=["id","width","height"],zt=["width","height","fill"],$t=["d","stroke"],At=["fill"],Et=W({__name:"GridRect",props:{grid:{type:Number,default:10},gridCount:{type:Number,default:5},showSmall:{type:Boolean,default:!0},borderColor:{type:String},smallGridId:String,gridId:String},setup(t){const e=X(),n=t,r=x(()=>n.smallGridId||_("smallGrid")),o=x(()=>n.gridId||_("grid")),a=x(()=>n.grid*n.gridCount),s=x(()=>{if(n.borderColor)return{bigGrid:n.borderColor,grid:kt(n.borderColor).fade(.5).rgb().string()};const i=[["#e4e7ed","#ebeef5"],["#414243","#363637"]],[h,d]=i[e.theme==="light"?0:1];return{bigGrid:h,grid:d}}),l=x(()=>({"--border-color":s.value.bigGrid}));return(i,h)=>(z(),$("div",{class:"grid-rect",style:Y(l.value)},[(z(),$("svg",Mt,[M("defs",null,[t.showSmall?(z(),$("pattern",{key:0,id:r.value,width:t.grid,height:t.grid,patternUnits:"userSpaceOnUse"},[M("path",{d:`M ${t.grid} 0 L 0 0 0 ${t.grid}`,fill:"none",stroke:s.value.grid,"stroke-width":"0.5"},null,8,St)],8,Ft)):U("",!0),M("pattern",{id:o.value,width:a.value,height:a.value,patternUnits:"userSpaceOnUse"},[t.showSmall?(z(),$("rect",{key:0,width:a.value,height:a.value,fill:`url(#${r.value})`},null,8,zt)):U("",!0),M("path",{d:`M ${a.value} 0 L 0 0 0 ${a.value}`,fill:"none",stroke:s.value.bigGrid,"stroke-width":"1"},null,8,$t)],8,Ot)]),M("rect",{width:"100%",height:"100%",fill:`url(#${o.value})`},null,8,At)]))],4))}}),Pt=Z(Et,[["__scopeId","data-v-06847876"]]);export{Pt as G,Gt as a,qt as c,Ct as d,Nt as m,_ as u};
