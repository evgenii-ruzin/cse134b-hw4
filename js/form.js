document.addEventListener('DOMContentLoaded', init);

function init() {

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
  }

  const root = document.documentElement;

  theme_toggle(localStorage.getItem('theme'));

  document.querySelector('header').style.display = 'flex';

  const form = document.getElementById('form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const commentInput = document.getElementById('comments');
  const submitButton = document.getElementById('submit');

  const commentInfo = document.getElementById('comments-length');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');

  const errors = document.getElementById('form_errors');
  const form_errors = [];

  const theme_button = document.getElementById('theme-toggle');

  nameInput.addEventListener('keypress', e => {
    const pattern = /^[A-Za-z ]$/;
    console.log(pattern);

    if (!pattern.test(e.key)) {
      e.preventDefault();

      form_errors.push({field: "Name", value: e.key, reason: "Invalid key"});

      nameInput.classList.add('error');
      nameError.textContent = `Name should have the form of 'FirstName LastName'`;
      nameError.classList.add('error');
      nameError.classList.remove('no-error');

      setTimeout(() => {
        nameInput.classList.remove('error');
        nameError.classList.add('no-error');
        nameError.classList.remove('error');
      }, 1500);
    }
  })

  nameInput.addEventListener('input', (e) => {
    nameInput.setCustomValidity('');
    if (nameInput.validity.valueMissing) {
      form_errors.push({field: "Name", value: nameInput.value, reason: "Value missing"});
      nameInput.setCustomValidity('Name is required');
      nameError.textContent = 'Name is required';
      nameError.classList.add('error');
      nameError.classList.remove('no-error');
    }
    else if (nameInput.validity.tooShort || nameInput.validity.patternMismatch) {
      form_errors.push({field: "Name", value: nameInput.value, reason: "Value doesn't match the pattern"});
      nameInput.setCustomValidity('Make sure the name is at least 3 characters long and has a format of \'FirstName LastName\'');
      nameError.textContent = `Name should have the form of 'FirstName LastName'`;
      nameError.classList.add('error');
      nameError.classList.remove('no-error');
    }
    else {
      nameError.classList.add('no-error');
      nameError.classList.remove('error');
    }
  })

  emailInput.addEventListener('input', (e) => {
    emailInput.setCustomValidity('');

    if (emailInput.validity.valueMissing) {
      form_errors.push({field: "Email", value: emailInput.value, reason: "Value missing"});
      emailInput.setCustomValidity('Email is required');
      emailError.textContent = 'Email is required';
      emailError.classList.add('error');
      emailError.classList.remove('no-error');
    }
    else if (emailInput.validity.typeMismatch) {
      form_errors.push({field: "Email", value: emailInput.value, reason: "Value doesn't match the pattern"});
      emailInput.setCustomValidity('Please enter a valid email, ex. mail@domain.com');
      emailError.textContent = 'Invalid email address';
      emailError.classList.add('error');
      emailError.classList.remove('no-error');
    }
    else {
      emailError.classList.add('no-error');
      emailError.classList.remove('error');
    }
  })

  commentInput.addEventListener('input', (e) => {
    const len = commentInput.value.length;
    commentInfo.textContent = `Characters left - ${200 - len}`;
    if (len === 200) {
      commentInfo.style.color = 'black';
    }
    else {
      commentInfo.style.color = `color-mix(in srgb, green ${((200 - len) / 200) * 100}%, red ${(len / 200) * 100}%)`;
    }
  })

  theme_button.addEventListener('click', e => {
    if (localStorage.getItem('theme') === 'light') {
      theme_toggle('dark');
    }
    else {
      theme_toggle('light');
    }
  })

  submitButton.addEventListener('click', (e) => {
    errors.value = JSON.stringify(form_errors);

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector('fieldset>*:invalid');

      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });

        firstInvalid.reportValidity();
      }

      return;
    }

    form.submit();
  })
}

function theme_toggle(theme) {
  const root = document.documentElement;
  const theme_button = document.getElementById('theme-toggle');

  if (theme === 'light') {
    localStorage.setItem('theme', 'light');
    root.style.setProperty('--theme-text-color', 'black');
    root.style.setProperty('--theme-bg-color', 'white');
    root.style.setProperty('--theme-button-bg', 'lightgrey');
    theme_button.innerHTML = `<img src="assets/theme-icons/moon.svg" alt="moon icon">`;
  }
  else {
    localStorage.setItem('theme', 'dark');
    root.style.setProperty('--theme-text-color', '#c5c8c6');
    root.style.setProperty('--theme-bg-color', '#282e40');
    root.style.setProperty('--theme-button-bg', '#282e40');
    theme_button.innerHTML = `<img src="assets/theme-icons/sun.svg" alt="sun icon">`;
  }
}