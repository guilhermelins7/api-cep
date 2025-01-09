"use strict";

const cep = document.getElementById("CEP");
const pesquisar = document.getElementById("pesquisar");
const estado = document.getElementById("estado");
const localidade = document.getElementById("localidade");
const logradouro = document.getElementById("logradouro");

function getCep(cep) {
    return cep.value;
}

pesquisar.addEventListener("click", async () => {
    try {
        // test:
        const resposta = await fetch(`https://viacep.com.br/ws/${getCep(cep)}/json/`);
        // const resposta = await fetch(`https://viacep.com.br/ws/11500260/json/`);


        if (!resposta.ok) throw new erro();

        // Desserialização JSON
        const dadosJSON = await resposta.json();

        estado.textContent = `${dadosJSON.uf}`;
        localidade.textContent = `${dadosJSON.localidade}`;
        logradouro.textContent = `${dadosJSON.logradouro}, ${dadosJSON.bairro}`
    }
    catch(erro) {   
        estado.textContent = "Falha ao buscar CEP."
    }
})