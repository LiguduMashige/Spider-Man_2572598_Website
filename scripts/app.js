/* document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    // Store pages in an array

    const pages = [
        { name: 'Home', link: 'index.html' },
        { name: 'About', link: 'pages/about.html' },
        { name: 'Services', link: 'pages/services.html' },
        { name: 'Contact', link: 'pages/contact.html' },
        { name: 'Design', link: 'pages/design.html'}
    ];

    // Create a <ul> element for the navbar
    const navList = document.createElement('ul');

    // Loop through the pages array and create a list item for each page
    pages.forEach(page => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        // Set the link href and text content
        link.href = page.link;
        link.textContent = page.name;

        // Append the link to the list item
        listItem.appendChild(link);

        // Append the list item to the nav list
        navList.appendChild(listItem);
    });

    // Append the navigation list to the navbar
    navbar.appendChild(navList);
}); */ 

document.addEventListener('DOMContentLoaded', () => { 
    const navbar = document.getElementById('navbar');

    // Define the base path dynamically depending on whether we're on GitHub Pages or not
    const base = window.location.pathname.includes('Spider-Man_2572598_Website') ? '/Spider-Man_2572598_Website/' : '/';

    // Store pages in an array with the base path prepended to links
    const pages = [
        { name: 'Home', link: `${base}index.html` },
        { name: 'About', link: `${base}pages/about.html` },
        { name: 'Services', link: `${base}pages/services.html` },
        { name: 'Contact', link: `${base}pages/contact.html` },
        { name: 'Design', link: `${base}pages/design.html` }
    ];

    // Create a <ul> element for the navbar
    const navList = document.createElement('ul');

    // Loop through the pages array and create a list item for each page
    pages.forEach(page => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        // Set the link href and text content
        link.href = page.link;
        link.textContent = page.name;

        // Append the link to the list item
        listItem.appendChild(link);

        // Append the list item to the nav list
        navList.appendChild(listItem);
    });

    // Append the navigation list to the navbar
    navbar.appendChild(navList);
});

