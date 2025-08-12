const carousel = document.querySelector('.carousel ul');

const dotsContainer = document.querySelector('.carousel-dots');
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const header = document.getElementById("ribbon");

window.addEventListener("scroll", () => {
  if (window.scrollY > 82) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  const isMenuOpen = menu.style.display === "flex";

  // Toggle display
  menu.style.display = isMenuOpen ? "none" : "flex";

  // Toggle image source
  menuIcon.src = isMenuOpen
    ? "./resources/ham-menu.png"
    : "./resources/close.png"; // Make sure this icon exists
}




let slideWidth = slides[0].getBoundingClientRect().width;
let currentIndex = 0;

// 1️⃣ Clone first and last few slides to create the infinite loop
slides.forEach(slide => track.appendChild(slide.cloneNode(true)));
slides.forEach(slide => track.insertBefore(slide.cloneNode(true), track.firstChild));

// Update slides array after cloning
const allSlides = Array.from(track.children);
let totalSlides = allSlides.length;

// 2️⃣ Position track at the "first original slide"
let startIndex = slides.length; 
track.style.transform = `translateX(-${slideWidth * startIndex}px)`;

// 3️⃣ Move Carousel Function
function moveCarousel(direction) {
  currentIndex += direction;
  track.style.transition = "transform 0.4s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * (startIndex + currentIndex)}px)`;

  // 4️⃣ Loop Handling
  track.addEventListener("transitionend", () => {
    if (currentIndex >= slides.length) {
      // If we go past the last real slide
      currentIndex = 0;
      track.style.transition = "none";
      track.style.transform = `translateX(-${slideWidth * startIndex}px)`;
    } else if (currentIndex < 0) {
      // If we go before the first real slide
      currentIndex = slides.length - 1;
      track.style.transition = "none";
      track.style.transform = `translateX(-${slideWidth * (startIndex + currentIndex)}px)`;
    }
  });
}

// 5️⃣ Event Listeners for Buttons
nextBtn.addEventListener("click", () => moveCarousel(1));
prevBtn.addEventListener("click", () => moveCarousel(-1));