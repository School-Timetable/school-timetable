function b(){}const G=t=>t;function $t(t,e){for(const n in e)t[n]=e[n];return t}function rt(t){return t()}function it(){return Object.create(null)}function C(t){t.forEach(rt)}function M(t){return typeof t=="function"}function Jt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function bt(t){return Object.keys(t).length===0}function ot(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Kt(t){let e;return ot(t,n=>e=n)(),e}function Qt(t,e,n){t.$$.on_destroy.push(ot(e,n))}function Ut(t,e,n,i){if(t){const s=ct(t,e,n,i);return t[0](s)}}function ct(t,e,n,i){return t[1]&&i?$t(n.ctx.slice(),t[1](i(e))):n.ctx}function Vt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const a=[],r=Math.max(e.dirty.length,s.length);for(let o=0;o<r;o+=1)a[o]=e.dirty[o]|s[o];return a}return e.dirty|s}return e.dirty}function Xt(t,e,n,i,s,a){if(s){const r=ct(e,n,i,a);t.p(r,s)}}function Yt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Zt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function te(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function ee(t){const e={};for(const n in t)e[n]=!0;return e}function ne(t){return t&&M(t.destroy)?t.destroy:b}const at=typeof window<"u";let J=at?()=>window.performance.now():()=>Date.now(),Z=at?t=>requestAnimationFrame(t):b;const j=new Set;function lt(t){j.forEach(e=>{e.c(t)||(j.delete(e),e.f())}),j.size!==0&&Z(lt)}function K(t){let e;return j.size===0&&Z(lt),{promise:new Promise(n=>{j.add(e={c:t,f:n})}),abort(){j.delete(e)}}}const ie=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let Q=!1;function xt(){Q=!0}function wt(){Q=!1}function vt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function kt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let l=0;l<e.length;l++){const f=e[l];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const l=e[c].claim_order,f=(s>0&&e[n[s]].claim_order<=l?s+1:vt(1,s,h=>e[n[h]].claim_order,l))-1;i[c]=n[f]+1;const _=f+1;n[_]=c,s=Math.max(_,s)}const a=[],r=[];let o=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(a.push(e[c-1]);o>=c;o--)r.push(e[o]);o--}for(;o>=0;o--)r.push(e[o]);a.reverse(),r.sort((c,l)=>c.claim_order-l.claim_order);for(let c=0,l=0;c<r.length;c++){for(;l<a.length&&r[c].claim_order>=a[l].claim_order;)l++;const f=l<a.length?a[l]:null;t.insertBefore(r[c],f)}}function Et(t,e){t.appendChild(e)}function ut(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Ct(t){const e=_t("style");return Nt(ut(t),e),e.sheet}function Nt(t,e){return Et(t.head||t,e),e.sheet}function St(t,e){if(Q){for(kt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function se(t,e,n){Q&&!n?St(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ft(t){t.parentNode&&t.parentNode.removeChild(t)}function re(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _t(t){return document.createElement(t)}function tt(t){return document.createTextNode(t)}function oe(){return tt(" ")}function ce(){return tt("")}function ae(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function le(t){return function(e){return e.preventDefault(),t.call(this,e)}}function ue(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function fe(t){return function(e){e.target===this&&t.call(this,e)}}function At(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const jt=["width","height"];function _e(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&jt.indexOf(i)===-1?t[i]=e[i]:At(t,i,e[i])}function de(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function he(t){return t===""?null:+t}function Dt(t){return Array.from(t.childNodes)}function Ot(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function dt(t,e,n,i,s=!1){Ot(t);const a=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),o}}for(let r=t.claim_info.last_index-1;r>=0;r--){const o=t[r];if(e(o)){const c=n(o);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,o}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function Mt(t,e,n,i){return dt(t,s=>s.nodeName===e,s=>{const a=[];for(let r=0;r<s.attributes.length;r++){const o=s.attributes[r];n[o.name]||a.push(o.name)}a.forEach(r=>s.removeAttribute(r))},()=>i(e))}function pe(t,e,n){return Mt(t,e,n,_t)}function Tt(t,e){return dt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>tt(e),!0)}function me(t){return Tt(t," ")}function ye(t,e){e=""+e,t.data!==e&&(t.data=e)}function ge(t,e){t.value=e??""}function $e(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function be(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function xe(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];i.selected=~e.indexOf(i.__value)}}function we(t){const e=t.querySelector(":checked");return e&&e.__value}function ve(t,e,n){t.classList[n?"add":"remove"](e)}function ht(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}function ke(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const a=s.textContent.trim();a===`HEAD_${t}_END`?(i-=1,n.push(s)):a===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}function Ee(t,e){return new t(e)}const I=new Map;let W=0;function Pt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Rt(t,e){const n={stylesheet:Ct(e),rules:{}};return I.set(t,n),n}function B(t,e,n,i,s,a,r,o=0){const c=16.666/i;let l=`{
`;for(let p=0;p<=1;p+=c){const y=e+(n-e)*a(p);l+=p*100+`%{${r(y,1-y)}}
`}const f=l+`100% {${r(n,1-n)}}
}`,_=`__svelte_${Pt(f)}_${o}`,h=ut(t),{stylesheet:u,rules:d}=I.get(h)||Rt(h,t);d[_]||(d[_]=!0,u.insertRule(`@keyframes ${_} ${f}`,u.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${_} ${i}ms linear ${s}ms 1 both`,W+=1,_}function L(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?a=>a.indexOf(e)<0:a=>a.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),W-=s,W||Bt())}function Bt(){Z(()=>{W||(I.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&ft(e)}),I.clear())})}function Ce(t,e,n,i){if(!e)return b;const s=t.getBoundingClientRect();if(e.left===s.left&&e.right===s.right&&e.top===s.top&&e.bottom===s.bottom)return b;const{delay:a=0,duration:r=300,easing:o=G,start:c=J()+a,end:l=c+r,tick:f=b,css:_}=n(t,{from:e,to:s},i);let h=!0,u=!1,d;function m(){_&&(d=B(t,0,1,r,a,o,_)),a||(u=!0)}function p(){_&&L(t,d),h=!1}return K(y=>{if(!u&&y>=c&&(u=!0),u&&y>=l&&(f(1,0),p()),!h)return!1;if(u){const x=y-c,$=0+1*o(x/r);f($,1-$)}return!0}),m(),f(0,1),p}function Ne(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:i}=e,s=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=i,Lt(t,s)}}function Lt(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const i=getComputedStyle(t),s=i.transform==="none"?"":i.transform;t.style.transform=`${s} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let q;function R(t){q=t}function T(){if(!q)throw new Error("Function called outside component initialization");return q}function Se(t){T().$$.on_mount.push(t)}function Ae(t){T().$$.after_update.push(t)}function je(t){T().$$.on_destroy.push(t)}function De(){const t=T();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const a=ht(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,a)}),!a.defaultPrevented}return!0}}function Oe(t,e){return T().$$.context.set(t,e),e}function Me(t){return T().$$.context.get(t)}function Te(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const A=[],st=[];let D=[];const X=[],pt=Promise.resolve();let Y=!1;function mt(){Y||(Y=!0,pt.then(yt))}function Pe(){return mt(),pt}function O(t){D.push(t)}function Re(t){X.push(t)}const V=new Set;let S=0;function yt(){if(S!==0)return;const t=q;do{try{for(;S<A.length;){const e=A[S];S++,R(e),qt(e.$$)}}catch(e){throw A.length=0,S=0,e}for(R(null),A.length=0,S=0;st.length;)st.pop()();for(let e=0;e<D.length;e+=1){const n=D[e];V.has(n)||(V.add(n),n())}D.length=0}while(A.length);for(;X.length;)X.pop()();Y=!1,V.clear(),R(t)}function qt(t){if(t.fragment!==null){t.update(),C(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}function zt(t){const e=[],n=[];D.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),D=e}let P;function et(){return P||(P=Promise.resolve(),P.then(()=>{P=null})),P}function N(t,e,n){t.dispatchEvent(ht(`${e?"intro":"outro"}${n}`))}const F=new Set;let E;function Be(){E={r:0,c:[],p:E}}function Le(){E.r||C(E.c),E=E.p}function gt(t,e){t&&t.i&&(F.delete(t),t.i(e))}function Ht(t,e,n,i){if(t&&t.o){if(F.has(t))return;F.add(t),E.c.push(()=>{F.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const nt={duration:0};function qe(t,e,n){const i={direction:"in"};let s=e(t,n,i),a=!1,r,o,c=0;function l(){r&&L(t,r)}function f(){const{delay:h=0,duration:u=300,easing:d=G,tick:m=b,css:p}=s||nt;p&&(r=B(t,0,1,u,h,d,p,c++)),m(0,1);const y=J()+h,x=y+u;o&&o.abort(),a=!0,O(()=>N(t,!0,"start")),o=K($=>{if(a){if($>=x)return m(1,0),N(t,!0,"end"),l(),a=!1;if($>=y){const w=d(($-y)/u);m(w,1-w)}}return a})}let _=!1;return{start(){_||(_=!0,L(t),M(s)?(s=s(i),et().then(f)):f())},invalidate(){_=!1},end(){a&&(l(),a=!1)}}}function ze(t,e,n){const i={direction:"out"};let s=e(t,n,i),a=!0,r;const o=E;o.r+=1;function c(){const{delay:l=0,duration:f=300,easing:_=G,tick:h=b,css:u}=s||nt;u&&(r=B(t,1,0,f,l,_,u));const d=J()+l,m=d+f;O(()=>N(t,!1,"start")),K(p=>{if(a){if(p>=m)return h(0,1),N(t,!1,"end"),--o.r||C(o.c),!1;if(p>=d){const y=_((p-d)/f);h(1-y,y)}}return a})}return M(s)?et().then(()=>{s=s(i),c()}):c(),{end(l){l&&s.tick&&s.tick(1,0),a&&(r&&L(t,r),a=!1)}}}function He(t,e,n,i){const s={direction:"both"};let a=e(t,n,s),r=i?0:1,o=null,c=null,l=null;function f(){l&&L(t,l)}function _(u,d){const m=u.b-r;return d*=Math.abs(m),{a:r,b:u.b,d:m,duration:d,start:u.start,end:u.start+d,group:u.group}}function h(u){const{delay:d=0,duration:m=300,easing:p=G,tick:y=b,css:x}=a||nt,$={start:J()+d,b:u};u||($.group=E,E.r+=1),o||c?c=$:(x&&(f(),l=B(t,r,u,m,d,p,x)),u&&y(0,1),o=_($,m),O(()=>N(t,u,"start")),K(w=>{if(c&&w>c.start&&(o=_(c,m),c=null,N(t,o.b,"start"),x&&(f(),l=B(t,r,o.b,o.duration,0,p,a.css))),o){if(w>=o.end)y(r=o.b,1-r),N(t,o.b,"end"),c||(o.b?f():--o.group.r||C(o.group.c)),o=null;else if(w>=o.start){const z=w-o.start;r=o.a+o.d*p(z/o.duration),y(r,1-r)}}return!!(o||c)}))}return{run(u){M(a)?et().then(()=>{a=a(s),h(u)}):h(u)},end(){f(),o=c=null}}}function Ft(t,e){Ht(t,1,1,()=>{e.delete(t.key)})}function Fe(t,e){t.f(),Ft(t,e)}function Ie(t,e,n,i,s,a,r,o,c,l,f,_){let h=t.length,u=a.length,d=h;const m={};for(;d--;)m[t[d].key]=d;const p=[],y=new Map,x=new Map,$=[];for(d=u;d--;){const g=_(s,a,d),v=n(g);let k=r.get(v);k?i&&$.push(()=>k.p(g,e)):(k=l(v,g),k.c()),y.set(v,p[d]=k),v in m&&x.set(v,Math.abs(d-m[v]))}const w=new Set,z=new Set;function U(g){gt(g,1),g.m(o,f),r.set(g.key,g),f=g.first,u--}for(;h&&u;){const g=p[u-1],v=t[h-1],k=g.key,H=v.key;g===v?(f=g.first,h--,u--):y.has(H)?!r.has(k)||w.has(k)?U(g):z.has(H)?h--:x.get(k)>x.get(H)?(z.add(k),U(g)):(w.add(H),h--):(c(v,r),h--)}for(;h--;){const g=t[h];y.has(g.key)||c(g,r)}for(;u;)U(p[u-1]);return C($),p}function We(t,e){const n={},i={},s={$$scope:1};let a=t.length;for(;a--;){const r=t[a],o=e[a];if(o){for(const c in r)c in o||(i[c]=1);for(const c in o)s[c]||(n[c]=o[c],s[c]=1);t[a]=o}else for(const c in r)s[c]=1}for(const r in i)r in n||(n[r]=void 0);return n}function Ge(t){return typeof t=="object"&&t!==null?t:{}}function Je(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Ke(t){t&&t.c()}function Qe(t,e){t&&t.l(e)}function It(t,e,n,i){const{fragment:s,after_update:a}=t.$$;s&&s.m(e,n),i||O(()=>{const r=t.$$.on_mount.map(rt).filter(M);t.$$.on_destroy?t.$$.on_destroy.push(...r):C(r),t.$$.on_mount=[]}),a.forEach(O)}function Wt(t,e){const n=t.$$;n.fragment!==null&&(zt(n.after_update),C(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Gt(t,e){t.$$.dirty[0]===-1&&(A.push(t),mt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ue(t,e,n,i,s,a,r,o=[-1]){const c=q;R(t);const l=t.$$={fragment:null,ctx:[],props:a,update:b,not_equal:s,bound:it(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:it(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};r&&r(l.root);let f=!1;if(l.ctx=n?n(t,e.props||{},(_,h,...u)=>{const d=u.length?u[0]:h;return l.ctx&&s(l.ctx[_],l.ctx[_]=d)&&(!l.skip_bound&&l.bound[_]&&l.bound[_](d),f&&Gt(t,_)),h}):[],l.update(),f=!0,C(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){xt();const _=Dt(e.target);l.fragment&&l.fragment.l(_),_.forEach(ft)}else l.fragment&&l.fragment.c();e.intro&&gt(t.$$.fragment),It(t,e.target,e.anchor,e.customElement),wt(),yt()}R(c)}class Ve{$destroy(){Wt(this,1),this.$destroy=b}$on(e,n){if(!M(n))return b;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!bt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{G as $,It as A,Wt as B,te as C,Oe as D,Me as E,je as F,$t as G,Zt as H,Ut as I,_e as J,Xt as K,Yt as L,Vt as M,We as N,Ge as O,Te as P,Qt as Q,ae as R,Ve as S,C as T,ne as U,M as V,St as W,ke as X,b as Y,ie as Z,re as _,oe as a,ee as a0,O as a1,He as a2,de as a3,he as a4,we as a5,xe as a6,be as a7,ge as a8,Je as a9,Re as aa,qe as ab,ze as ac,De as ad,ve as ae,Kt as af,Ie as ag,Ne as ah,Ce as ai,Fe as aj,ue as ak,fe as al,le as am,se as b,me as c,Ht as d,ce as e,Le as f,gt as g,ft as h,Ue as i,Ae as j,_t as k,pe as l,Dt as m,At as n,Se as o,$e as p,tt as q,Tt as r,Jt as s,Pe as t,ye as u,Be as v,st as w,Ee as x,Ke as y,Qe as z};