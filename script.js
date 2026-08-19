
// Array que guarda os itens do carrinho
// Cada item: { id, nome, preco, quantidade }
let carrinho = [];

// Referências dos elementos do DOM usados várias vezes
const corpoTabela = document.getElementById("itens-carrinho");
const linhaVazia = document.getElementById("carrinho-vazio");
const spanSubtotal = document.getElementById("subtotal");
const spanDesconto = document.getElementById("desconto");
const spanTotal = document.getElementById("total");
const mensagemValidacao = document.getElementById("mensagem-validacao");
// 1) ADICIONAR PRODUTO AO CARRINHO

// Pega todos os botões "Adicionar ao Carrinho" e liga o evento onclick
const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

botoesAdicionar.forEach(function (botao) {
  botao.onclick = function () {
    // Lê os dados do produto direto dos atributos data-*
    const id = botao.getAttribute("data-id");
    const nome = botao.getAttribute("data-nome");
    const preco = parseFloat(botao.getAttribute("data-preco"));

    // Pega a quantidade escolhida no input ao lado do botão
    const card = botao.closest(".card-produto");
    const inputQuantidade = card.querySelector(".quantidade");
    let quantidade = parseInt(inputQuantidade.value);

    // Validação simples da quantidade (if / else)
    if (isNaN(quantidade) || quantidade < 1) {
      quantidade = 1;
      inputQuantidade.value = 1;
    }

    adicionarAoCarrinho(id, nome, preco, quantidade);
  };
});

function adicionarAoCarrinho(id, nome, preco, quantidade) {
  // Verifica se o produto já está no carrinho
  const itemExistente = carrinho.find(function (item) {
    return item.id === id;
  });

  if (itemExistente) {
    // Se já existe, apenas soma a quantidade (operador matemático +)
    itemExistente.quantidade = itemExistente.quantidade + quantidade;
  } else {
    // Se não existe, cria um novo item no carrinho
    carrinho.push({
      id: id,
      nome: nome,
      preco: preco,
      quantidade: quantidade
    });
  }

  atualizarCarrinho();
}

// =====================================================
// 2) REMOVER PRODUTO DO CARRINHO
// =====================================================

function removerDoCarrinho(id) {
  // Filtra o array, mantendo apenas os itens diferentes do id removido
  carrinho = carrinho.filter(function (item) {
    return item.id !== id;
  });

  atualizarCarrinho();
}

// =====================================================
// 3) ATUALIZAR TABELA E CÁLCULOS (DOM dinâmico)
// =====================================================

function atualizarCarrinho() {
  // Limpa a tabela antes de redesenhar
  corpoTabela.innerHTML = "";

  // Se o carrinho estiver vazio, mostra a mensagem padrão
  if (carrinho.length === 0) {
    corpoTabela.appendChild(linhaVazia);
  } else {
    // Cria uma linha <tr> para cada item do carrinho
    carrinho.forEach(function (item) {
      const subtotalItem = item.preco * item.quantidade;

      const linha = document.createElement("tr");
      linha.innerHTML =
        "<td>" + item.nome + "</td>" +
        "<td>" + item.quantidade + "</td>" +
        "<td>R$ " + item.preco.toFixed(2).replace(".", ",") + "</td>" +
        "<td>R$ " + subtotalItem.toFixed(2).replace(".", ",") + "</td>" +
        "<td><button class='btn-remover'>Remover</button></td>";

      // Liga o evento de remover diretamente no botão criado
      const botaoRemover = linha.querySelector(".btn-remover");
      botaoRemover.onclick = function () {
        removerDoCarrinho(item.id);
      };

      corpoTabela.appendChild(linha);
    });
  }

  calcularTotais();
}

// =====================================================
// 4) CÁLCULO DE SUBTOTAL, DESCONTO E TOTAL
// =====================================================

function calcularTotais() {
  // Soma o subtotal de todos os itens (operadores matemáticos)
  let subtotal = 0;
  carrinho.forEach(function (item) {
    subtotal = subtotal + item.preco * item.quantidade;
  });

  // Regra de negócio: desconto de 10% para compras acima de R$ 300
  const VALOR_MINIMO_DESCONTO = 300;
  const PERCENTUAL_DESCONTO = 0.10;

  let desconto = 0;

  if (subtotal >= VALOR_MINIMO_DESCONTO) {
    desconto = subtotal * PERCENTUAL_DESCONTO;
  } else {
    desconto = 0;
  }

  const total = subtotal - desconto;

  // Atualiza o DOM com os valores formatados em reais
  spanSubtotal.textContent = "R$ " + subtotal.toFixed(2).replace(".", ",");
  spanDesconto.textContent = "R$ " + desconto.toFixed(2).replace(".", ",");
  spanTotal.textContent = "R$ " + total.toFixed(2).replace(".", ",");
}

// =====================================================
// 5) VALIDAÇÃO DO FORMULÁRIO (onsubmit)
// =====================================================

const formCompra = document.getElementById("form-compra");

formCompra.onsubmit = function (evento) {
  // Impede o recarregamento da página
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validação: nome preenchido
  if (nome === "") {
    mostrarMensagem("Por favor, informe seu nome completo.", "erro");
    return;
  }

  // Validação simples de e-mail (precisa ter @ e um ponto depois)
  const emailValido = email.includes("@") && email.includes(".");
  if (!emailValido) {
    mostrarMensagem("Por favor, informe um e-mail válido.", "erro");
    return;
  }

  // Validação: carrinho não pode estar vazio
  if (carrinho.length === 0) {
    mostrarMensagem("Seu carrinho está vazio. Adicione produtos antes de finalizar.", "erro");
    return;
  }

  // Se passou por todas as validações, exibe sucesso
  mostrarMensagem(
    "Pedido de " + nome + " registrado com sucesso! (simulação, sem pagamento real)",
    "sucesso"
  );

  // Reseta o carrinho e o formulário
  carrinho = [];
  atualizarCarrinho();
  formCompra.reset();
};

function mostrarMensagem(texto, tipo) {
  mensagemValidacao.textContent = texto;
  mensagemValidacao.className = tipo; // aplica a classe "erro" ou "sucesso" do CSS
}