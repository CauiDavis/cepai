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
        console.log(cepStatus);

        if (cepStatus === "invalid") {
            alert("Cep inválido!");
            clearInputs();
            return;
        }

        if (cepStatus == "not_found") {
            alert("Cep não encontrado!");
            clearInputs();
            return;
        }

        receiveAddress();
    } catch (error) {
        console.error("erro" + error);
        throw error;
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

async function searchCep() {

    let cep = document.getElementById("cep").value;

    await fetchAddress(cep);

    if (isNaN(cep)) {
        alert("Digite um cep válido!");
        return;
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
