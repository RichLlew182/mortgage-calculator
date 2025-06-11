const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');

const formInputs = document.querySelectorAll('form input');

console.log(formInputs);

const mortgageAmountInput = document.querySelector('input[name="mortgage-amount"]');
const mortgageTermInput = document.querySelector('input[name="mortgage-term"]');
const interestRateInput = document.querySelector('input[name="interest-rate"]');
const mortgageTypeInput = document.querySelector('input[name="mortgage-type"]');

formInputs.forEach(function (el) {

    el.addEventListener('input', function () {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            this.nextElementSibling.innerHTML = ''
        }
    })

})

// mortgageAmountInput.addEventListener('input', function () {
//     if (this.classList.contains('error')) {
//         this.classList.remove('error');
//         this.nextElementSibling.innerHTML = ''
//     }
// })

const errorMessage = 'This is a required field';

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const mortgageAmount = mortgageAmountInput.value.trim();
    const mortgageTerm = mortgageTermInput.value.trim();
    const interestRate = interestRateInput.value.trim();
    const mortgageType = mortgageTypeInput.value.trim();

    /* Error Handling */

    let numRegex = /^\d+$/;
    let floatRegex = /^\d*\.?\d*$/;

    if (mortgageAmount === '') {
        mortgageAmountInput.nextElementSibling.innerHTML = errorMessage;
        mortgageAmountInput.classList.add('error');
    } else {
        mortgageAmountInput.nextElementSibling.innerHTML = '';
        mortgageAmountInput.classList.remove('error');
    }

    if (mortgageTerm === '') {
        mortgageTermInput.nextElementSibling.innerHTML = errorMessage;
        mortgageTermInput.classList.add('error');
    }

    if (interestRate === '') {
        interestRateInput.nextElementSibling.innerHTML = errorMessage;
        interestRateInput.classList.add('error');
    }

    if (numRegex.test(mortgageAmount) !== true || numRegex.test(mortgageTerm) !== true || floatRegex.test(interestRate) !== true) {
        console.log('error 2')
    } else {
        console.log('success')
        calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType);
    }


})

function calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType) {

    const payments = mortgageTerm * 12;
    const monthlyInterest = interestRate / 100 / 12;
    const interestOnly = mortgageAmount * monthlyInterest;
    const capitalRepayment = mortgageAmount * monthlyInterest * Math.pow(1 + monthlyInterest, payments) / (Math.pow(1 + monthlyInterest, payments) - 1);

    const totalRepayment = payments * capitalRepayment;
    const totalInterest = payments * interestOnly;

    if (mortgageType === 'Repayment') {
        updateForm(capitalRepayment.toFixed(2), totalRepayment.toFixed(2))
    }
    else {
        updateForm(interestOnly.toFixed(2), totalInterest.toFixed(2))
    }

}

const emptyResults = document.querySelector('.results-empty');
const completedResults = document.querySelector('.results-completed');

const repaymentDiv = document.querySelector('.repayment-amount');
const totalRepaymentDiv = document.querySelector('.total-repayment');

function updateForm(value, total) {

    completedResults.style.display = 'block'
    emptyResults.style.display = 'none'

    repaymentDiv.innerHTML = '£' + value;
    totalRepaymentDiv.innerHTML = '£' + total;

}

const clearButton = document.querySelector('#clearBtn');

clearButton.addEventListener('click', function (e) {
    e.preventDefault();
    const form = e.target.form;

    form.reset();
    completedResults.style.display = 'none';
    emptyResults.style.display = 'block'

})