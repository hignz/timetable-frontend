!function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t){e.exports={getPlural:e=>e>1?"s":"",isClassNow:(e,t,o,n)=>Date.parse(`01/01/1990 ${e}`)>=Date.parse(`01/01/1990 ${t}`)&&Date.parse(`01/01/1990 ${e}`)<=Date.parse(`01/01/1990 ${o}`)&&n,isClassApporaching:(e,t,o)=>{const n=Math.floor((Date.parse(`01/01/1990 ${t}`)-Date.parse(`01/01/1990 ${e}`))/6e4);return n<=20&&n>0&&o},getCourses:async e=>{fetch("https://itsligo-utils.herokuapp.com/api/allcourses").then(e=>e.json()).then(t=>{document.querySelector("#loader").style.display="none";for(let e=0;e<t.length;e+=1){const o=document.createElement("option");if(o.text=t[e].title||t[e].course,o.value=t[e].course,!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform)){document.querySelector("#courses-select").append(o.cloneNode(!0))}else{document.querySelector("#courses-datalist").append(o)}}e&&e()}).catch(e=>{console.error(e)})}}},function(e,t,o){"use strict";o.r(t);var n=o(0);const a=(e,t,o)=>{if(e>t){const a=Math.abs(new Date(`01/01/1990 ${e}`).getTime()-new Date(`01/01/1990 ${t}`).getTime())/6e4;if(a>0){const e=a>=60?`Break: ${a/60} hour${Object(n.getPlural)(a/60)}`:`Break: ${a} minutes`,t=document.createElement("a");t.innerHTML=e,t.className="list-group-item item font-weight-bold text-success",o.append(t)}}};function r(e,t){fetch(`https://itsligo-utils.herokuapp.com/api/timetable/${e}`).then(e=>e.json()).then(o=>{if(document.querySelector("#loader").style.display="none",o.empty)return document.querySelector("#timetable-window").style.display="block",void(document.querySelector("#course-title").textContent="No timetable data found");document.querySelector("#courseinfo-direct-link").href=o.url;const r=(new Date).toLocaleTimeString("en-GB"),l=document.createElement("div");l.classList.add("accordion"),l.id="timetable",document.querySelector("#timetable-window").append(l),document.querySelector("#course-title").textContent=decodeURIComponent(e);for(let e=0;e<o.data.length-2;e+=1)if(o.data[e].length){let c=0;l.insertAdjacentHTML("beforeend",`<div class="card bg-success" id="card${e}">\n          <div class="card-header" id="heading${e}">\n            <h5 class="mb-0">\n            <button type="button" class="btn btn-lg heading font-weight-bold ml-1 text-left" id="header${e}" style="width: 100%" data-toggle="collapse" data-target="#collapse${e}"\n              aria-expanded="true" aria-controls="collapse${e}">\n                ${o.data[e][0].day}\n                <span class="badge float-right badge-pill animated fadeIn mt-1" id="class-total-badge${e}">${o.data[e].length}</span>\n            </button>\n            </h5>\n            <div id="collapse${e}" class="collapse show" aria-labelledby="heading${e}"></div>\n          </div>`);const s=(new Date).getDay()-1===e;document.querySelector(`#header${e}`).classList.add(s?"text-danger":"text-white"),s&&document.querySelector(`#class-total-badge${e}`).classList.add("badge-danger");const i=document.querySelector(`#collapse${e}`);for(let t=0;t<o.data[e].length;t+=1){const l=o.data[e][t];a(l.startTime,c,i);const d=document.createElement("a"),u=l.name.split("/")[0].replace(/ GD & SD/,""),m=l.room.split(" (")[0];d.innerHTML=`${l.startTime} - ${l.endTime}<br>${u}<br>${m.split("-")[0]} - ${l.type}<br>${l.teacher.replace(",",", ")}`,d.className="list-group-item item animated fadeIn",d.classList.add(Object(n.isClassNow)(r,l.startTime,l.endTime,s)?"text-danger":Object(n.isClassApporaching)(r,l.startTime,s)?"text-warning":"a"),c=l.endTime,Object(n.isClassNow)(r,l.startTime,l.endTime,s)&&d.classList.add("font-weight-bold"),document.querySelector(`#collapse${e}`).appendChild(d)}t&&t()}}).catch(e=>{document.querySelector("#timetable-window").style.display="block",document.querySelector("#course-title").text="Invalid course entered",console.error(e)})}document.addEventListener("DOMContentLoaded",async()=>{window.history&&window.history.pushState&&(window.onpopstate=(()=>{const{hash:e}=window.location;""===e&&window.location.reload()}));const e=!!navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform);e&&(document.querySelector("#courses").style.display="none",document.querySelector("#courses-select").style.display="block"),window.location.hash?(document.querySelector("#select-window").style.display="none",await r(encodeURIComponent(window.location.hash.substring(1)),()=>{document.querySelector("#timetable-window").style.display="block"}),await Object(n.getCourses)()):await Object(n.getCourses)(()=>{document.querySelector("#select-window").style.display="block"}),document.querySelector("#searchBtn").addEventListener("click",async()=>{document.querySelector("#timetable")&&document.querySelector("#timetable").remove(),document.querySelector("#select-window").style.display="none",document.querySelector("#timetable-window").style.display="block";let t=document.querySelector("#courses").value;if(e){const e=document.querySelector("#courses-select");t=e.options[e.selectedIndex].value}window.location.hash="#"===t[0]?`#${t}`:t,await r(encodeURIComponent(t))},!1),document.querySelector("#backBtn").addEventListener("click",async()=>{document.querySelector("#timetable-window").style.display="none",document.querySelector("#select-window").style.display="block",window.history.pushState("",document.title,`${window.location.pathname}`)},!1)},!1)}]);