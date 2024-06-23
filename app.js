let dropdownOpt = document.querySelectorAll(".exchange select");
let button = document.querySelector(".btn button");

for (let select of dropdownOpt) {
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
        if(select.name === "from" && newOption.value === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && newOption.value === "INR"){
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change" , (event) => {
        changeFlag(event.target);
        let outSta = document.querySelector(".output p");
        outSta.innerText = "";
    });
}

const changeFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};



const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '38b82a4a0emsh2c3e85f48854b91p1d1480jsne5ebf28e2c59',
		'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};

let answer = async (fromCurr,toCurr) => {
    let inputValue = parseInt(document.querySelector("input").value);
    let ansUrl = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${fromCurr}&to=${toCurr}%2CGBP`;
	const response = await fetch(ansUrl, options);
	const result = await response.json();
    let fromCurrVal = null;
    let toCurrVal = null;
    let fromCurrCode = fromCurr;
    let toCurrCode = toCurr;
    if(result.rates.hasOwnProperty(fromCurr)){
        fromCurrVal = `${result.rates[fromCurr]}`;
    }
    if(result.rates.hasOwnProperty(toCurr)){
        toCurrVal = `${result.rates[toCurr]}`;
    }
    statementMaker(inputValue,fromCurrCode,toCurrCode,fromCurrVal,toCurrVal);
} 

let statementMaker = (inputValue,fromCurrCode,toCurrCode,fromCurrVal,toCurrVal) => {
    let Calcresult = ((1/fromCurrVal) * inputValue) * toCurrVal;
    let statement = document.querySelector(".output p");
    if(inputValue > 0 && inputValue !== 0 && inputValue !== null ){
        statement.innerText = `${inputValue} ${fromCurrCode} = ${Calcresult.toFixed(2)} ${toCurrCode}`
    }
    else{
        statement.innerText = 'Enter a valid amount';
    }
}

button.addEventListener('click' , (e) => {
    e.preventDefault();
        let toCurr = document.querySelector("select[name='to']").value;
        let fromCurr = document.querySelector("select[name='from']").value;
        answer(fromCurr,toCurr);
})

// let theme = document.querySelector("#checkboxInput");
// theme.addEventListener("click", () => {
//     let body = document.querySelector("body");
//     let navbar = document.querySelector("navbar");
//     let footer = document.querySelector("footer");
//     let form = document.querySelector("form");
//     let submit = document.querySelector("button");

//     body.classList.toggle("darkBody");
//     navbar.classList.toggle("darkNav");
//     footer.classList.toggle("darkNav");
//     submit.classList.toggle("darkbtn");
//     form.classList.toggle("darkform");
// });