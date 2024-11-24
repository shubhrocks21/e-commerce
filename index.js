
// script.js

// Smooth Scroll Functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dynamic Product Showcase
const products = [
  {
    image: 'product1.jpg',
    name: 'Stylish Notebooks',
    description: 'Perfect for students and professionals.',
  },
  {
    image: 'product2.jpg',
    name: 'Gift Sets',
    description: 'Ideal for birthdays and special occasions.',
  },
  {
    image: 'product3.jpg',
    name: 'Colorful Pens',
    description: 'Brighten your notes and sketches!',
  },
  {
    image: 'product4.jpg',
    name: 'Creative Desk Organizers',
    description: 'Keep your workspace tidy and stylish.',
  },
];

const productList = document.querySelector('.product-list');

function loadProducts() {
  productList.innerHTML = ''; // Clear existing content
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="btn">View Details</button>
    `;
    productList.appendChild(productElement);
  });
}

loadProducts();

// Contact Form Validation
const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const message = document.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert('Thank you for your message! We will get back to you soon.');
  contactForm.reset(); // Reset the form after submission
});

// Email Validation Helper Function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
