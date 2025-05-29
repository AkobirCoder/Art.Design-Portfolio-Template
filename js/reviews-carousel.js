let intervalId = null;
let currentIndex = 0;
let isMoving = false;

function startCarousel() {
  const track = document.querySelector('.reviewsTrack');
  let items = document.querySelectorAll('.reviewsSectionContentItems');

  // Agar elementlar mavjud bo'lmasa, funksiyani to'xtatamiz
  if (!track || items.length === 0) return;

  const itemWidth = items[0].offsetWidth;

  // Duplicate first item and append (faqat bir marta qo‘shilishi uchun tekshiramiz)
  if (items.length === track.children.length) {
    const firstClone = items[0].cloneNode(true);
    track.appendChild(firstClone);
  }

  items = document.querySelectorAll('.reviewsSectionContentItems');

  function moveToSlide(index) {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${itemWidth * index}px)`;
  }

  function jumpToStart() {
    track.style.transition = 'none';
    track.style.transform = `translateX(0px)`;
    currentIndex = 0;
  }

  intervalId = setInterval(() => {
    if (isMoving) return;
    isMoving = true;

    currentIndex++;
    moveToSlide(currentIndex);

    if (currentIndex >= items.length - 1) {
      setTimeout(() => {
        jumpToStart();
      }, 500);
    }

    setTimeout(() => {
      isMoving = false;
    }, 600);
  }, 5000);
}

function stopCarousel() {
  clearInterval(intervalId);
  intervalId = null;
}

// Ekran o'lchamiga qarab carouselni boshlash yoki to'xtatish
function handleResize() {
  if (window.innerWidth >= 1440) {
    if (!intervalId) {
      currentIndex = 0;
      isMoving = false;
      startCarousel();
    }
  } else {
    stopCarousel();
  }
}

// Dastlab sahifa yuklanganda tekshiramiz
window.addEventListener('load', handleResize);

// Har safar o'lcham o'zgarsa tekshirib boramiz
window.addEventListener('resize', handleResize);