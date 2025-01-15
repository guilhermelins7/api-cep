"use strict";

const cep = document.getElementById("CEP");
const pesquisar = document.getElementById("pesquisar");
const historicoLista = document.getElementById("historico-lista");

function getCep(cep) {
    return cep.value;
}

pesquisar.addEventListener("click", async () => {
    try {
        // test:
        const resposta = await fetch(`https://viacep.com.br/ws/${getCep(cep)}/json/`);
        // const resposta = await fetch(`https://viacep.com.br/ws/11500260/json/`);


        if (!resposta.ok) throw new Error("Falha ao buscar CEP");

        // Desserialização JSON
        const dadosJSON = await resposta.json();
        
        // Criar novo componente:
        const novoEndereco = document.createElement("div");
        novoEndereco.classList.add("endereco");
        novoEndereco.innerHTML = `
            <h2 class="estado">${dadosJSON.uf}</h2>
            <div class="detalhes">
                <div>
                    <h3 class="localidade">${dadosJSON.localidade}</h3>
                    <p class="logradoura">${dadosJSON.logradouro}, ${dadosJSON.bairro}</p>
                </div>
                <p class="cep-buscado">CEP: ${getCep(cep)}</p>
            </div>
        `;

        historicoLista.appendChild(novoEndereco);
    }
    catch(erro) {   
        alert(`Erro: ${erro.message}`);
    }
})