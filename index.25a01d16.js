var threshold=100;window.addEventListener("scroll",(function(){var e=document.querySelector(".header"),o=document.querySelector(".js-header__sticky");e.getBoundingClientRect().bottom<-threshold?o.style.display="block":o.style.display="none"}));var logo=document.querySelector(".header__sticky__logo");logo.addEventListener("click",(function(e){e.preventDefault();var o=document.querySelector(".header");document.querySelector(".js-header__sticky").style.display="none",window.scrollTo(0,o.offsetTop)}));var homeLink=document.querySelector(".header__sticky__nav--item");homeLink.addEventListener("click",(function(e){e.preventDefault();var o=document.querySelector(".header");document.querySelector(".js-header__sticky").style.display="none",window.scrollTo(0,o.offsetTop)}));
//# sourceMappingURL=index.25a01d16.js.map
