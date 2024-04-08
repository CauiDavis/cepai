let road;
let city;
let state;
let district;
let cepStatus;

async function fetchAddress(cep) {
    try {
        const url = `https://cep.awesomeapi.com.br/json/${cep}`;
        const response = await fetch(url);
        const data = await response.json();
        getAddress(data);
    } catch (error) {
        console.error("erro" + error);
        throw error;
    }
}

async function getAddress(address) {
    try {
        road = await address.address;
        city = await address.city;
        state = await address.state;
        district = await address.district;
        cepStatus = await address.code;

        validateCep(cepStatus);
    } catch (error) {
        console.error("erro" + error);
        throw error;
    }
}

function validateCep(cepData) {
    if (cepData === "invalid") {
        alert("Cep inválido!");
        clearInputs();

    }

    else if (cepData == "not_found") {
        alert("Cep não encontrado!");
        clearInputs();

    }

    else {
        receiveAddress();
    }
}

function receiveAddress() {
    const cityInputIn = document.getElementById("city");
    const districtInputIn = document.getElementById("district");
    const roadInputIn = document.getElementById("road");
    const stateInputIn = document.getElementById("state");

    if (cityInputIn && districtInputIn && roadInputIn && stateInputIn) {
        cityInputIn.value = "Cidade " + city;
        districtInputIn.value = "Bairro " + district;
        roadInputIn.value = road;
        stateInputIn.value = "Estado " + state;
    } else {
        console.error("Um ou mais elementos não foram encontrados.");
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchCep();
    }
}

function isNone(value) {
    return (value === undefined || value === null || value === "");
}

async function searchCep() {

    let cep = document.getElementById("cep").value;

    if (isNone(cep)) {
        alert("Digite alguma coisa!");
        return;
    }

    else {
        await fetchAddress(cep);
    }
}

function clearInputs() {
    const cityInput = document.getElementById("city");
    const districtInput = document.getElementById("district");
    const roadInput = document.getElementById("road");
    const cepInput = document.getElementById("cep");
    const stateInput = document.getElementById("state");

    if (cityInput) {
        cityInput.value = "";
    }
    if (districtInput) {
        districtInput.value = "";
    }
    if (roadInput) {
        roadInput.value = "";
    }
    if (cepInput) {
        cepInput.value = "";
    }
    if (stateInput) {
        stateInput.value = "";
    }
}
