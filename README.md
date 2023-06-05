# Landing Page Project

## Table of Contents

* [Instructions](#instructions)
* [Summary](#summary)
* [Features](#features)
* [Call Stack Overview](#call-stack-overview)
  * [Order of Execution](#order-of-execution)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.

## Summary

This landing page showcases a responsive and interactive single-page website. It consists of several sections with a fixed navigation menu.


## Features

- The navigation menu is dynamically generated based on the sections present on the page.
- When scrolling, the active section in the viewport is highlighted in the navigation menu.
- Clicking on a navigation link scrolls smoothly to the corresponding section.
- The navigation menu disappears when scrolling down and reappears when scrolling up.
- After a brief pause in scrolling, the navigation menu slides up and disappears.
- A "Scroll to Top" button is displayed when the user scrolls below the fold of the page.
- Clicking on the "Scroll to Top" button scrolls smoothly to the top of the page.
- Sections can be expanded or collapsed by clicking on the header, revealing or hiding the content within.
- Each section header has an icon that rotates to indicate whether the section is expanded or collapsed.

## Call Stack Overview

Here's an overview of how the call stack is utilized in the `app.js` file:

1. The file starts by defining global variables and helper functions:
   1. `navBarList` where the nav items are set
   2. `sections` for identifying the sections in `index.hml`
   3. `scrollingTimeout` and `lastScrollPos` are both used for hiding the nav bar and utilizing the `scrollToTop` button
2. The helper functions are used to perform the following tasks:
   1. adding/removing classes
   2. handling scroll behavior
   3. creating buttons
   4. toggling section visibility
3. The main functions are responsible for building the navigation menu, attaching event listeners, and scrolling to sections.
4. The event listeners at bottom listen for specific browser events and execute the corresponding functions.

#### Order of Execution
1. The `buildNavMenu` function is executed when the DOM content is loaded and creates the navigation menu.
2. The `addActiveClassToSection` function is called when the user scrolls and adds the "active" class to the section in the viewport.
3. The `scrollToSection` function is triggered when a navigation link is clicked and scrolls to the corresponding section.
4. The `handleScroll` function is executed when the user scrolls and handles hiding/showing the navigation bar and the "Scroll to Top" button.
5. The `createScrollToTopButton` function dynamically creates the "Scroll to Top" button. Event listeners are attached to various elements to listen for scroll, click, and DOMContentLoaded events.

