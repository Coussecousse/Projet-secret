const nav__menu = document.querySelector(".nav__menu");
const hiddenMenu = document.querySelector(".mobile-nav-hidden");

// menu________________________
nav__menu.addEventListener("click", (e) => {
  const selectedBtn = e.target.closest("button");

  if (!selectedBtn) return;

  if (selectedBtn == nav__menu.children[0]) {
    const notSelectedBtn = nav__menu.children[1];
    changeActiveButton(selectedBtn, notSelectedBtn);
    hiddenMenu.classList.remove("mobile-nav-hidden");
    hiddenMenu.classList.add("mobile-nav-not-hidden");
  } else {
    const notSelectedBtn = nav__menu.children[0];
    changeActiveButton(selectedBtn, notSelectedBtn);
    hiddenMenu.classList.remove("mobile-nav-not-hidden");
    hiddenMenu.classList.add("mobile-nav-hidden");
  }
});

function changeActiveButton(selectedBtn, notSelectedBtn) {
  selectedBtn.classList.remove("btn-active");
  selectedBtn.classList.add("btn-desactive");
  notSelectedBtn.classList.remove("btn-desactive");
  notSelectedBtn.classList.add("btn-active");
}

//Quand j'appuie sur mon boutton, le menu s'ouvre et le bouton change.
//Quand ça scroll je veux que le menu reste en haut

//Quand je clique sur gauche donne le slide avant
//Quand je clique sur droite ddonne slide apres
//quand je clique sur boutons donne slide correspondant

// carousel____________________
const carouselNavigation = document.querySelector(".carousel__sliders");
const carouselImg = document.querySelector(".carousel__imgs");
const divBtn = document.querySelector(".slider__btn");

carouselNavigation.addEventListener("click", (e) => {
  const selectionnedSlide = e.target.closest(".slide");

  if (!selectionnedSlide) return;

  if (
    selectionnedSlide == carouselNavigation.children[0] ||
    selectionnedSlide == carouselNavigation.children[2]
  ) {
    const firstChild = carouselImg.children[0];
    const middleChild = carouselImg.children[1];
    if (selectionnedSlide == carouselNavigation.children[0]) {
      removeAppendChild(firstChild);
      removeAppendChild(middleChild);
      addActiveClass(carouselImg.children[0]);
    } else {
      removeAppendChild(firstChild);
      addActiveClass(carouselImg.children[0]);
    }
  } else {
    const firstImg = document.querySelector(".first_img");
    const middleImg = document.querySelector(".middle_img");
    const lastImg = document.querySelector(".last_img");

    if (selectionnedSlide == divBtn.children[0]) {
      resetChild(middleImg, lastImg);
      order(middleImg, lastImg);
      addActiveClass(carouselImg.children[0]);
    } else if (selectionnedSlide == divBtn.children[1]) {
      resetChild(firstImg, lastImg);
      order(lastImg, firstImg);
      addActiveClass(carouselImg.children[0]);
    } else {
      resetChild(firstImg, middleImg);
      order(firstImg, middleImg);
      addActiveClass(carouselImg.children[0]);
    }
  }
});
//fonction qui enlève et rajoute les enfants
function removeAppendChild(element) {
  carouselImg.removeChild(element);
  carouselImg.appendChild(element);
}
//Reset tous les enfants sauf celui qui doit être le premier
function resetChild(one, two) {
  carouselImg.removeChild(one);
  carouselImg.removeChild(two);
}
//remet tous les enfants à la suite du premier
function order(one, two) {
  carouselImg.appendChild(one);
  carouselImg.appendChild(two);
}
//enlève la class active à toutes les img
function removeActive(childrens, removeingClass) {
  for (let i = 0; i < childrens.length; i++) {
    if (childrens[i].classList.contains(removeingClass)) {
      childrens[i].classList.remove(removeingClass);
    }
  }
}
//ajoute la class current img à la première img avec le btn qui s'active en plus
function addActiveClass(firstChild) {
  removeActive(carouselImg.children, "current_img");
  firstChild.classList.add("current_img");
  removeActive(divBtn.children, "slider__active");
  if (firstChild.classList.contains("first_img")) {
    divBtn.children[0].classList.add("slider__active");
  } else if (firstChild.classList.contains("middle_img")) {
    divBtn.children[1].classList.add("slider__active");
  } else {
    divBtn.children[2].classList.add("slider__active");
  }
}

const figures = document.querySelector(".group__photos");

figures.addEventListener("click", (e) => {
  const selectionnedFigure = e.target.closest("figure");

  if (!selectionnedFigure) return;

  const selectionnedText =
    selectionnedFigure.querySelector(".figure__wrap-text");
  if (selectionnedText.classList.contains("figure__text-leaving")) {
    selectionnedText.classList.remove("figure__text-leaving");
    selectionnedText.classList.add("figure__text-coming");
  } else {
    selectionnedText.classList.remove("figure__text-coming");
    selectionnedText.classList.add("figure__text-leaving");
  }
});

function scrollTrigger(selector, options = {}) {
  let elements = document.querySelectorAll(selector)
  elements = Array.from(elements)
  elements.forEach(element => {
    addObserver(element,options)
  })
}
function addObserver(element, options){
  if(!('IntersectionObserver' in window)) {
    if (element.classList.contains('quote__left')) {
      entry.target.classList.add('quote__left-animate')
    } else {
      entry.target.classList.add('quote__right-animate')
    }
    return
  }
  let observer = new IntersectionObserver((entries,observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
          if (element.classList.contains('quote__left')) {
            entry.target.classList.add('quote__left-animate')
          } else {
            entry.target.classList.add('quote__right-animate')
          }
          observer.unobserve(entry.target)
        }
      })
    }, options)
    observer.observe(element)
}
scrollTrigger('.quote', {
  rootMargin:'-150px',
  treshold: 1.0
})
