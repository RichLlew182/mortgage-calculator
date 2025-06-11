const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');

const errorMortgageAmount = document.querySelector('.error-mortgage-amount')

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const mortgageAmountInput = document.querySelector('input[name="mortgage-amount"]');
    const mortgageTermInput = document.querySelector('input[name="mortgage-term"]');
    const interestRateInput = document.querySelector('input[name="interest-rate"]');
    const mortgageTypeInput = document.querySelector('input[name="mortgage-type"]');

    const mortgageAmount = mortgageAmountInput.value.trim();
    const mortgageTerm = mortgageTermInput.value.trim();
    const interestRate = interestRateInput.value.trim();
    const mortgageType = mortgageTypeInput.value.trim();

    /* Error Handling */

    let numRegex = /^\d+$/;
    let floatRegex = /^\d*\.?\d*$/;

    if (mortgageAmount === '') {
        errorMortgageAmount.innerHTML = 'This is a required field';
        mortgageAmountInput.classList.add('error')
    }

    else if (numRegex.test(mortgageAmount) !== true || numRegex.test(mortgageTerm) !== true || floatRegex.test(interestRate) !== true) {
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