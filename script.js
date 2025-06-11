const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();

    let numRegex = /^\d+$/;
    let floatRegex = /^\d*\.?\d*$/;

    const formData = new FormData(e.target);

    const mortgageAmount = formData.get('mortgage-amount').trim();
    const mortgageTerm = formData.get('mortgage-term').trim();
    const interestRate = formData.get('interest-rate').trim();
    const mortgageType = formData.get('mortgage-type');

    /* Error Handling */

    if (mortgageAmount === '' || mortgageTerm === '' || interestRate === '') {
        console.log('error 1')
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

function updateForm(value, total) {

    const repaymentDiv = document.querySelector('.repayment-amount');
    const totalRepaymentDiv = document.querySelector('.total-repayment');

    repaymentDiv.innerHTML = '£' + value;
    totalRepaymentDiv.innerHTML = '£' + total;

}

const clearButton = document.querySelector('#clearBtn');

clearButton.addEventListener('click', function (e) {
    e.preventDefault();
    const form = e.target.form;

    form.reset();

})