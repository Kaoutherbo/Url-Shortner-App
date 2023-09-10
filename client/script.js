
document.addEventListener('DOMContentLoaded', () => {
  // DOM Element Selection
  const loginUrl = document.querySelectorAll('.loginUrl');
  const registerUrl = document.querySelectorAll('.registerUrl');
  const homeUrl = document.querySelector('.home');
  const urlList = document.querySelector('#url-list');
  const shortenerMain = document.getElementById('shortener-form');
  const loginMain = document.querySelector('.loginForm');
  const registerMain = document.querySelector('.registerForm');
  const menuBtn = document.querySelector('.menu');
  const closeBtn = document.querySelector('.close');
  const navMenu = document.querySelector('.list');

  // Function to toggle between login and register forms
  function toggleLoginRegister() {
    const isLoginFormVisible = loginMain.style.display === 'flex';
    loginMain.style.display = isLoginFormVisible ? 'none' : 'flex';
    registerMain.style.display = isLoginFormVisible ? 'flex' : 'none';
    shortenerMain.style.display = 'none';
    urlList.style.display = 'none';
  }

  // Function to show the URL shortener and list
  function showShortenerAndList() {
    shortenerMain.style.display = 'flex';
    urlList.style.display = 'flex';
    loginMain.style.display = 'none';
    registerMain.style.display = 'none';
  }

  // Event listeners for login and register links
  loginUrl.forEach((element) => {
    element.addEventListener('click', toggleLoginRegister);
  });
  registerUrl.forEach((element) => {
    element.addEventListener('click', toggleLoginRegister);
  });

  // Event listener for the home link
  homeUrl.addEventListener('click', showShortenerAndList);

  // Function to toggle the navigation menu
  function toggleMenu() {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuBtn.style.display = 'block';
      closeBtn.style.display = 'none';
    } else {
      navMenu.classList.add('active');
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'block';
    }
  }

  // Event listeners for the menu button and close button
  menuBtn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
});
