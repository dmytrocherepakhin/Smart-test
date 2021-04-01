import $ from 'jquery';
import 'slick-carousel';
import counter from './lib/counter';
import arrRest from './lib/arrRest';

// Menu
const menuBurger = document.querySelector(".header__links_menu");
const menuWrapper = document.querySelector(".menu__wrapper");
const menuWrapperBtn = document.querySelector(".menu__wrapper_btn");
let menuHidden = true;

function toggler() {
    menuHidden = true;
    menuWrapper.classList.toggle("menu__wrapper_show");
    menuBurger.classList.toggle("menu__burger_active");
}

menuBurger.addEventListener('click', function () {
    if (menuHidden === true) {
        menuHidden = false;
        this.classList.toggle("menu__burger_active");
        menuWrapper.classList.toggle("menu__wrapper_show");
        menuWrapperBtn.addEventListener('click', toggler)
        if (menuHidden === true) {
            menuWrapperBtn.removeEventListener('click', toggler);
        }
    } else {
        menuHidden = true;
        this.classList.toggle("menu__burger_active");
        menuWrapper.classList.toggle("menu__wrapper_show");
        menuWrapperBtn.removeEventListener('click', toggler);
    }
})

// LoghIn-SignUp
let logInHidden = true;
let signUpHidden = true;
const modalLogIn = document.querySelector('.modal__wrapper_logIn');
const modalSignUp = document.querySelector('.modal__wrapper_signUp');
const logIn = document.querySelectorAll(".logIn-show");
const signUp = document.querySelectorAll(".signUp-show");
const logInClose = document.querySelector('.modal__arrow_logIn');
const signUpClose = document.querySelector('.modal__arrow_signUp');
for (let link of logIn) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        if (logInHidden === true) {
            logInHidden = false;
            modalLogIn.classList.toggle("logIn-active");
            if (signUpHidden === false) {
                signUpHidden = true;
                modalSignUp.classList.toggle("signUp-active");
            }
        }
    })
}
for (let link of signUp) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        if (signUpHidden === true) {
            signUpHidden = false;
            modalSignUp.classList.toggle("signUp-active");
            if (logInHidden === false) {
                logInHidden = true;
                modalLogIn.classList.toggle("logIn-active");
            }
        }
    })
}
logInClose.addEventListener('click', function () {
    logInHidden = true;
    modalLogIn.classList.toggle("logIn-active");
})
signUpClose.addEventListener('click', function () {
    signUpHidden = true;
    modalSignUp.classList.toggle("signUp-active");
})
const logInSubmit = document.querySelector('.modal__form_lognIn button');
logInSubmit.addEventListener('click', function (e) {
    logInHidden = true;
    modalLogIn.classList.toggle("logIn-active");
    e.preventDefault();
})
const signUpSubmit = document.querySelector('.modal__form_signUp button');
signUpSubmit.addEventListener('click', function (e) {
    signUpHidden = true;
    modalSignUp.classList.toggle("signUp-active");
    e.preventDefault();
})

// Scrolling
const anchors = document.querySelectorAll('a.scroll-to')
for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute('href')
        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

// slider
$('.sectionComments__slicker').slick({
    dots: true,
    arrows: false,
});

// DATA-Numbers
const counterObj = {
    recipes: 23567,
    users: 431729,
    reviews: 892173,
    photos: 56581,
    spices: 3182,
}

// Restaurants
const restWrapper = document.querySelector(".sectionCuisines__wrapper");

function insertRest() {
    for (let i = 0; i < arrRest.length; i++) {
        let numberOfRecipes = arrRest[i].numberOfRecipes.toString();
        if (numberOfRecipes.length > 3) {
            let arr = numberOfRecipes.split('');
            arr.splice(numberOfRecipes.length - 3, 0, '.')
            if (arr.length > 7) {
                arr.splice(arr.length - 7, 0, ',')
            }
            numberOfRecipes = arr.join('')
        }
        restWrapper.insertAdjacentHTML('beforeend', `<div class="sectionCuisines__card card">
        <img src=${arrRest[i].image} alt="${arrRest[i].name}">
        <div class="card__text">
            <p class="card__quantity">${numberOfRecipes} Recipes</p>
            <p class="card__name">${arrRest[i].name}</p>
        </div>
    </div>`)
    }
}

insertRest();

// Sorting of restaurants
const selector = document.getElementById("sorting");
selector.addEventListener('change', function (e) {
    switch (this.value) {
        case 'default':
            arrRest.sort(function (a, b) {
                if (a.defautlNumber < b.defautlNumber) return -1;
                if (a.defautlNumber === b.defautlNumber) return 0;
                else return 1;
            })
            break
        case 'lowToHigh':
            arrRest.sort(function (a, b) {
                if (a.numberOfRecipes < b.numberOfRecipes) return -1;
                if (a.numberOfRecipes === b.numberOfRecipes) return 0;
                else return 1;
            })
            break
        case 'highToLow':
            arrRest.sort(function (a, b) {
                if (a.numberOfRecipes > b.numberOfRecipes) return -1;
                if (a.numberOfRecipes === b.numberOfRecipes) return 0;
                else return 1;
            })
            break
        case 'name':
            arrRest.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name === b.name) return 0;
                else return 1;
            })
            break
    }
    const restWrapper = document.querySelector(".sectionCuisines__wrapper");
    while (restWrapper.firstElementChild) {
        restWrapper.removeChild(restWrapper.firstChild)
    }
    insertRest();
})

// numbers
counter("#recipes p:first-child", counterObj.recipes, true);
counter("#users p:first-child", counterObj.users, true);
counter("#rewiews p:first-child", counterObj.reviews, true);
counter("#photos p:first-child", counterObj.photos, true);
counter("#spices p:first-child", counterObj.spices, true);
let showNumbers = true;
window.addEventListener('scroll',
    function isElementInViewport() {
        if (showNumbers) {
            const el = document.getElementById("rewiews");
            let top = el.offsetTop;
            let height = el.offsetHeight;
            if (
                (top + height) < (window.pageYOffset + window.innerHeight) &&
                (top) > window.pageYOffset
            ) {
                counter("#recipes p:first-child", counterObj.recipes, false);
                counter("#users p:first-child", counterObj.users, false);
                counter("#rewiews p:first-child", counterObj.reviews, false);
                counter("#photos p:first-child", counterObj.photos, false);
                counter("#spices p:first-child", counterObj.spices, false);
                showNumbers = false;
            };
        }
    })
