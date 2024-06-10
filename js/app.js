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

const activePage = window.location.pathname;
console.log(activePage )

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



    // function makeActive() {
    //     sections.forEach(section => {
    //         const rect = section.getBoundingClientRect();

    //         if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
    //             // Remove the active class from all navbar menu items
    //             navbarItems.forEach(item => {
    //                 item.classList.remove('active');
    //             });

    //             // Find the corresponding navbar menu item and add the active class
    //             const navItem = document.querySelector(`.navbar__list li a[href="#${section.id}"]`);
    //             console.log(navItem)
    //             navItem.parentNode.classList.add('active');
    //         }
    //     });
    // }

    // document.addEventListener('scroll', makeActive);
    // makeActive();


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
            const navItem = document.querySelector(`.menu__link[href="#${section.id}"]`);

            if (isInViewport(section)) {
                section.classList.add('your-active-class');
                if(navItem) {
                    navItem.classList.add('active');
                }
            } else {
                section.classList.remove('your-active-class');
                if (navItem) {
                    navItem.classList.remove('active');
                }
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

