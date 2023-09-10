
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
  const btn = document.querySelectorAll('.btn');
  const loginFailed = document.querySelector('#loginFailed');
  const registerFailed = document.querySelector('#registerFailed');
  const registerSuccess = document.getElementById('registerSuccess');
    const loginSuccess  = document.getElementById('loginSuccess');


  // Function to display the registration form
function displayRegisterForm() {
  loginMain.style.display = 'none';
  registerMain.style.display = 'flex';
  shortenerMain.style.display = 'none';
  urlList.style.display = 'none';
}

// Function to display the login form
function displayLoginForm() {
  loginMain.style.display = 'flex';
  registerMain.style.display = 'none';
  shortenerMain.style.display = 'none';
  urlList.style.display = 'none';
}

// Function to show the shortener form and URL list
function showShortenerAndList() {
  shortenerMain.style.display = 'flex';
  urlList.style.display = 'flex';
  loginMain.style.display = 'none';
  registerMain.style.display = 'none';
}


  // Event listener for the "Sign Up" link
registerUrl.forEach((element) => {
  element.addEventListener('click', () => {
    displayRegisterForm(); // Call the function to display the registration form
  });
});

// Event listener for the "Log In" link
loginUrl.forEach((element) => {
  element.addEventListener('click', () => {
    displayLoginForm(); // Call the function to display the login form
  });
});

  // Event listener for the failed forms
  btn.forEach((element) => {
    element.addEventListener('click',submitFailed);
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

  // Function to toggle between login and register forms
  function submitFailed() {
   loginFailed.style.display = 'none';
   registerFailed.style.display = 'none';
   loginSuccess.style.display = 'none';
   registerSuccess.style.display = 'none';
  }


  // Event listeners for the menu button and close button
  menuBtn.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);

});
