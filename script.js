// 1. Button Click Logic (Keep active state)
const buttons = document.querySelectorAll('.nav-btn');
buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

        // 2. Scroll Logic (Change color)
const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
            // If user scrolls down more than 50 pixels
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    // Select the heading
    const heading = document.querySelector('.vertical-heading');
    let lastScrollY = 0;
    let ticking = false;

    function updateParallax() {
        // The speed factor: 0.8 is slow, 0.2 is fast relative to scroll
        const speed = 0.8; 
        
        // Apply the transform
        heading.style.transform = `translateY(${lastScrollY * speed}px)`;
        
        // Reset the tick so we can capture the next frame
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        lastScrollY = window.pageYOffset;

        // Only update if the browser is ready for the next frame
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
});
// Listen for scroll events
window.addEventListener('scroll', checkDividers);

function checkDividers() {
    // Select all dividers
    const dividers = document.querySelectorAll('.divider');
    
    // The point on the screen where animation triggers (80% down the screen)
    const triggerBottom = window.innerHeight * 0.8;

    dividers.forEach(divider => {
        // Get the position of the divider relative to the viewport
        const dividerTop = divider.getBoundingClientRect().top;

        // If the divider is within the view area, add the class
        if (dividerTop < triggerBottom) {
            divider.classList.add('active');
        } else {
            // Optional: Remove class to re-animate when scrolling up
            divider.classList.remove('active');
        }
    });
}

// Run once on load in case a divider is already visible
checkDividers();
/* --- WORD REVEAL SCRIPT --- */

// 1. Split text into words
const paragraphs = document.querySelectorAll('.text-wrapper p');

paragraphs.forEach(p => {
    // Get the text content
    const text = p.innerText;
    // Split by space and wrap each word in a <span>
    // We add a space after the span to keep natural spacing
    const splittedText = text.split(' ').map(word => 
        `<span class="word-span">${word}</span>`
    ).join(' ');
    
    // Replace the paragraph content with the new spans
    p.innerHTML = splittedText;
});

// 2. Set up the observer to watch for scrolling
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the word is in the viewport (screen)
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } 
        // Optional: Remove 'else' block if you want words to stay visible once revealed
        else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 1.0,      // Word must be 100% visible to trigger
    rootMargin: "-20px"  // Triggers slightly before the very bottom
});

// 3. Tell observer to watch every word
document.querySelectorAll('.word-span').forEach(word => {
    observer.observe(word);
});
// Select all the social text spans
document.querySelectorAll('.social-text').forEach(textContainer => {
    // Get the text (e.g., "INSTAGRAM")
    const text = textContainer.innerText;
    
    // Split it into letters and rebuild it
    textContainer.innerHTML = text.split('').map((letter, index) => {
        // We add a 'transition-delay' based on the index number
        // index * 0.05s means each letter waits 0.05s longer than the last
        return `<span style="transition-delay: ${index * 0.05}s">${letter}</span>`;
    }).join('');
});
/* --- HAMBURGER MENU LOGIC --- */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-buttons");

if(hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        // Toggle the active class on both the button (for animation) and the menu (for sliding)
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Optional: Close menu when a link is clicked
    document.querySelectorAll(".nav-btn").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}