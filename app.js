let dropdownOpt = document.querySelectorAll(".exchange select");

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
    });
}


const changeFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

