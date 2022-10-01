const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
const newNumForm = (num) => new Intl.NumberFormat('en-US').format(num);
let currentExchange = '';

function createElement(allData) {
    let val = document.getElementById('num-to-input').value;

    if (val > 0) {
        return allData.forEach(element => {
            let newP = document.createElement('p');
            const textnode = document.createTextNode(currentExchange);
            newP.appendChild(textnode);
            document.querySelector('.main-block__section2').appendChild(newP)
            currentExchange = (`${newNumForm(val).replaceAll(',', ' ')} грн = купити: ${newNumForm((val / element.buy).toFixed(0)).replaceAll(',', ' ')} ${(element.ccy).toString()}; продати: ${newNumForm((val / element.sale).toFixed(0)).replaceAll(',', ' ')} ${(element.ccy).toString()}`);
        });
    } else if (val < 1) {
        alert('Введіть число більше нуля')
    }
}

function clearInput() {
    return document.getElementById('num-to-input').value = '';
}

document.querySelector('.exchange-btn').onclick = function () {
    fetch(url)
        .then(resp => resp.json())
        .then(allData => createElement(allData))
        .then(() => clearInput())
        .catch(error => console.log(error))
}