// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dynamic Product Loading
const products = [
  { name: 'Notebook Set', description: 'Perfect for creative minds.', image: 'product1.jpg' },
  { name: 'Desk Organizer', description: 'Keep your workspace tidy.', image: 'product2.jpg' },
  { name: 'Gift Pack', description: 'Great for special occasions.', image: 'product3.jpg' },
];

const productList = document.querySelector('.product-list');

products.forEach(product => {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');
  productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <button class="btn">View More</button>
  `;
  productList.appendChild(productDiv);
});
