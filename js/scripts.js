"use strict";

const cep = document.getElementById("CEP");
const pesquisar = document.getElementById("pesquisar");
const historicoLista = document.getElementById("historico-lista");

function getCep(cep) {
    return cep.value;
}

function consultarCep(cep) {
    return `https://viacep.com.br/ws/${cep}/json/`;
}

function criarComponenteEndereco(dadosJSON) {
    const endereco = document.createElement("div");
    // Adicionar classe:
    endereco.classList.add("endereco");
    endereco.innerHTML = `
        <h2 class="estado">${dadosJSON.uf}</h2>
        <div class="detalhes">
            <div class="dados">
                <h3 class="localidade">${dadosJSON.localidade}</h3>
                <p class="logradoura">${dadosJSON.logradouro}, ${dadosJSON.bairro}</p>
            </div>
            <div class="box-footer">
                <p class="cep-buscado">CEP: ${getCep(cep)}</p>
                <button class="remover">X</button>
            </div>
        </div>
    `;

    // Remover item de pesquisa (botão X):
    const btnRemover = endereco.querySelector(".remover");
    
    btnRemover.addEventListener("click", () => {
        endereco.remove();
    })

    return endereco;
}

pesquisar.addEventListener("click", async () => {
    try {
        const resposta = await fetch(consultarCep(getCep(cep)));

        // Desserialização JSON
        const dadosJSON = await resposta.json();

        if(dadosJSON.erro) throw new Error("CEP buscado não existe.");

        // Criar novo componente:
        const novoEndereco = criarComponenteEndereco(dadosJSON);
        historicoLista.appendChild(novoEndereco);
    }
    catch(err) {
        // Tratar o Failed to Fetch:
        if (err.message === "Failed to fetch") alert("Erro: tamanho de CEP Inválido.");
        else alert(`Erro: ${err.message}`);
    }
})