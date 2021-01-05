// FROM BOOTSRAP Example starter JavaScript for
// disabling form submissions if there are invalid fields
(function () {
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
}());
// })();

const buttonRegister = document.querySelector('#facebook-register');
buttonRegister.addEventListener('click', function () {
  const inputElement = document.querySelectorAll('input');
  let textToPrint = '';
  for (let i = 2; i < 7; i += 1) {
    if (inputElement[i].validity.valid === false) {
      textToPrint = 'Dados inválidos';
      break;
    }
    textToPrint += `${inputElement[i].value} - `;
  }
  for (let i = 7; i < 10; i += 1) {
    if (inputElement[i].validity.valid === false) {
      textToPrint = 'Dados inválidos';
      break;
    }
    if (inputElement[i].checked) {
      textToPrint += `${inputElement[i].value} - `;
    }
  }
  alert(textToPrint);
});
