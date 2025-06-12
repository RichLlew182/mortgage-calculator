const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');
const formInputs = document.querySelectorAll('#mortgageCalculatorForm input:not([type="radio"])');
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

let errorMessage = 'This is a required field';

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();
    let hasError = false;

    const mortgageAmount = mortgageAmountInput.value.trim();
    const mortgageTerm = mortgageTermInput.value.trim();
    const interestRate = interestRateInput.value.trim();
    const mortgageType = mortgageTypeInput.value.trim();

    const numRegex = /^\d+$/;

    formInputs.forEach(function (el) {

        console.log(el)

        if (el.value === '') {
            el.classList.add('error');
            el.nextElementSibling.innerHTML = errorMessage;
            hasError = true

        }

        else if (!numRegex.test(el.value)) {
            el.classList.add('error');
            el.nextElementSibling.innerHTML = 'Must be a number';
            hasError = true
        }

        else {
            hasError = false;
        }

    })

    if (hasError) {
        return; // Stop further processing
    } else {
        console.log('success');
        console.log(mortgageAmount, mortgageTerm, interestRate, mortgageType);
        calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType);
    }

    /* Error Handling */

    // let numRegex = /^\d+$/;
    // let floatRegex = /^\d*\.?\d*$/;

    // Hardcoded empty string

    // console.log(numRegex.test(mortgageAmount));

    // if (!numRegex.test(mortgageAmount)) {
    //     mortgageAmountInput.classList.add('error');
    //     mortgageAmountInput.nextElementSibling.innerHTML = 'Mortgage Amount must be a number';
    // }

    // else if (numRegex.test(mortgageTerm) !== true) {
    //     mortgageTermInput.classList.add('error');
    //     mortgageTermInput.nextElementSibling.innerHTML = 'Mortgage Term must be a number';
    // }

    // else if (floatRegex.test(interestRate) !== true) {
    //     interestRateInput.classList.add('error');
    //     interestRateInput.nextElementSibling.innerHTML = 'Interest Rate must be a number';
    // }




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
    emptyResults.style.display = 'block';
    formInputs.forEach(function (el) {

        el.classList.remove('error');
        el.nextElementSibling.innerHTML = ''
    })

})