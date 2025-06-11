const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const formData = new FormData(e.target);

    const mortgageAmount = formData.get('mortgage-amount')
    const mortgageTerm = formData.get('mortgage-term')
    const interestRate = formData.get('interest-rate')
    const mortgageType = formData.get('mortgage-type')

    console.log('Mortgage Amount: ' + mortgageAmount);
    console.log('Mortgage Term: ' + mortgageTerm);
    console.log('Interest Rate: ' + interestRate);
    console.log('Mortgage Type: ' + mortgageType);

    calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType);

})

function calculateRepayments(mortgageAmount, mortgageTerm, interestRate, mortgageType) {

    const payments = mortgageTerm * 12;
    const monthlyInterest = interestRate / 100 / 12;
    const interestOnly = mortgageAmount * monthlyInterest;
    const capitalRepayment = mortgageAmount * monthlyInterest * Math.pow(1 + monthlyInterest, payments) / (Math.pow(1 + monthlyInterest, payments) - 1)

    console.log({ capitalRepayment });
    console.log({ monthlyInterest })
    console.log({ interestOnly })
    console.log(capitalRepayment + monthlyInterest)

    if (mortgageType === 'Repayment') {
        updateForm(capitalRepayment.toFixed(2))
    }
    else {
        updateForm(interestOnly.toFixed(2))
    }

}

function updateForm(value) {

    const repaymentDiv = document.querySelector('.repayment-amount');

    repaymentDiv.innerHTML = '£' + value

}

const clearButton = document.querySelector('#clearBtn');

clearButton.addEventListener('click', function (e) {
    e.preventDefault();
    const form = e.target.form;

    form.reset();

})