import{S as N,i as S,s as w,k as _,q as y,l as $,m as b,r as C,h,b as D,W as c,R as M,Y as O,a as v,c as T,n as x,u as V,y as L,z as A,A as I,g as k,d as B,B as F}from"../chunks/index.6f3fdfc3.js";function z(){{let i=[],e=localStorage.getItem("data.tdf")||"",n=localStorage.getItem("timetable.tdf")||"";return i.push(e),i.push(n),i}}function X(i,e){i!=""&&e!=""&&(localStorage.setItem("data.tdf",i),localStorage.setItem("timetable.tdf",e))}function j(i,e){const n=/([A-Z]{1}\:(.*\;)+.*\n*)/;try{i=atob(i),e=atob(e);const l=n.test(i),a=n.test(e);return console.log(l,a),l&&a}catch{return!1}}function H(i){let e,n,l,a;return{c(){e=_("button"),n=y("Premi per il download")},l(t){e=$(t,"BUTTON",{});var o=b(e);n=C(o,"Premi per il download"),o.forEach(h)},m(t,o){D(t,e,o),c(e,n),l||(a=M(e,"click",i[0]),l=!0)},p:O,i:O,o:O,d(t){t&&h(e),l=!1,a()}}}function W(i){function e(){const l=z().join(`
`),a=new Blob([l],{type:"text/plain;charset=utf-8"}),t=URL.createObjectURL(a),o=document.createElement("a");o.href=t,o.download="data.txt",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(t)}return[e]}class q extends N{constructor(e){super(),S(this,e,W,H,w,{})}}function R(i){let e,n,l=i[0].name+"",a;return{c(){e=_("p"),n=y("File selezionato: "),a=y(l)},l(t){e=$(t,"P",{});var o=b(e);n=C(o,"File selezionato: "),a=C(o,l),o.forEach(h)},m(t,o){D(t,e,o),c(e,n),c(e,a)},p(t,o){o&1&&l!==(l=t[0].name+"")&&V(a,l)},d(t){t&&h(e)}}}function Y(i){let e,n,l,a,t,o,g,u,r=i[0]&&R(i);return{c(){e=_("div"),n=_("label"),l=y("Upload del tuo ambiente di lavoro:"),a=v(),t=_("input"),o=v(),r&&r.c(),this.h()},l(d){e=$(d,"DIV",{});var s=b(e);n=$(s,"LABEL",{for:!0});var m=b(n);l=C(m,"Upload del tuo ambiente di lavoro:"),m.forEach(h),a=T(s),t=$(s,"INPUT",{type:!0,id:!0,accept:!0}),o=T(s),r&&r.l(s),s.forEach(h),this.h()},h(){x(n,"for","txtFile"),x(t,"type","file"),x(t,"id","txtFile"),x(t,"accept",".txt")},m(d,s){D(d,e,s),c(e,n),c(n,l),c(e,a),c(e,t),c(e,o),r&&r.m(e,null),g||(u=M(t,"change",i[1]),g=!0)},p(d,[s]){d[0]?r?r.p(d,s):(r=R(d),r.c(),r.m(e,null)):r&&(r.d(1),r=null)},i:O,o:O,d(d){d&&h(e),r&&r.d(),g=!1,u()}}}function Z(i,e,n){let l=null,a=[];function t(o){const g=o.target,u=g.files&&g.files[0];if(u&&u.type==="text/plain"){n(0,l=u);const r=new FileReader;r.onload=d=>{try{a=d.target.result.trim().split(`
`),a.length!==2?(console.error("Il file TXT deve contenere esattamente due righe."),a=[]):(console.log("Contenuto del file:",a),j(a[0],a[1])?X(a[0],a[1]):alert("le due stringhe non sono valide"))}catch(s){console.error("Errore durante la lettura del file TXT:",s)}},r.readAsText(u)}else n(0,l=null),console.log("Seleziona un file TXT valido.")}return[l,t]}class G extends N{constructor(e){super(),S(this,e,Z,Y,w,{})}}function J(i){let e,n,l,a,t,o,g,u,r,d,s,m,E;return t=new q({}),m=new G({}),{c(){e=_("main"),n=_("h1"),l=y("DOWNLOAD COMPONENT"),a=v(),L(t.$$.fragment),o=v(),g=_("hr"),u=v(),r=_("h1"),d=y("UPLOAD COMPONENT"),s=v(),L(m.$$.fragment)},l(p){e=$(p,"MAIN",{});var f=b(e);n=$(f,"H1",{});var P=b(n);l=C(P,"DOWNLOAD COMPONENT"),P.forEach(h),a=T(f),A(t.$$.fragment,f),o=T(f),g=$(f,"HR",{}),u=T(f),r=$(f,"H1",{});var U=b(r);d=C(U,"UPLOAD COMPONENT"),U.forEach(h),s=T(f),A(m.$$.fragment,f),f.forEach(h)},m(p,f){D(p,e,f),c(e,n),c(n,l),c(e,a),I(t,e,null),c(e,o),c(e,g),c(e,u),c(e,r),c(r,d),c(e,s),I(m,e,null),E=!0},p:O,i(p){E||(k(t.$$.fragment,p),k(m.$$.fragment,p),E=!0)},o(p){B(t.$$.fragment,p),B(m.$$.fragment,p),E=!1},d(p){p&&h(e),F(t),F(m)}}}class Q extends N{constructor(e){super(),S(this,e,null,J,w,{})}}export{Q as component};
