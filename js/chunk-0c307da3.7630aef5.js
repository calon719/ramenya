(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c307da3"],{1276:function(e,t,n){"use strict";var r=n("2ba4"),c=n("c65b"),i=n("e330"),o=n("d784"),a=n("44e7"),s=n("825a"),l=n("1d80"),u=n("4840"),d=n("8aa5"),p=n("50c4"),h=n("577e"),f=n("dc4a"),b=n("4dae"),v=n("14c3"),m=n("9263"),g=n("9f7f"),j=n("d039"),O=g.UNSUPPORTED_Y,y=4294967295,E=Math.min,N=[].push,x=i(/./.exec),k=i(N),z=i("".slice),V=!j((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));o("split",(function(e,t,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var i=h(l(this)),o=void 0===n?y:n>>>0;if(0===o)return[];if(void 0===e)return[i];if(!a(e))return c(t,i,e,o);var s,u,d,p=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),v=0,g=new RegExp(e.source,f+"g");while(s=c(m,g,i)){if(u=g.lastIndex,u>v&&(k(p,z(i,v,s.index)),s.length>1&&s.index<i.length&&r(N,p,b(s,1)),d=s[0].length,v=u,p.length>=o))break;g.lastIndex===s.index&&g.lastIndex++}return v===i.length?!d&&x(g,"")||k(p,""):k(p,z(i,v)),p.length>o?b(p,0,o):p}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:c(t,this,e,n)}:t,[function(t,n){var r=l(this),o=void 0==t?void 0:f(t,e);return o?c(o,t,r,n):c(i,h(r),t,n)},function(e,r){var c=s(this),o=h(e),a=n(i,c,o,r,i!==t);if(a.done)return a.value;var l=u(c,RegExp),f=c.unicode,b=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(O?"g":"y"),m=new l(O?"^(?:"+c.source+")":c,b),g=void 0===r?y:r>>>0;if(0===g)return[];if(0===o.length)return null===v(m,o)?[o]:[];var j=0,N=0,x=[];while(N<o.length){m.lastIndex=O?0:N;var V,w=v(m,O?z(o,N):o);if(null===w||(V=E(p(m.lastIndex+(O?N:0)),o.length))===j)N=d(o,N,f);else{if(k(x,z(o,j,N)),x.length===g)return x;for(var C=1;C<=w.length-1;C++)if(k(x,w[C]),x.length===g)return x;N=j=V}}return k(x,z(o,j)),x}]}),!V,O)},"14c3":function(e,t,n){var r=n("da84"),c=n("c65b"),i=n("825a"),o=n("1626"),a=n("c6b6"),s=n("9263"),l=r.TypeError;e.exports=function(e,t){var n=e.exec;if(o(n)){var r=c(n,e,t);return null!==r&&i(r),r}if("RegExp"===a(e))return c(s,e,t);throw l("RegExp#exec called on incompatible receiver")}},"159b":function(e,t,n){var r=n("da84"),c=n("fdbc"),i=n("785a"),o=n("17c2"),a=n("9112"),s=function(e){if(e&&e.forEach!==o)try{a(e,"forEach",o)}catch(t){e.forEach=o}};for(var l in c)c[l]&&s(r[l]&&r[l].prototype);s(i)},"17c2":function(e,t,n){"use strict";var r=n("b727").forEach,c=n("a640"),i=c("forEach");e.exports=i?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},2803:function(e,t,n){},"344f":function(e,t,n){"use strict";n("2803")},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},a15b:function(e,t,n){"use strict";var r=n("23e7"),c=n("e330"),i=n("44ad"),o=n("fc6a"),a=n("a640"),s=c([].join),l=i!=Object,u=a("join",",");r({target:"Array",proto:!0,forced:l||!u},{join:function(e){return s(o(this),void 0===e?",":e)}})},a640:function(e,t,n){"use strict";var r=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&r((function(){n.call(null,t||function(){return 1},1)}))}},b5fd:function(e,t,n){"use strict";n.r(t);n("ac1f"),n("1276");var r=n("7a23"),c={class:"anniversary footer-bottom"},i=Object(r["createElementVNode"])("header",{class:"banner"},[Object(r["createElementVNode"])("h2",{class:"banner-title fs-1"},"歡慶一週年")],-1),o={class:"content container"},a=Object(r["createElementVNode"])("p",{class:"content-text text-center fs-4"},"慶祝拉麵屋一週年，只要在活動期間參加幸運大轉盤活動， 就有機會抽中最高打 5 折優惠券，快來試試你的好手氣吧！",-1),s={class:"row g-3 g-md-5 justify-content-center"},l={class:"col-12 col-md-7 d-flex justify-content-center order-2 order-md-1"},u={class:"col-12 col-md-5 order-1 order-md-2"},d={class:"fs-4 mt-5 me-3"},p=Object(r["createTextVNode"])("你所抽中的獎項是： "),h=Object(r["createElementVNode"])("br",null,null,-1),f=Object(r["createElementVNode"])("br",null,null,-1),b=Object(r["createTextVNode"])("馬上使用"),v=Object(r["createTextVNode"])("馬上購物");function m(e,t,n,m,g,j){var O=Object(r["resolveComponent"])("CartDropdown"),y=Object(r["resolveComponent"])("LuckyWheel"),E=Object(r["resolveComponent"])("RouterLink");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",c,[Object(r["createVNode"])(O),i,Object(r["createElementVNode"])("div",o,[a,Object(r["createElementVNode"])("div",s,[Object(r["createElementVNode"])("div",l,[Object(r["createVNode"])(y,{onGetPrize:j.getPrize},null,8,["onGetPrize"])]),Object(r["createElementVNode"])("div",u,[Object(r["createElementVNode"])("p",d,[p,h,Object(r["createElementVNode"])("span",{class:Object(r["normalizeClass"])([{invisible:!g.prize.split("").length},"fs-2 text-danger text-nowrap"])},[Object(r["createTextVNode"])(Object(r["toDisplayString"])(j.prizeName)+" 折優惠券 ",1),f,Object(r["createTextVNode"])(" 優惠券號碼："+Object(r["toDisplayString"])(g.prize),1)],2)]),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(["mt-auto text-nowrap mb-4 text-center text-md-start",{invisible:!g.prize.split("").length}])},[j.carts.length?(Object(r["openBlock"])(),Object(r["createBlock"])(E,{key:0,to:"/cart",class:"btn btn-primary"},{default:Object(r["withCtx"])((function(){return[b]})),_:1})):(Object(r["openBlock"])(),Object(r["createBlock"])(E,{key:1,to:{path:"/products",query:{category:"全部"}},class:"btn btn-primary"},{default:Object(r["withCtx"])((function(){return[v]})),_:1}))],2)])])])])}n("a434"),n("a15b"),n("99af");var g=function(e){return Object(r["pushScopeId"])("data-v-9a13534c"),e=e(),Object(r["popScopeId"])(),e},j={class:"luckyWheel"},O={class:"luckyWheel-indicator"},y={class:"luckyWheel-indicator-wrap"},E=g((function(){return Object(r["createElementVNode"])("div",{class:"luckyWheel-indicator-shadow"},null,-1)})),N=g((function(){return Object(r["createElementVNode"])("div",{class:"luckyWheel-inner-shadow"},null,-1)})),x={class:"luckyWheel-sector-text"};function k(e,t,n,c,i,o){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",j,[Object(r["createElementVNode"])("div",O,[Object(r["createElementVNode"])("div",y,[E,Object(r["createElementVNode"])("button",{class:"luckyWheel-btn",type:"button",onClick:t[0]||(t[0]=function(){return o.drawLottery&&o.drawLottery.apply(o,arguments)})},"抽獎")])]),Object(r["createElementVNode"])("div",{class:"luckyWheel-inner",style:Object(r["normalizeStyle"])("transition: ".concat(i.transitionTime,"s"))},[N,(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(i.prizes,(function(e,t){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"luckyWheel-sector",key:e,style:Object(r["normalizeStyle"])("transform: ".concat(o.drawFans(t),"; background-color: ").concat(o.drawBgColor(t),";"))},[Object(r["createElementVNode"])("p",x,Object(r["toDisplayString"])(i.prizesName[t]),1)],4)})),128))],4)])}var z=n("2909"),V=(n("d3b7"),n("159b"),n("d81d"),{data:function(){return{innerEl:{},prizesEl:[],prize:"",prizes:["1stANNIV90","1stANNIV85","1stANNIV80","1stANNIV75","1stANNIV65","1stANNIV50"],prizesName:[],transitionTime:6,rotateTimes:5,deg:0,stopDeg:0,isClicked:!1,bgColors:["#16a085","#2980b9","#34495e","#f39c12","#d35400","#c0392b"]}},methods:{drawFans:function(e){this.deg=360/this.prizes.length;var t=-this.deg/2,n=this.deg-90;return"rotate(".concat(t+this.deg*e,"deg) skewY(").concat(n,"deg)")},drawBgColor:function(e){var t="";if(this.bgColors[e])t=this.bgColors[e];else{var n=this.bgColors.length;t=this.bgColors[e-n]}return t},drawLottery:function(){var e=this;if(!this.isClicked){this.prize="",this.$emit("getPrize",this.prize),this.isClicked=!0;var t=Math.floor(Math.random()*this.prizes.length);this.prize=this.prizes[t];var n=360*this.rotateTimes+t*this.deg;n-=this.stopDeg%360,this.stopDeg+=n,this.innerEl.style.transform="rotate(".concat(-this.stopDeg,"deg)"),this.prizesEl.forEach((function(e){e.classList.remove("active")})),setTimeout((function(){e.$emit("getPrize",e.prize),localStorage.setItem("coupon",e.prize),e.prizesEl[t].classList.add("active"),e.isClicked=!1}),1e3*this.transitionTime)}}},mounted:function(){this.innerEl=document.querySelector(".luckyWheel-inner"),this.prizesEl=document.querySelectorAll(".luckyWheel-sector"),this.prizesEl=Object(z["a"])(this.prizesEl),this.prizesName=this.prizes.map((function(e){var t=e;t=e.split("");var n=t.length;return t=t[n-1]>0?t.splice(-2,2):t.splice(-2,1),"".concat(t.join("")," 折")}))}}),w=(n("344f"),n("d959")),C=n.n(w);const I=C()(V,[["render",k],["__scopeId","data-v-9a13534c"]]);var B=I,T={data:function(){return{prize:""}},computed:{carts:function(){return this.$store.state.cartList.carts},prizeName:function(){var e=this.prize.split(""),t=e.length;return e=e[t-1]>0?e.splice(-2,2):e.splice(-2,1),e.join("")}},methods:{getPrize:function(e){this.prize=e},getCarts:function(e){this.carts=e}},components:{LuckyWheel:B}};const W=C()(T,[["render",m]]);t["default"]=W},d784:function(e,t,n){"use strict";n("ac1f");var r=n("e330"),c=n("6eeb"),i=n("9263"),o=n("d039"),a=n("b622"),s=n("9112"),l=a("species"),u=RegExp.prototype;e.exports=function(e,t,n,d){var p=a(e),h=!o((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),f=h&&!o((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[l]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return t=!0,null},n[p](""),!t}));if(!h||!f||n){var b=r(/./[p]),v=t(p,""[e],(function(e,t,n,c,o){var a=r(e),s=t.exec;return s===i||s===u.exec?h&&!o?{done:!0,value:b(t,n,c)}:{done:!0,value:a(n,t,c)}:{done:!1}}));c(String.prototype,e,v[0]),c(u,p,v[1])}d&&s(u[p],"sham",!0)}},d81d:function(e,t,n){"use strict";var r=n("23e7"),c=n("b727").map,i=n("1dde"),o=i("map");r({target:"Array",proto:!0,forced:!o},{map:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-0c307da3.7630aef5.js.map