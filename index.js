var balance = document.getElementById('balance');
var pbalance = document.getElementById('pbalance');
var amount = document.getElementById('amount');
var wallet = document.getElementById('wallet');

var currentBalance = 0;


window.onload = function () {
    axios.get('https://icospy.lambda-bots.com/admin/balance')
        .then(function (response) {
            balance.innerHTML = 'Balance: ' + response.data.result.balance || currentBalance;
            currentBalance = response.data.result.balance;
            pbalance.innerHTML = 'Pending balance: ' + response.data.result.pendingBalance;
        })
        .catch(function (error) {
            console.log(error);
        });

}

window.onsubmit = function (e) {
    e.preventDefault();

    var data = {
        amount: amount.value,
        wallet: wallet.value
    }
    // amount.value = '';
    // wallet.value= '';
    console.log(typeof JSON.stringify(data))

    if (amount.value >= currentBalance) {
        axios.post('https://icospy.lambda-bots.com/admin/send', data)
            .then(function (response) {
                console.log(response);
                alert('PRIVET');
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        alert("Seem like you don't have enough money on this wallet :(")
    }


}





