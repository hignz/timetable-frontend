!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports={getPlural:e=>e>1?"s":"",isToday:e=>(new Date).getDay()-1===e,isClassNow:(e,t,n)=>new Date(`01/01/1990 ${n}`)>=new Date(`01/01/1990 ${e}`)&&new Date(`01/01/1990 ${n}`)<=new Date(`01/01/1990 ${t}`),isClassApporaching:(e,t)=>{const n=Math.floor((Date.parse(`01/01/1990 ${e}`)-Date.parse(`01/01/1990 ${t}`))/6e4);return n<=20&&n>0},isClassOver:(e,t)=>new Date(`01/01/1990 ${e}`)-new Date(`01/01/1990 ${t}`)<0,fetchCourseCodes:async e=>{fetch("https://itsligo-utils.herokuapp.com/api/allcourses").then(e=>e.json()).then(t=>{console.time("getCourses()"),document.getElementById("loader").style.display="none";const n=document.getElementById("courses-datalist"),o=document.createDocumentFragment();let l;for(let e=0;e<t.length;e+=1)(l=document.createElement("option")).text=t[e].course,l.value=t[e].title||t[e].course,l.setAttribute("data-value",t[e].course),o.append(l);n.append(o),"function"==typeof e&&e(),console.timeEnd("getCourses()")}).catch(e=>{console.error(e)})},getSelectedValue:()=>{const e=document.getElementById("courses").value,t=document.querySelector(`#courses-datalist option[value='${e}']`);return null===t?"":t.dataset.value},alertCheck:()=>{localStorage.getItem("visted")||""===window.location.hash||(localStorage.setItem("visted",!0),document.getElementById("alert").style.display="block")}}},function(e,t,n){"use strict";n.r(t);var o=n(0);const l=(e,t,n,l,a)=>{if(e>t){const d=Math.abs(new Date(`01/01/1990 ${e}`).getTime()-new Date(`01/01/1990 ${t}`).getTime())/6e4;if(d>0){const e=d>=60?`Break: ${d/60} hour${Object(o.getPlural)(d/60)}`:`Break: ${d} minutes`,s=document.createElement("a");s.innerHTML=e,s.className=`list-group-item item font-weight-bold ${Object(o.isToday)(a)&&Object(o.isClassOver)(t,l)?"text-muted":"text-success"}`,n.append(s)}}};function a(e,t,n){fetch(`https://itsligo-utils.herokuapp.com/api/timetable/${e}/${t}`).then(e=>e.json()).then(t=>{if(console.time("timetable"),document.getElementById("loader").style.display="none",t.empty)return document.getElementById("timetable-window").style.display="block",document.getElementById("course-title").textContent="No timetable data found",void(document.getElementById("courseinfo-direct-link").href=t.url);document.getElementById("courseinfo-direct-link").href=t.url,document.title=`MyTerm | ${decodeURIComponent(e)}`;const a=document.getElementById("timetable");document.getElementById("timetable-window").append(a),document.getElementById("course-title").textContent=decodeURIComponent(e);const d=document.createDocumentFragment();let s,c;const i=document.querySelector("#temp-main"),r=(new Date).toLocaleTimeString("en-GB");let u=document.importNode(i.content,!0);for(let e=0;e<t.data.length-2;e+=1)if(t.data[e].length){let a=0;const m=(u=document.importNode(i.content,!0)).querySelector("#card-main");m.id+=e,u.querySelector("#heading").id+=e;const p=u.querySelector("#header");p.id+=e,p.setAttribute("data-target",`#collapse${e}`),p.setAttribute("aria-controls",`collapse${e}`),p.className+=` ${Object(o.isToday)(e)?"text-danger font-weight-bold":"text-white"}`,p.innerHTML+=t.data[e][0].day,(c=u.querySelector("#collapse")).id+=e;const y=u.querySelector("#class-total-badge");y.id+=e,y.innerHTML=t.data[e].length,y.className+=Object(o.isToday)(e)?" badge-danger":"",d.append(m),c=d.getElementById(`collapse${e}`),Object(o.isToday)(e)&&c.classList.add("show");for(let n=0;n<t.data[e].length;n+=1){const d=t.data[e][n];l(d.startTime,a,c,r,e),s=document.createElement("a");const i=d.name.split("/")[0].replace(/ GD & SD/,""),u=d.room.split(" (")[0],m=document.createElement("p");m.innerHTML=`${d.startTime} - ${d.endTime}<br>${i}<br>\n              ${u.split("-")[0]} - ${u.split("-")[1]}<br>\n              ${d.teacher.replace(",",", ")}`,m.classList.add("mb-0"),s.className="list-group-item item",Object(o.isToday)(e)&&(s.className+=` ${Object(o.isClassNow)(d.startTime,d.endTime,r)?"text-danger font-weight-bold":Object(o.isClassApporaching)(d.startTime,r)?"text-warning":Object(o.isClassOver)(d.endTime,r)?"text-muted":""}`),a=d.endTime,s.append(m),c.appendChild(s)}"function"==typeof n&&n()}a.append(d),console.timeEnd("timetable")}).catch(e=>{document.getElementById("timetable-window").style.display="block",document.getElementById("course-title").text="Invalid course entered",console.error(e)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("timetable-window"),t=document.getElementById("select-window"),n=document.getElementById("courses"),l=document.getElementById("searchBtn"),d=document.getElementById("toggleBtn");function s(n){const l=document.getElementById("timetable");for(;l.firstChild;)l.removeChild(l.firstChild);t.style.display="none",e.style.display="block";const d=Object(o.getSelectedValue)();window.location.hash=n?"#"===d[0]?`#${d}/${n}`:`${d}/${n}`:"#"===d[0]?`#${d}`:d,a(encodeURIComponent(d),n)}function c(){document.title="MyTerm",e.style.display="none",t.style.display="block",window.history.pushState("",document.title,`${window.location.pathname}`),n.focus()}if(window.history&&window.history.pushState&&(window.onpopstate=(()=>{const{hash:e}=window.location;""===e&&window.location.reload()})),n.addEventListener("keyup",t=>{n.value.length<1?(l.disabled=!0,d.disabled=!0):(l.disabled=!1,d.disabled=!1),13!==t.keyCode||l.disabled||"none"!==e.style.display||s()}),document.addEventListener("keyup",t=>{8===t.keyCode&&"block"===e.style.display&&c()}),window.location.hash){document.getElementById("select-window").style.display="none";let t="",n=window.location.hash.substring(1);const l=RegExp(/^.*([\/]\d|\/)$/).test(n);l&&("0"!==(t=n.slice(-1))&&"1"!==t&&(t="0"),n=n.substring(0,n.length-2)),a(encodeURIComponent(n),l?t:"",()=>{e.style.display="block",Object(o.alertCheck)()}),Object(o.fetchCourseCodes)()}else Object(o.fetchCourseCodes)(()=>{t.style.display="block"});document.getElementById("searchBtn").addEventListener("click",()=>{s(),Object(o.alertCheck)()},!1),document.getElementById("semOneBtn").addEventListener("click",()=>{s("0"),Object(o.alertCheck)()},!1),document.getElementById("semTwoBtn").addEventListener("click",()=>{s("1"),Object(o.alertCheck)()},!1),document.getElementById("backBtn").addEventListener("click",()=>c(),!1)},!1)}]);