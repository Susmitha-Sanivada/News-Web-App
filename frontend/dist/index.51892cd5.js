let t,e=[];backendurl1="https://stream-curious-cobalt.glitch.me/headline",backendurl2="https://stream-curious-cobalt.glitch.me/search";const r=function(){let t=document.querySelector(".article-content"),r=`<div class="article">
            <p class="article-title"></p>
          </div>`.repeat(e.length);t.insertAdjacentHTML("afterbegin",r);let a=document.querySelectorAll(".article"),c=document.querySelectorAll(".article-title");a.forEach((t,r)=>{t.style.backgroundImage=`url(${e[r].urlToImage})`,c[r].textContent=e[r].title+"..."});let l=document.querySelector(".left-button"),o='<div class="dot"></div>'.repeat(e.length);l.insertAdjacentHTML("afterend",o)},a=async function(){let t=await fetch(backendurl1).then(t=>t.json()),{articles:r}=t;e=r.map(t=>({title:t.title,urlToImage:t.urlToImage,url:t.url})),console.log(t),console.log(e)},c=function(){let t=document.querySelector(".left-button"),r=document.querySelector(".right-button"),a=document.querySelectorAll(".article"),c=0,l="",o=0,s=document.querySelectorAll(".dot");s[0].classList.add("dot-active"),s[1].classList.add("dot-active"),a.forEach((t,e)=>{t.setAttribute("data-index",e)}),s.forEach((t,e)=>{t.setAttribute("data-index",e)}),r.addEventListener("click",()=>{a.forEach((t,r)=>{c>=104*(e.length-2)?t.style.transform="translateX(-0%)":t.style.transform=`translateX(-${c+104}%)`}),l="",a[0].style.transform.split("").forEach(t=>{/^\d+$/.test(t)&&(l+=t)}),o=Math.floor((c=Number(l))/100),s.forEach(t=>{t.classList.remove("dot-active")}),s[o].classList.add("dot-active"),s[o+1].classList.add("dot-active")}),t.addEventListener("click",()=>{a.forEach(t=>{c<=0?t.style.transform=`translateX(-${104*(e.length-2)}%)`:t.style.transform=`translateX(-${c-104}%)`}),l="",a[0].style.transform.split("").forEach(t=>{/^\d+$/.test(t)&&(l+=t)}),o=Math.floor((c=Number(l))/100),s.forEach(t=>{t.classList.remove("dot-active")}),s[o].classList.add("dot-active"),s[o+1].classList.add("dot-active")}),document.querySelector(".article-dots").addEventListener("click",t=>{if(t.target===t.target.closest(".dot")){let r=Number(t.target.closest(".dot").getAttribute("data-index"));a.forEach(t=>{r===e.length-1?t.style.transform=`translateX(-${(r-1)*104}%)`:t.style.transform=`translateX(-${104*r}%)`}),l="",a[0].style.transform.split("").forEach(t=>{/^\d+$/.test(t)&&(l+=t)}),o=Math.floor((c=Number(l))/100),s.forEach(t=>{t.classList.remove("dot-active")}),s[o].classList.add("dot-active"),s[o+1].classList.add("dot-active")}}),document.querySelector(".article-content").addEventListener("click",t=>{if(t.target===t.target.closest(".article")||t.target.closest(".article-title")){let r=t.target.closest(".article").getAttribute("data-index");window.location=e[r].url}})},l=function(){let t=document.querySelector(".search-bar");document.querySelector(".search-bar-submit").addEventListener("click",e=>{e.preventDefault(),t.value,t.value="",o().then(t=>{s(t)})})},o=async function(){let{articles:t}=await fetch(backendurl2).then(t=>t.json());return t.map(t=>({title:t.title,url:t.url,date:t.publishedAt.slice(0,10),urlToImage:t.urlToImage,author:t.author}))},s=function(e){console.log(e);let r=document.querySelector(".search-data"),a=document.querySelector(".ptag"),c='<div class="search-article"></div>'.repeat(e.length);a&&a.remove(),console.log(t),t&&t.forEach(t=>{t.remove()}),r.insertAdjacentHTML("beforeend",c);let l=document.querySelectorAll(".search-article");l.forEach((t,r)=>{console.log(e[r]);let a=`<div class="search-title">${e[r].title}</div>
                  <div class="search-date">${e[r].date}</div>
                  <button class="search-button"></button>`;t.insertAdjacentHTML("beforeend",a),t.setAttribute("data-url",e[r].url)}),t=l,0===e.length&&r.insertAdjacentHTML("beforeend",'<p class="ptag">Oops!!! Try different search....</p  '),r.addEventListener("click",t=>{t.target.closest(".search-article")&&(window.location=t.target.closest(".search-article").getAttribute("data-url"))})},n=function(){let t=document.querySelector(".nav"),e=document.querySelector(".section2"),r=document.querySelector(".section3"),a=document.querySelector(".section4");t.addEventListener("click",t=>{t.target.classList.contains("headline")&&e.scrollIntoView(),t.target.classList.contains("search")&&r.scrollIntoView(),t.target.classList.contains("about")&&a.scrollIntoView()})},i=function(t){new IntersectionObserver(e=>{!0===e[0].isIntersecting&&document.querySelector(t).classList.add("section2-translate"),!1===e[0].isIntersecting&&document.querySelector(t).classList.remove("section2-translate")},options={root:null,threshold:[0]}).observe(document.querySelector(t))};!async function(){i(".section1"),i(".section2"),i(".section3"),i(".section4"),n(),await a(),r(),c(),l()}();
//# sourceMappingURL=index.51892cd5.js.map
