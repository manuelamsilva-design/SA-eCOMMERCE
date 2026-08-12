// ===== Dados dos produtos =====
const produtos = [
  { id: 1, nome: "Fone Bluetooth", preco: 89.90, icone: "🎧" },
  { id: 2, nome: "Carregador Turbo", preco: 49.90, icone: "🔌" },
  { id: 3, nome: "Mouse Sem Fio", preco: 59.90, icone: "🖱️" },
  { id: 4, nome: "Capa de Celular", preco: 29.90, icone: "📱" },
  { id: 5, nome: "Power Bank 10000mAh", preco: 119.90, icone: "🔋" }
];

// ===== Estado do carrinho =====
let carrinho = [];

// Valor mínimo para aplicar desconto (regra de negócio)
const VALOR_MINIMO_DESCONTO = 200;
const PERCENTUAL_DESCONTO = 0.10; // 10%

// Observação: os cards de produto já estão escritos no HTML (com as imagens),
// então o JavaScript não recria essa parte — só usa a lista "produtos" acima
// para consultar nome e preço quando um item é adicionado ao carrinho.

// ===== Adiciona produto ao carrinho =====
function adicionarAoCarrinho(id) {
  const produto = produtos.find(function (p) { return p.id === id; });

  // Verifica se o produto já está no carrinho (if / else)
  const itemExistente = carrinho.find(function (item) { return item.id === id; });

  if (itemExistente) {
    itemExistente.quantidade = itemExistente.quantidade + 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1
    });
  }

  renderizarCarrinho();
}

// ===== Remove produto do carrinho =====
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(function (item) { return item.id !== id; });
  renderizarCarrinho();
}

// ===== Renderiza a lista do carrinho e recalcula os totais =====
function renderizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = '<li class="vazio">Seu carrinho está vazio</li>';
  } else {
    carrinho.forEach(function (item) {
      const subtotalItem = item.preco * item.quantidade;
      const li = document.createElement("li");
      li.innerHTML =
        '<span>' + item.nome + ' (x' + item.quantidade + ') — R$ ' +
        subtotalItem.toFixed(2).replace(".", ",") + '</span>' +
        '<button onclick="removerDoCarrinho(' + item.id + ')">Remover</button>';
      lista.appendChild(li);
    });
  }

  calcularTotal();
}

// ===== Calcula subtotal, desconto e total =====
function calcularTotal() {
  let subtotal = 0;

  carrinho.forEach(function (item) {
    subtotal = subtotal + (item.preco * item.quantidade); // operador matemático
  });

  let desconto = 0;
  const linhaDesconto = document.getElementById("linha-desconto");

  // Regra de negócio: desconto condicional (if / else)
  if (subtotal >= VALOR_MINIMO_DESCONTO) {
    desconto = subtotal * PERCENTUAL_DESCONTO;
    linhaDesconto.classList.remove("oculto");
  } else {
    desconto = 0;
    linhaDesconto.classList.add("oculto");
  }

  const total = subtotal - desconto;

  document.getElementById("subtotal").textContent = "R$ " + subtotal.toFixed(2).replace(".", ",");
  document.getElementById("desconto").textContent = "R$ " + desconto.toFixed(2).replace(".", ",");
  document.getElementById("total").textContent = "R$ " + total.toFixed(2).replace(".", ",");
}

// ===== Validação do formulário de pedido =====
function validarFormulario(evento) {
  evento.preventDefault(); // impede o recarregamento da página

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");

  const erroNome = document.getElementById("erro-nome");
  const erroEmail = document.getElementById("erro-email");
  const erroCarrinho = document.getElementById("erro-carrinho");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  // Limpa mensagens e estilos anteriores
  erroNome.textContent = "";
  erroEmail.textContent = "";
  erroCarrinho.textContent = "";
  nomeInput.classList.remove("invalido");
  emailInput.classList.remove("invalido");
  mensagemSucesso.classList.add("oculto");

  let formularioValido = true;

  // Validação do nome
  if (nomeInput.value.trim() === "") {
    erroNome.textContent = "Digite seu nome completo.";
    nomeInput.classList.add("invalido");
    formularioValido = false;
  }

  // Validação do e-mail (formato simples)
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  if (!emailValido) {
    erroEmail.textContent = "Digite um e-mail válido.";
    emailInput.classList.add("invalido");
    formularioValido = false;
  }

  // Validação: o carrinho não pode estar vazio (a quantidade vem daqui, não é mais digitada)
  if (carrinho.length === 0) {
    erroCarrinho.textContent = "Adicione ao menos um produto ao carrinho antes de confirmar.";
    formularioValido = false;
  }

  if (formularioValido) {
    mensagemSucesso.classList.remove("oculto");
    document.getElementById("form-pedido").reset();
  }
}

// ===== Inicialização =====
document.getElementById("form-pedido").onsubmit = validarFormulario;

renderizarCarrinho();
