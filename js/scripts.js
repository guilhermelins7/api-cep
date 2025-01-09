"use strict";

const cep = document.getElementById("CEP");
const pesquisar = document.getElementById("pesquisar");
const estado = document.getElementById("estado");


function getCep(cep) {
    return cep.value;
}

pesquisar.addEventListener("click", async () => {
    try {
        // test:
        const resposta = await fetch(`https://viacep.com.br/ws/${getCep(cep)}/json/`);

        if (!resposta.ok) throw new erro();

        // Desserialização JSON
        const dadosJSON = await resposta.json();

        estado.textContent = `${dadosJSON.uf}`;
    }
    catch(erro) {   
        estado.textContent = "Falha ao buscar CEP."
    }
})