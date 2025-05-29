// const designCarousel = document.getElementById("designPageSectionCarousel");
// const designContent = 1400;

// let isTransitioning = false;

// function moveNext() {
//     if (isTransitioning) return;
//     isTransitioning = true;

//     designCarousel.style.transition = 'transform 0.5s ease';
//     designCarousel.style.transform = `translate(-${designContent}px)`;

//     designCarousel.addEventListener("transitionend", function nextHandler() {
//         const first = designCarousel.firstElementChild;
//         designCarousel.appendChild(first);
//         designCarousel.style.transition = "none";
//         designCarousel.style.transform = "translateX(0)";
//         designCarousel.removeEventListener("transitionend", nextHandler);
//         isTransitioning = false;
//     });
// }

// function movePrev() {
//     if (isTransitioning) return;
//     isTransitioning = true;

//     const last = designCarousel.lastElementChild;
//     designCarousel.insertBefore(last, designCarousel.firstElementChild);
//     designCarousel.style.transition = "none";
//     designCarousel.style.transform = `translateX(-${designContent}px)`;

//     requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//             designCarousel.style.transition = "transform 0.5s ease";
//             designCarousel.style.transform = "translateX(0)";
//         });
//     });

//     designCarousel.addEventListener("transitionend", function prevHandler() {
//         designCarousel.removeEventListener("transitionend", prevHandler);
//         isTransitioning = false;
//     });
// }

// document.getElementById("nextBtn").addEventListener("click", moveNext);
// document.getElementById("prevBtn").addEventListener("click", movePrev);


const designCarousel = document.getElementById("designPageSectionCarousel");
const designContent = 1400;
let isTransitioning = false;

// Check if screen width is 1440px or larger
const mediaQuery = window.matchMedia("(min-width: 1440px)");

function moveNext() {
    if (!mediaQuery.matches || isTransitioning) return;
    isTransitioning = true;

    designCarousel.style.transition = 'transform 0.5s ease';
    designCarousel.style.transform = `translateX(-${designContent}px)`;

    designCarousel.addEventListener("transitionend", function nextHandler() {
        const first = designCarousel.firstElementChild;
        designCarousel.appendChild(first);
        designCarousel.style.transition = "none";
        designCarousel.style.transform = "translateX(0)";
        designCarousel.removeEventListener("transitionend", nextHandler);
        isTransitioning = false;
    });
}

function movePrev() {
    if (!mediaQuery.matches || isTransitioning) return;
    isTransitioning = true;

    const last = designCarousel.lastElementChild;
    designCarousel.insertBefore(last, designCarousel.firstElementChild);
    designCarousel.style.transition = "none";
    designCarousel.style.transform = `translateX(-${designContent}px)`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            designCarousel.style.transition = "transform 0.5s ease";
            designCarousel.style.transform = "translateX(0)";
        });
    });

    designCarousel.addEventListener("transitionend", function prevHandler() {
        designCarousel.removeEventListener("transitionend", prevHandler);
        isTransitioning = false;
    });
}

// Add event listeners only if screen width is 1440px or larger
function setupCarousel() {
    if (mediaQuery.matches) {
        document.getElementById("nextBtn").addEventListener("click", moveNext);
        document.getElementById("prevBtn").addEventListener("click", movePrev);
    }
}

// Remove event listeners if screen width is below 1440px
function cleanupCarousel() {
    document.getElementById("nextBtn").removeEventListener("click", moveNext);
    document.getElementById("prevBtn").removeEventListener("click", movePrev);
}

// Initial setup
setupCarousel();

// Handle window resize to add/remove event listeners dynamically
mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
        setupCarousel();
    } else {
        cleanupCarousel();
    }
});