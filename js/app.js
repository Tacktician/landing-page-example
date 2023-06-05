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
const navBarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Remove 'active' class from all navigation links
const removeActiveClassFromLinks = () => {
    const navLinks = document.querySelectorAll('.navbar__menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
};

// add 'active' class to the section when near the top of viewport
const addActiveClassToSection = () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (
            window.scrollY >= sectionTop - sectionHeight * 0.25 &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            removeActiveClassFromLinks();
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNavMenu = () => {
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.setAttribute('href', `#${section.id}`);
        anchor.textContent = section.dataset.nav;
        anchor.classList.add('menu__link');
        listItem.appendChild(anchor);
        fragment.appendChild(listItem);
    });

    navBarList.appendChild(fragment);
};

// Scroll to anchor ID using scrollTO event
// Scroll to section on link click
const scrollToSection = (event) => {
    event.preventDefault();

    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });

        // Set the active link
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            removeActiveClassFromLinks();
            activeLink.classList.add('active');
        }
    }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener('DOMContentLoaded', buildNavMenu);

// Set sections as active
window.addEventListener('scroll', addActiveClassToSection);

// Scroll to section on link click
navBarList.addEventListener('click', scrollToSection);
