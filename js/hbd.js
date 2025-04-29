        // Initialize particles
tsParticles.load("particles-container", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff4ecd"
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff4ecd",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            },
        }
    },
    retina_detect: true
})
// Wait for everything to load
window.addEventListener('DOMContentLoaded', () => {
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const openMessageBtn = document.querySelector('.open-message-btn');
    const mainSection = document.querySelector('.main-section');
    const contentSection = document.querySelector('.content-section');
    const returnBtn = document.querySelector('.return-btn');
    const loveMessageParagraphs = document.querySelectorAll('.love-message p')
    const playmusic = document.querySelectorAll(".play-music-btn")
    const dateContainer = document.querySelector('.date-container');
    // Initialize Swiper
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    })
    // Split text for typewriter effect
    const titleText = mainTitle.textContent;
    mainTitle.innerHTML = '';
    [...titleText].forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        mainTitle.appendChild(charSpan);
    })
    // Animate title with typewriter effect
    const chars = mainTitle.querySelectorAll('.char');
    gsap.set(mainTitle, { opacity: 1 });
    
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.05,
        ease: "power2.out"
    })
    .to(subtitle, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .to(dateContainer, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .to(openMessageBtn, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    .to(playmusic, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5")
    // Handle open message button click
    openMessageBtn.addEventListener('click', () => {
        gsap.to(mainSection, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                mainSection.style.display = 'none';
                contentSection.style.display = 'block';
                
                // Animate content section
                gsap.to(contentSection, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                })
                // Animate each paragraph line by line
                loveMessageParagraphs.forEach((paragraph, index) => {
                    const pText = paragraph.textContent;
                    paragraph.innerHTML = '';
                    paragraph.style.opacity = 1;
                    
                    // Create span for each line
                    const spanEl = document.createElement('span');
                    spanEl.textContent = pText;
                    spanEl.style.opacity = 0;
                    paragraph.appendChild(spanEl);
                    
                    gsap.to(spanEl, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.2 + (index * 0.3),
                        ease: "power2.out"
                    });
                })
                gsap.to(returnBtn, {
                    opacity: 1,
                    duration: 1,
                    delay: 2,
                    ease: "power2.out"
                });
            }
        });
    })
    // Handle return button click
    returnBtn.addEventListener('click', () => {
        gsap.to(contentSection, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                contentSection.style.display = 'none';
                mainSection.style.display = 'block';
                
                // Animate main section
                gsap.to(mainSection, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    })
    // Function to update name
    window.updateName = function(name) {
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            nameElement.textContent = name;
        }
    };
});

// Audio
document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.querySelector('.play-music-btn');
    const music = document.getElementById('bg-music');

    playButton.addEventListener('click', () => {
        music.play().catch(e => {
            console.log("Playback failed:", e);
        });
        playButton.style.display = "none"; // sembunyikan setelah klik
    });
});
