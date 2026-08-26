// Guarda os itens do carrinho: { id, nome, preco, quantidade }
let carrinho = [];

const corpoTabela = document.getElementById("itens-carrinho");
const linhaVazia = document.getElementById("carrinho-vazio");
const spanSubtotal = document.getElementById("subtotal");
const spanDesconto = document.getElementById("desconto");
const spanTotal = document.getElementById("total");
const avisoDesconto = document.getElementById("aviso-desconto");
const mensagemValidacao = document.getElementById("mensagem-validacao");

// ADICIONAR PRODUTO AO CARRINHO
const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

botoesAdicionar.forEach(function (botao) {
  botao.onclick = function () {
    const id = botao.getAttribute("data-id");
    const nome = botao.getAttribute("data-nome");
    const preco = parseFloat(botao.getAttribute("data-preco"));

    const card = botao.closest(".card-produto");
    const inputQuantidade = card.querySelector(".quantidade");
    let quantidade = parseInt(inputQuantidade.value);

    if (isNaN(quantidade) || quantidade < 1) {
      quantidade = 1;
      inputQuantidade.value = 1;
    }

    adicionarAoCarrinho(id, nome, preco, quantidade);
  };
});

function adicionarAoCarrinho(id, nome, preco, quantidade) {
  const itemExistente = carrinho.find(function (item) {
    return item.id === id;
  });

  if (itemExistente) {
    itemExistente.quantidade = itemExistente.quantidade + quantidade;
  } else {
    carrinho.push({ id: id, nome: nome, preco: preco, quantidade: quantidade });
  }

  atualizarCarrinho();
}

// REMOVER PRODUTO DO CARRINHO
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(function (item) {
    return item.id !== id;
  });

  atualizarCarrinho();
}

// ATUALIZAR TABELA (DOM dinâmico, sem recarregar a página)
function atualizarCarrinho() {
  corpoTabela.innerHTML = "";

  if (carrinho.length === 0) {
    corpoTabela.appendChild(linhaVazia);
  } else {
    carrinho.forEach(function (item) {
      const subtotalItem = item.preco * item.quantidade;

      const linha = document.createElement("tr");
      linha.innerHTML =
        "<td>" + item.nome + "</td>" +
        "<td>" + item.quantidade + "</td>" +
        "<td>R$ " + item.preco.toFixed(2).replace(".", ",") + "</td>" +
        "<td>R$ " + subtotalItem.toFixed(2).replace(".", ",") + "</td>" +
        "<td><button class='btn-remover'>Remover</button></td>";

      const botaoRemover = linha.querySelector(".btn-remover");
      botaoRemover.onclick = function () {
        removerDoCarrinho(item.id);
      };

      corpoTabela.appendChild(linha);
    });
  }

  calcularTotais();
}

// CÁLCULO DE SUBTOTAL, DESCONTO E TOTAL
function calcularTotais() {
  let subtotal = 0;
  let quantidadeTotal = 0;

  carrinho.forEach(function (item) {
    subtotal = subtotal + item.preco * item.quantidade;
    quantidadeTotal = quantidadeTotal + item.quantidade;
  });

  // Regra de negócio: 10% de desconto ao levar 3 produtos ou mais
  const QUANTIDADE_MINIMA_DESCONTO = 3;
  const PERCENTUAL_DESCONTO = 0.10;

  let desconto = 0;
  let descontoAplicado = false;

  if (quantidadeTotal >= QUANTIDADE_MINIMA_DESCONTO) {
    desconto = subtotal * PERCENTUAL_DESCONTO;
    descontoAplicado = true;
  }

  const total = subtotal - desconto;

  spanSubtotal.textContent = "R$ " + subtotal.toFixed(2).replace(".", ",");
  spanDesconto.textContent = "R$ " + desconto.toFixed(2).replace(".", ",");
  spanTotal.textContent = "R$ " + total.toFixed(2).replace(".", ",");

  if (descontoAplicado) {
    avisoDesconto.textContent = "Desconto de 10% aplicado! Você levou " + quantidadeTotal + " produtos.";
    avisoDesconto.classList.add("ativo");
  } else {
    const faltam = QUANTIDADE_MINIMA_DESCONTO - quantidadeTotal;
    avisoDesconto.textContent = quantidadeTotal > 0
      ? "Faltam " + faltam + " produto(s) para ganhar 10% de desconto."
      : "";
    avisoDesconto.classList.remove("ativo");
  }
}

// VALIDAÇÃO DO FORMULÁRIO
const formCompra = document.getElementById("form-compra");

formCompra.onsubmit = function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (nome === "") {
    mostrarMensagem("Por favor, informe seu nome completo.", "erro");
    return;
  }

  const emailValido = email.includes("@") && email.includes(".");
  if (!emailValido) {
    mostrarMensagem("Por favor, informe um e-mail válido.", "erro");
    return;
  }

  if (carrinho.length === 0) {
    mostrarMensagem("Seu carrinho está vazio. Adicione produtos antes de finalizar.", "erro");
    return;
  }

  mostrarMensagem(
    "Pedido de " + nome + " registrado com sucesso!",
    "sucesso"
  );

  carrinho = [];
  atualizarCarrinho();
  formCompra.reset();
};

function mostrarMensagem(texto, tipo) {
  mensagemValidacao.textContent = texto;
  mensagemValidacao.className = tipo;
}
