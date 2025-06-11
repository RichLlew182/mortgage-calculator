const mortgageCalculatorForm = document.querySelector('#mortgageCalculatorForm');

mortgageCalculatorForm.addEventListener('submit', function (e) {

    e.preventDefault();
    console.log(e);

    const formData = new FormData(e.target);

    console.log(formData)

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

    const interestRateDecimal = interestRate / 100;
    console.log('Interest Rate Decimal: ' + interestRateDecimal)

    const payments = mortgageTerm * 12;
    const monthlyPayment = (mortgageAmount / payments).toFixed(2);
    const monthlyInterest = ((mortgageAmount * interestRateDecimal) / 12).toFixed(2);
    const capitalRepayment = monthlyPayment; + monthlyInterest;;

    console.log({ capitalRepayment });
    console.log({ monthlyInterest })



}

const clearButton = document.querySelector('#clearBtn');

clearButton.addEventListener('click', function (e) {
    e.preventDefault();
    const form = e.target.form;

    form.reset();

})