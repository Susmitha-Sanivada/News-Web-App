//
let stateHeadlineData = [];
let stateSearchData = [];
const apiKey = "94104aaf500c492d9d933cde701994b0";
backendurl1 = "https://stream-curious-cobalt.glitch.me/headline";
backendurl2 = "https://stream-curious-cobalt.glitch.me/search";

//

//

//view the headline data onto the page

const viewHeadlineData = function () {
  //creating divs
  const articleContent = document.querySelector(".article-content");
  const html = `<div class="article">
            <p class="article-title"></p>
          </div>`.repeat(stateHeadlineData.length);
  articleContent.insertAdjacentHTML("afterbegin", html);

  //viewing the title and backgroundimage

  const indvArticle = document.querySelectorAll(".article");
  const indvTitle = document.querySelectorAll(".article-title");
  indvArticle.forEach((article, i) => {
    article.style.backgroundImage = `url(${stateHeadlineData[i].urlToImage})`;
    indvTitle[i].textContent = stateHeadlineData[i].title + "...";
  });

  //creating dots
  const leftButton = document.querySelector(".left-button");
  const dotHtml = `<div class="dot"></div>`.repeat(stateHeadlineData.length);
  leftButton.insertAdjacentHTML("afterend", dotHtml);
};

//
//
const headlineData = async function () {
  const data = await fetch(backendurl1).then((res) => res.json());
  const { articles } = data;
  stateHeadlineData = articles.map((article) => {
    return {
      title: article.title,
      urlToImage: article.urlToImage,
      url: article.url,
    };
  });
  console.log(data);
  console.log(stateHeadlineData);
};

//slider
const sliderFunction = function () {
  const leftButton = document.querySelector(".left-button");
  const rightButton = document.querySelector(".right-button");
  const article = document.querySelectorAll(".article");
  let translateData = 0;
  let str = "";
  let dotNumber = 0;

  //default active dots

  const dot = document.querySelectorAll(".dot");
  dot[0].classList.add("dot-active");
  dot[1].classList.add("dot-active");

  //setting a data number to the articles

  article.forEach((el, i) => {
    el.setAttribute("data-index", i);
  });

  //setting a data number to the dots

  dot.forEach((el, i) => {
    el.setAttribute("data-index", i);
  });

  //left button click event

  rightButton.addEventListener("click", () => {
    //changing the tarnslate of every article
    article.forEach((el, i) => {
      if (translateData >= 104 * (stateHeadlineData.length - 2)) {
        el.style.transform = `translateX(-0%)`;
      } else {
        el.style.transform = `translateX(-${translateData + 104}%)`;
      }
    });
    //updating the translatedata for above code
    str = "";
    article[0].style.transform.split("").forEach((char) => {
      if (/^\d+$/.test(char)) {
        str += char;
      }
    });
    translateData = Number(str);
    //updating dots
    dotNumber = Math.floor(translateData / 100);
    dot.forEach((el) => {
      el.classList.remove("dot-active");
    });
    dot[dotNumber].classList.add("dot-active");
    dot[dotNumber + 1].classList.add("dot-active");
  });

  //right button click event

  leftButton.addEventListener("click", () => {
    //changing the translate
    article.forEach((el) => {
      if (translateData <= 0) {
        el.style.transform = `translateX(-${
          104 * (stateHeadlineData.length - 2)
        }%)`;
      } else {
        el.style.transform = `translateX(-${translateData - 104}%)`;
      }
    });
    //updating the translatedata for above code
    str = "";
    article[0].style.transform.split("").forEach((char) => {
      if (/^\d+$/.test(char)) {
        str += char;
      }
    });
    translateData = Number(str);
    //updating dots
    dotNumber = Math.floor(translateData / 100);
    dot.forEach((el) => {
      el.classList.remove("dot-active");
    });
    dot[dotNumber].classList.add("dot-active");
    dot[dotNumber + 1].classList.add("dot-active");
  });

  // event delegation for dots

  const dotContainer = document.querySelector(".article-dots");

  //translating when clicked
  dotContainer.addEventListener("click", (e) => {
    if (e.target === e.target.closest(".dot")) {
      let i = Number(e.target.closest(".dot").getAttribute("data-index"));
      article.forEach((el) => {
        if (i === stateHeadlineData.length - 1) {
          el.style.transform = `translateX(-${(i - 1) * 104}%)`;
        } else {
          el.style.transform = `translateX(-${i * 104}%)`;
        }
      });
      //updating the translatedata for above code
      str = "";
      article[0].style.transform.split("").forEach((char) => {
        if (/^\d+$/.test(char)) {
          str += char;
        }
      });
      translateData = Number(str);
      //updating dots
      dotNumber = Math.floor(translateData / 100);
      dot.forEach((el) => {
        el.classList.remove("dot-active");
      });
      dot[dotNumber].classList.add("dot-active");
      dot[dotNumber + 1].classList.add("dot-active");
    }
  });

  //onclick redirect to the url
  const articleContainer = document.querySelector(".article-content");
  articleContainer.addEventListener("click", (e) => {
    if (
      e.target === e.target.closest(".article") ||
      e.target.closest(".article-title")
    ) {
      let i = e.target.closest(".article").getAttribute("data-index");
      window.location = stateHeadlineData[i].url;
    }
  });
};

///
///
let searchValue;
const searchFunctionality = function () {
  const searchBar = document.querySelector(".search-bar");
  const searchButton = document.querySelector(".search-bar-submit");
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchValue = searchBar.value;
    searchBar.value = "";
    searchData().then((res) => {
      viewSearchData(res);
    });
  });
};

const searchData = async function () {
  const data = await fetch(backendurl2).then((res) => res.json());
  const { articles } = data;
  const stateSearchData = articles.map((article) => {
    return {
      title: article.title,
      url: article.url,
      date: article.publishedAt.slice(0, 10),
      urlToImage: article.urlToImage,
      author: article.author,
    };
  });
  return stateSearchData;
};

let duplicate;
const viewSearchData = function (data) {
  console.log(data);
  const searchContainer = document.querySelector(".search-data");
  const ptag = document.querySelector(".ptag");
  //creating number of search article
  const html = `<div class="search-article"></div>`.repeat(data.length);
  //removing the previous html
  if (ptag) {
    ptag.remove();
  }
  console.log(duplicate);
  if (duplicate) {
    duplicate.forEach((el) => {
      el.remove();
    });
  }
  //inserting the html
  searchContainer.insertAdjacentHTML("beforeend", html);

  //inserting the specific data
  const searchArticle = document.querySelectorAll(".search-article");
  searchArticle.forEach((el, i) => {
    console.log(data[i]);
    //creating the inner html
    const html2 = `<div class="search-title">${data[i].title}</div>
                  <div class="search-date">${data[i].date}</div>
                  <button class="search-button"></button>`;
    el.insertAdjacentHTML("beforeend", html2);
    el.setAttribute("data-url", data[i].url);
  });

  //copying the search data to delete at the start of the click
  duplicate = searchArticle;

  // if the object is empty
  const tryHtml = `<p class="ptag">Oops!!! Try different search....</p  `;
  if (data.length === 0) {
    searchContainer.insertAdjacentHTML("beforeend", tryHtml);
  }

  //if clicked on the article ,redirect to the url
  searchContainer.addEventListener("click", (e) => {
    if (e.target.closest(".search-article")) {
      window.location = e.target
        .closest(".search-article")
        .getAttribute("data-url");
    }
    // console.log("pjlkh", e.target);
  });
};

//event delegation for header
const navFunctionality = function () {
  const nav = document.querySelector(".nav");
  const section2 = document.querySelector(".section2");
  const section3 = document.querySelector(".section3");
  const section4 = document.querySelector(".section4");
  nav.addEventListener("click", (e) => {
    if (e.target.classList.contains("headline")) {
      section2.scrollIntoView();
    }
    if (e.target.classList.contains("search")) {
      section3.scrollIntoView();
    }
    if (e.target.classList.contains("about")) {
      section4.scrollIntoView();
    }
  });
};
////
////

////

///
const lookAndFeel = function (selectorwithdot) {
  options = {
    root: null,
    threshold: [0],
  };
  const observer = new IntersectionObserver((e) => {
    if (e[0].isIntersecting === true) {
      document
        .querySelector(selectorwithdot)
        .classList.add("section2-translate");
    }
    if (e[0].isIntersecting === false) {
      document
        .querySelector(selectorwithdot)
        .classList.remove("section2-translate");
    }
  }, options);
  observer.observe(document.querySelector(selectorwithdot));
};

//
///

//

//
///
//the initial code that runs first....

const initialCode = async function () {
  lookAndFeel(".section1");
  lookAndFeel(".section2");
  lookAndFeel(".section3");
  lookAndFeel(".section4");
  navFunctionality();
  //updating the state data first
  await headlineData();
  //viewing the headline data
  viewHeadlineData();
  sliderFunction();
  // searching
  searchFunctionality();
};

initialCode();
