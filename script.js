const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const formData = new FormData(e.target);

    const mortgageAmount = formData.get('mortgage-amount')
    const mortgageTerm = formData.get('mortgage-term')
    const interestRate = formData.get('interest-rate')
    const mortgageType = formData.get('mortgage-type')

    calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType);

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