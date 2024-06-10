/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');

let span = document.querySelector(".up");
window.onscroll = function() {
    this.scrollY >= 1000 ? span.classList.add("show"): span.classList.remove("show") ;
};
span.onclick = function () {
    window.scrollTo({
        top:0,
        behavior : "smooth",
    });
}

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    return (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    sections.forEach(section => {
        const navItem = document.createElement('li');
        navItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
        navList.appendChild(navItem);
    });
};
// Add class 'active' to section when near top of viewport

const scrollToSection = () => {
    navList.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.nodeName === 'A') {
            const targetId = event.target.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
};
// Scroll to anchor ID using scrollTO event
const setActiveSection = () => {
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('your-active-class');
            } else {
                section.classList.remove('your-active-class');
            }
        });
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
scrollToSection();

// Set sections as active
setActiveSection();

