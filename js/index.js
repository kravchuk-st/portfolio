const switchMode = document.getElementById('switchMode');
const burger = document.querySelector('#burger');
const menu = document.querySelector('.header__nav');
const links = [...document.querySelectorAll('.nav__item')];

function getLocalStorage() {
  if(localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

window.addEventListener('load', getLocalStorage)

switchMode.addEventListener('click', () => {
  if(document.documentElement.hasAttribute('data-theme')){
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

let closeMenu = () => {
  burger.classList.remove('burger--active');
  menu.classList.remove('header__nav--active');

  if (burger.classList.contains('burger--active')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

let toggleMenu = () => {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');

  if (burger.classList.contains('burger--active')) {
    disableScroll();
  } else {
    enableScroll();
  }
}

function disableScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.userSelect = "none";
}

function enableScroll() {
  document.body.style.overflow = "auto";
  document.body.style.userSelect = "auto";
}

burger.addEventListener('click', toggleMenu);

links.forEach((el) => el.addEventListener('click', closeMenu));

function openTab(ev, tabName) {
  let tabcontent = [...document.querySelectorAll(".tabcontent")];
  tabcontent.forEach((el) => el.style.display = "none");

  let tablinks = [...document.querySelectorAll(".tablinks")];
  tablinks.forEach((el) => el.classList.remove("active"));
  
  document.getElementById(tabName).style.display = "block";
  ev.target.classList.add("active");
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
