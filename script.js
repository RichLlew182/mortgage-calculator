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

})