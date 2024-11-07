document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');

    const revealSection = (entry) => {
        entry.target.classList.add('visible');
    };

    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealSection(entry);
                observer.unobserve(entry.target); // Stop observing after revealing
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section); // Start observing each section
    });
});