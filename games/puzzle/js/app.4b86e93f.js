(function(e){function t(t){for(var r,u,l=t[0],o=t[1],i=t[2],f=0,d=[];f<l.length;f++)u=l[f],Object.prototype.hasOwnProperty.call(c,u)&&c[u]&&d.push(c[u][0]),c[u]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);s&&s(t);while(d.length)d.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,l=1;l<n.length;l++){var o=n[l];0!==c[o]&&(r=!1)}r&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},c={app:0},a=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/games/puzzle/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var i=0;i<l.length;i++)t(l[i]);var s=o;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"04bd":function(e,t,n){},3178:function(e,t,n){},3555:function(e,t,n){"use strict";n("9304")},"3ba2":function(e,t,n){"use strict";n("04bd")},5284:function(e,t,n){"use strict";n("f827")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),c={class:"content_wrap"};function a(e,t,n,a,u,l){var o=Object(r["l"])("PuzzleGame");return Object(r["h"])(),Object(r["d"])("div",c,[Object(r["f"])(o)])}var u={class:"board_wrap"};function l(e,t,n,c,a,l){var o=Object(r["l"])("PuzzleHeader"),i=Object(r["l"])("PuzzleBoard"),s=Object(r["l"])("PuzzleFooter");return Object(r["h"])(),Object(r["d"])(r["a"],null,[Object(r["f"])(o,c.stat,null,16),Object(r["f"])("div",u,[Object(r["f"])(i,{ref:"board",puzzle:c.puzzle,onWrong:t[1]||(t[1]=function(e){return c.stat.wrong++}),onResolve:c.resolveHandler},null,8,["puzzle","onResolve"]),Object(r["f"])(s)])],64)}n("99af");var o={class:"board"},i={key:1,class:"grid_wrap"},s=Object(r["f"])("div",{class:"grid_default grid_empty"},null,-1);function f(e,t,n,c,a,u){var l=Object(r["l"])("PuzzleGrid"),f=Object(r["l"])("PuzzleCharsPanel");return Object(r["h"])(),Object(r["d"])(r["a"],null,[Object(r["f"])("div",o,[(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["k"])(e.matrix,(function(e,t){return Object(r["h"])(),Object(r["d"])(r["a"],{key:t},[(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["k"])(e,(function(e){return Object(r["h"])(),Object(r["d"])(r["a"],{key:e.id},[e?(Object(r["h"])(),Object(r["d"])(l,{key:0,data:e,onClick:function(t){return c.clickHandler(e)}},null,8,["data","onClick"])):(Object(r["h"])(),Object(r["d"])("div",i,[s]))],64)})),128))],64)})),128))]),Object(r["f"])(f,{chars:e.chars,used:e.charUsed,onCharClick:c.charClickHandler},null,8,["chars","used","onCharClick"])],64)}var d=n("5530"),b=n("2909");n("6062"),n("d3b7"),n("3ca3"),n("ddb0"),n("7db0"),n("159b"),n("4de4"),n("b64b"),n("2ef0");function h(e,t,n,c,a,u){return Object(r["h"])(),Object(r["d"])("div",{class:["grid_wrap",{shake:c.doShake,wave:c.doWave}],onAnimationEnd:t[1]||(t[1]=function(){return c.removeAni&&c.removeAni.apply(c,arguments)})},[Object(r["f"])("div",{class:["grid grid_default",c.getStyle()]},Object(r["m"])(c.showChar),3)],34)}var p={props:{data:Object},setup:function(e){var t=Object(r["b"])((function(){return e.data})),n=Object(r["b"])((function(){return t.value.type%4===0?t.value.char:t.value.filledChar}));function c(){var e={pending:1===t.value.type,selected:t.value.selected,rejected:3===t.value.type,resolved:4===t.value.type};return e}function a(){return 3===t.value.type?"shake":""}var u=Object(r["j"])(!1),l=Object(r["j"])(!1);function o(){u.value=!1,l.value=!1}return Object(r["o"])((function(){return t.value.type}),(function(e){3===e&&(u.value=!0)})),Object(r["o"])((function(){return t.value.delay}),(function(e,t){0===t&&setTimeout((function(){l.value=!0}),e)})),{showChar:n,getStyle:c,getWrapperStyle:a,doShake:u,doWave:l,removeAni:o}}};n("afc1"),n("f253");p.render=h;var v=p,j={class:"charsPanel"};function O(e,t,n,c,a,u){return Object(r["h"])(),Object(r["d"])("div",j,[(Object(r["h"])(!0),Object(r["d"])(r["a"],null,Object(r["k"])(n.chars,(function(e){return Object(r["h"])(),Object(r["d"])("div",{class:["charAns",{used:e in n.used}],key:e,onClick:function(t){return c.clickHandler(e)}},Object(r["m"])(e),11,["onClick"])})),128))])}var m={name:"PuzzleCharsPanel",props:["chars","used"],setup:function(e,t){Object(r["i"])(e.used);function n(e){t.emit("charClick",e)}return{clickHandler:n}}};n("a491");m.render=O;var z=m;function g(e){for(var t=[],n=0;n<e.length;n++){t.push(e[n]);var r=Math.random()*t.length|0;t[n]=t[r],t[r]=e[n]}return t}var y=0;function w(e){for(var t=e.matrix,n=e.chars,r=new Set(n),c=[],a=0,u=0;u<t.length;u++){var l=t[u];c[u]=Object(b["a"])(l);for(var o=0;o<l.length;o++){var i=l[o];if(i){var s={id:y++,char:i,filledChar:"",type:r.has(i)?1:0,selected:!1,index:9*u+o,delay:0};a||1!==s.type||(a=s.index,s.selected=!0),c[u][o]=s}}}return Object(d["a"])(Object(d["a"])({},e),{},{matrix:c,chars:g(n),firstEmptyIndex:a})}function x(e,t){var n=e.length;if(!(t<0||t/n>=n))return e[t/n|0][t%n]}function k(e,t){var n=e.length,r=[],c=[],a=t/n|0,u=t%n,l=a,o=u;while(o>0&&e[a][o-1])o--;do{r.push(e[a][o++])}while(o<n&&e[a][o]);while(l>0&&e[l-1][u])l--;do{c.push(e[l++][u])}while(l<n&&e[l][u]);return{row:r,col:c}}function C(e,t){var n=x(e,t);if(3===n.type)return n;for(var r=e.length,c=[-r,r,-1,1],a=[],u=null,l=1;l<=3;l++)for(var o=0;o<c.length;o++)if(0!==c[o]){var i=x(e,t+l*c[o]);i?a.push(i):c[o]=0}return(u=a.find((function(e){return 3===e.type})))||(u=a.find((function(e){return 1===e.type&&""===e.filledChar})))?u:P(e,t)}function P(e,t){console.log("开启BFS");var n=e.length,r=0,c=void 0,a=[t],u=new Set;while(a.length){r++;var l=a.shift();u.add(l);var o=x(e,l);if(o.type%4!==0){c=o;break}var i=0,s=Math.floor(l/n)*n,f=Math.ceil(l/n)*n-1;i=l-n,!u.has(i)&&x(e,i)&&a.push(i),i=l+n,!u.has(i)&&x(e,i)&&a.push(i),i=l-1,i>=s&&!u.has(i)&&x(e,i)&&a.push(i),i=l+1,i<=f&&!u.has(i)&&x(e,i)&&a.push(i)}return console.log("bfs次数："+r),c}var _={name:"PuzzleBoard",components:{PuzzleGrid:v,PuzzleCharsPanel:z},emits:["wrong","resolve"],props:["puzzle"],setup:function(e,t){var n=0,c=null,a=Object(r["i"])({matrix:[],chars:[],charUsed:{}});function u(e){c=w(e),a.matrix=c.matrix,a.chars=c.chars,a.charUsed={},n=c.firstEmptyIndex}function l(e){if(!e)return!1;x(a.matrix,n).selected=!1,e.selected=!0,n=e.index}function o(e){e.type%4!==0&&(e.type<4&&e.filledChar&&s(e.filledChar),l(e))}function i(e){var t=x(a.matrix,n);t.filledChar&&s(t.filledChar),a.charUsed[e]=t,t.filledChar=e,h(n)}function s(e){var t=a.charUsed[e];t.filledChar="",delete a.charUsed[e];var n=k(a.matrix,t.index),r=n.row,c=n.col;[].concat(Object(b["a"])(r),Object(b["a"])(c)).forEach((function(e){3===e.type&&(e.type=1)}))}function f(e){a.charUsed[e]||i(e)}function h(e){var n=k(a.matrix,e),r=n.row,c=n.col,u=!0;function l(e){if(e.length<4)return!1;if(e.some((function(e){return e.type%4!==0&&0===e.filledChar.length})))return!1;var n=e.filter((function(e){return e.type>0&&e.type<4}));if(n.some((function(e){return e.filledChar!==e.char})))n.forEach((function(e){e.type=3})),u&&(t.emit("wrong"),u=!1);else for(var r=function(t){e[t].type=4,e[t].selected=!1,e[t].delay=0,setTimeout((function(){e[t].delay=50*(t+1)}),0)},c=0;c<e.length;c++)r(c)}l(r),l(c),p(e)}function p(e){var n=C(a.matrix,e);n?l(n):(console.log("无下一空格"),Object.keys(a.charUsed).length===a.chars.length&&setTimeout((function(){t.emit("resolve")}),1e3))}return u(e.puzzle),Object(r["o"])((function(){return e.puzzle}),(function(e){u(e)})),Object(d["a"])(Object(d["a"])({},Object(r["n"])(a)),{},{clickHandler:o,charClickHandler:f})}};n("b499");_.render=f;var S=_,M={class:"header"},H={class:"content"},R={class:"sub_box residue"},U=Object(r["f"])("h5",null,"当前关卡",-1),A={class:"text"},G={class:"sub_box time"},T=Object(r["f"])("h5",null,"已用时",-1),B={class:"sub_box wrong"},E=Object(r["f"])("h5",null,"错误计数",-1),I={key:0},W={key:1},F=Object(r["f"])("small",null,"🔥",-1);function J(e,t,n,c,a,u){return Object(r["h"])(),Object(r["d"])("div",M,[Object(r["f"])("div",H,[Object(r["f"])("div",R,[U,Object(r["f"])("span",A,Object(r["m"])(n.puzzleResidue)+"/"+Object(r["m"])(n.puzzleCount),1)]),Object(r["f"])("div",G,[T,Object(r["f"])("span",null,Object(r["m"])(n.time)+"s",1)]),Object(r["f"])("div",B,[E,n.wrong<=n.wrongMax?(Object(r["h"])(),Object(r["d"])("span",I,Object(r["m"])(n.wrong)+"/"+Object(r["m"])(n.wrongMax),1)):(Object(r["h"])(),Object(r["d"])("span",W,[Object(r["e"])(Object(r["m"])(n.wrong)+"/",1),F]))])])])}var V={props:["time","wrong","wrongMax","puzzleResidue","puzzleCount"],setup:function(){}};n("3ba2");V.render=J;var q=V,D={class:"footer"},K=Object(r["f"])("div",{class:"footer_title"},"ABOUT",-1),L=Object(r["f"])("div",{class:"footer_box"},[Object(r["f"])("p",null,[Object(r["e"])(" Github："),Object(r["f"])("a",{href:"https://github.com/Riteam/puzzle",target:"_blank"},"github.com/Riteam/puzzle")]),Object(r["f"])("p",null,"核心功能展示；基于Vue3重构。")],-1);function N(e,t,n,c,a,u){return Object(r["h"])(),Object(r["d"])("div",D,[K,L])}var Q={};n("969e");Q.render=N;var X=Q,Y={matrix:[["","","","","","","","",""],["","","不","一","而","足","","",""],["","","负","","","智","","",""],["","","众","","","多","","遗",""],["喜","出","望","外","","谋","财","害","命"],["","人","","","春","","","无",""],["","头","","","回","味","无","穷",""],["","地","","","大","","","",""],["","","","","地","","","",""]],chars:["出","望","头","不","足","谋","害","穷","回","大"]},Z={matrix:[["","","","","","","","",""],["","","厚","积","薄","发","","","先"],["","","","土","","财","","","礼"],["","","","成","","致","","","后"],["重","于","泰","山","","富","国","强","兵"],["","","然","","","","","词",""],["","","处","","","","","夺",""],["","","之","","蛮","横","无","理",""],["","","","","","","","",""]],chars:["厚","然","兵","夺","成","薄","理","富","泰","致","礼","横","山"]},$={matrix:[["","","","","","","","低",""],["","","无","","郎","","","吟",""],["","","地","","才","疏","学","浅",""],["","","自","","女","","","唱",""],["","花","容","月","貌","","","",""],["","言","","明","","","尺","",""],["","巧","","星","罗","棋","布","",""],["","语","","稀","","","斗","",""],["","","","","","","粟","",""]],chars:["花","容","月","貌","星","无","才","布","浅","吟","稀","罗","巧","斗"]},ee=[Y,Z,$],te={name:"PuzzleGame",components:{PuzzleBoard:S,PuzzleHeader:q,PuzzleFooter:X},setup:function(){var e=Object(r["j"])(ee[0]),t=Object(r["i"])({wrong:0,wrongMax:3,time:0,puzzleResidue:1,puzzleCount:ee.length}),n=setInterval((function(){t.time++}),1e3);function c(){3===t.puzzleResidue?(alert("恭喜过关\n用时 ".concat(t.time," 秒\n错误 ").concat(t.wrong," 次")),clearInterval(n)):(e.value=ee[t.puzzleResidue],t.puzzleResidue++)}return Object(r["g"])((function(){clearInterval(n),console.log("game unmount")})),{puzzle:e,stat:t,resolveHandler:c}}};n("5284");te.render=l;var ne=te,re={name:"App",components:{PuzzleGame:ne}};n("3555");re.render=a;var ce=re;Object(r["c"])(ce).mount("#app")},"921c":function(e,t,n){},9304:function(e,t,n){},9556:function(e,t,n){},"969e":function(e,t,n){"use strict";n("9556")},a207:function(e,t,n){},a491:function(e,t,n){"use strict";n("a207")},afc1:function(e,t,n){"use strict";n("3178")},b499:function(e,t,n){"use strict";n("e714")},e714:function(e,t,n){},f253:function(e,t,n){"use strict";n("921c")},f827:function(e,t,n){}});
//# sourceMappingURL=app.4b86e93f.js.map