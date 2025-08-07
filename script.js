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


// let currentIndex = 0;
// const slidesToShow = 2;
// const totalPages = Math.ceil(slides.length / slidesToShow);

// // Generate dots
// for (let i = 0; i < totalPages; i++) {
//   const dot = document.createElement('span');
//   if (i === 0) dot.classList.add('active');
//   dotsContainer.appendChild(dot);
// }

// const dots = document.querySelectorAll('.carousel-dots span');

// function updateCarousel() {
//   carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
//   dots.forEach(dot => dot.classList.remove('active'));
//   dots[currentIndex].classList.add('active');
// }

// nextBtn.addEventListener('click', () => {
//   currentIndex = (currentIndex + 1) % totalPages;
//   updateCarousel();
// });

// prevBtn.addEventListener('click', () => {
//   currentIndex = (currentIndex - 1 + totalPages) % totalPages;
//   updateCarousel();
// });

// dots.forEach((dot, index) => {
//   dot.addEventListener('click', () => {
//     currentIndex = index;
//     updateCarousel();
//   });
// });