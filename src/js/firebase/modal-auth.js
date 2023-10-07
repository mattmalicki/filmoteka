const obj = {
  modal: document.querySelector('#modal'),
  modalHeader: document.querySelector('.modal-auth__title'),
  modalForm: document.querySelector('.modal-auth__form'),
  registerText: document.querySelector('.modal-auth__form-text'),
  loginButton: document.querySelector('#form-send'),
  registerButton: document.querySelector('#type-auth-btn'),
  openModalBtn: document.querySelector('#open-modal-btn'),
  openModalBtnSticky: document.querySelector('#open-modal-btn-sticky'),
  closeModalBtn: document.querySelector('#close-modal-btn'),
  inputFields: document.querySelectorAll('.modal-auth__form-input'),
};

const ModalHeaderText = obj.modalHeader.textContent;
const RegisterText = obj.registerText.textContent;
const RegisterButton = obj.loginButton.textContent;

obj.openModalBtn.addEventListener('click', openModal);
obj.openModalBtnSticky.addEventListener('click', openModal);
obj.closeModalBtn.addEventListener('click', closeModal);
obj.registerButton.addEventListener('click', register);

obj.inputFields.forEach(inputField => {
  inputField.addEventListener('click', handleInputFieldClick);
});

function openModal() {
  obj.modal.style.display = 'block';
  setInputFieldValidation();
}

function closeModal() {
  obj.modal.style.display = 'none';
  handleRegisterButtonClick();
}

window.onclick = function (event) {
  if (event.target === obj.modal) {
    closeModal();
  }
};

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' || event.code === 27) {
    closeModal();
  }
});

function register(event) {
  event.preventDefault();
  const isRegister = obj.modalHeader.textContent !== 'Register';
  obj.modalHeader.textContent = isRegister ? 'Register' : ModalHeaderText;
  obj.registerText.textContent = isRegister ? 'I have an account' : RegisterText;
  obj.registerButton.textContent = isRegister ? 'Auth' : 'Register';
  obj.loginButton.textContent = isRegister ? 'Register' : RegisterButton;

  handleRegisterButtonClick();
}

function validateInputField(inputField) {
  const isValid = inputField.checkValidity();
  inputField.style.borderBottom = isValid ? '2px solid green' : '2px solid red';
  inputField.style.color = isValid ? 'green' : 'red';
}

function addInputValidationListeners(inputFields) {
  inputFields.forEach(inputField => {
    inputField.addEventListener('input', () => {
      validateInputField(inputField);
    });
    inputField.addEventListener('blur', () => {
      if (inputField.value === '') {
        inputField.style.borderBottom = '2px solid red';
      }
    });
  });
}

function clearInputFieldStyles(inputFields) {
  inputFields.forEach(inputField => {
    inputField.style.borderBottom = '';
    inputField.style.color = '';
  });
}

function setInputFieldValidation({ inputFields, registerButton } = obj) {
  addInputValidationListeners(inputFields);
  registerButton.addEventListener('click', () => {
    clearInputFieldStyles(inputFields);
  });
}

function handleInputFieldClick() {
  this.classList.add('clicked');
}

function handleRegisterButtonClick() {
  obj.inputFields.forEach(inputField => {
    inputField.classList.remove('clicked');
    inputField.value = '';
    inputField.style.borderBottom = '';
  });
}
