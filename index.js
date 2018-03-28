var balance = document.getElementById('balance');
var pbalance = document.getElementById('pbalance');
var amount = document.getElementById('amount');
var wallet = document.getElementById('wallet');

var currentBalance = 0;

var regExp = /^\d+(?:\.\d+)?$/;

window.onload = function () {
    axios.get('https://icospy.lambda-bots.com/admin/balance')
        .then(function (response) {
            balance.innerHTML = 'Balance: ' + response.data.result.balance;
            currentBalance = response.data.result.balance;
            pbalance.innerHTML = 'Pending balance: ' + response.data.result.pendingBalance;
        })
        .catch(function (error) {
            console.log(error);
        });

}

window.onsubmit = function (e) {
    e.preventDefault();

    if (!amount.value || !wallet.value) return;

    if (!regExp.test(amount.value)) {
        alert("Please type an amount that you want to withdraw");
        return;
    }

    var data = {
        amount: amount.value,
        wallet: wallet.value
    }
    amount.value = '';
    wallet.value = '';

    if (amount.value < currentBalance) {
        axios.post('https://icospy.lambda-bots.com/admin/withdraw', data)
            .then(function (response) {
                alert(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        alert("Seem like you don't have enough money on this wallet.");
    }


}





