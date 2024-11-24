// Smooth scrolling for Explore Now button
document.querySelector('.btn').addEventListener('click', () => {
  document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
});
