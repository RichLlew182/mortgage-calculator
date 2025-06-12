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

let errorMessage = 'This field is required';

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();

    let hasError = false;

    const formData = new FormData(mortgageCalculatorForm);
    const mortgageType = formData.get('mortgage-type');
    const mortgageAmount = formData.get('mortgage-amount');
    const mortgageTerm = formData.get('mortgage-term');
    const interestRate = formData.get('interest-rate');

    const numRegex = /^\d*\.?\d*$/

    formInputs.forEach(function (el) {

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
        return;
    } else {
        console.log('success');

        calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType);
    }

})

function calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType) {

    console.log(mortgageAmount, mortgageTerm, interestRate, mortgageType);

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