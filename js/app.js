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
let scrollingTimeout;
let lastScrollPos = window.scrollY;

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

const hideNavBar = () => {
    const navbar = document.querySelector('.page__header');
    navbar.style.transition = 'transform 0.3s ease-out';
    navbar.style.transform = 'translateY(-100%)';
};

const showNavBar = () => {
    const navbar = document.querySelector('.page__header');
    navbar.style.transition = 'transform 0.3s ease-out';
    navbar.style.transform = 'translateY(0)';
};

const handleScroll = () => {
    clearTimeout(scrollingTimeout);

    // Scroll up, show the navbar
    if (window.scrollY < lastScrollPos) {
        showNavBar();
    } else {
        // Scroll down, hide the navbar
        hideNavBar();
    }

    // Update the last scroll position
    lastScrollPos = window.scrollY;

    // Show/hide the "Scroll to Top" button
    const scrollThreshold = window.innerHeight / 2; // Adjust the threshold as needed

    if (window.scrollY > scrollThreshold) {
        showScrollToTopButton();
    } else {
        hideScrollToTopButton();
    }

    // Start the timer to hide the navbar after 1 second of scrolling pause
    scrollingTimeout = setTimeout(() => {
        if (window.scrollY > 0) {
            hideNavBar();
        }
    }, 1000);
};

// Create the "Scroll to Top" button dynamically
const createScrollToTopButton = () => {
    const scrollToTopBtn = document.createElement('button');
    // scrollToTopBtn.textContent = 'Scroll to Top';
    scrollToTopBtn.classList.add('scroll-to-top-btn');
    scrollToTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollToTopBtn);
};

// Show the "Scroll to Top" button
const showScrollToTopButton = () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    scrollToTopBtn.style.display = 'block';
};

// Hide the "Scroll to Top" button
const hideScrollToTopButton = () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    scrollToTopBtn.style.display = 'none';
};

// Scroll to top of the page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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

// Handle scroll and hide/show navbar
window.addEventListener('scroll', handleScroll);

// Create the "Scroll to Top" button
createScrollToTopButton();