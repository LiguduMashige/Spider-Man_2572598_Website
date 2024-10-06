// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const splashScreen = document.getElementById('splash-screen');
    const splashVideo = document.getElementById('splash-video');
    const mainContent = document.getElementById('main-content');

    // Listen for video to end or run for exactly 27 seconds (whichever comes first)
    splashVideo.addEventListener('timeupdate', function () {
        if (splashVideo.currentTime >= 27) {
            triggerFadeOut();
        }
    });

    // Function to handle the fade-out transition
    function triggerFadeOut() {
        splashScreen.style.opacity = 0; // Start fading out

        // After 2 seconds (fade-out duration), hide the splash screen
        setTimeout(function () {
            splashScreen.style.display = 'none'; // Hide the splash screen completely

            // Show the main content
            mainContent.style.display = 'block';

            // Fade in the main content
            setTimeout(function () {
                mainContent.style.opacity = 1;
            }, 50); // Small delay for smoother transition
        }, 2000); // 2 seconds delay for the fade-out animation
    }
});

/* let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{
    
    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx)=>{

                setTimeout(()=>{
                    span.classList.remove('.active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        },2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300)
    })
}) */