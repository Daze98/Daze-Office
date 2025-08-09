const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
let startX = 0; // For swipe detection
let endX = 0;

function showImage(index) {
  lightboxImg.src = galleryImages[index].src;
  currentIndex = index;
}

// Open lightbox
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    showImage(index);
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigation
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// Swipe support for mobile
lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  let diffX = startX - endX;
  if (Math.abs(diffX) > 50) { // Minimum swipe distance
    if (diffX > 0) {
      // Swipe left → next image
      currentIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      // Swipe right → previous image
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    showImage(currentIndex);
  }
}
