burger = document.querySelector('.burger')
navbar = document.querySelector('.navbar')
navList = document.querySelector('.nav-list')

burger.addEventListener('click', () => {
    navList.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');
})

var typed = new Typed(".auto-input", {
    strings: ["Face Recognition.", "Face-API.js."],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
})

var typed = new Typed(".auto-input2", {
    strings: ["Technologies Used.", "APIs Used."],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
})

window.addEventListener("scroll", function () {
    var header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY > 0)
});