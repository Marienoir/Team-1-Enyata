const toggler = document.getElementById('nav-toggler')
const navList = document.getElementById('nav-links')
const heroBanner = document.getElementById('hero-banner')

toggler.addEventListener('click', () => {
    navList.classList.toggle('hide')
    heroBanner.classList.toggle('shift')
})

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById('header').style.top = '0';
    } else {
        if (navList.classList.contains('hide')) {
            document.getElementById('header').style.top = '-84px';
        } else {
            document.getElementById('header').style.top = '-295px';
        }
    }
    prevScrollpos = currentScrollPos;
}