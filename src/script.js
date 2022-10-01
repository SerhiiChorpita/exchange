const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
const newNumForm = (num) => new Intl.NumberFormat('en-US').format(num);
let currentExchange = '';

function createElement(allData) {
    let val = document.getElementById('num-to-input').value;

    return allData.forEach(element => {
        let newP = document.createElement('p');
        const textnode = document.createTextNode(currentExchange);
        newP.appendChild(textnode);
        document.querySelector('.main-block__section2').appendChild(newP)
        currentExchange = (`${newNumForm(val).replaceAll(',', ' ')} грн = купити: ${newNumForm((val / element.buy).toFixed(0)).replaceAll(',', ' ')} ${(element.ccy).toString()}; продати: ${newNumForm((val / element.sale).toFixed(0)).replaceAll(',', ' ')} ${(element.ccy).toString()}`);
    });
}

// function clearField() {
//     dataLength = document.querySelector('.main-block__section2').children.length;
//     if (dataLength) {
//         for (i = 0; i < dataLength; i++) {
//             let child = document.querySelector('p');
//             document.querySelector('.main-block__section2').removeChild(child);
//         }
//     }
// }

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

