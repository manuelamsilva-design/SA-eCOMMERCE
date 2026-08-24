# SportZone — Loja Virtual de Artigos Esportivos

Projeto final da disciplina de Lógica de Programação (Técnico em Desenvolvimento de Sistemas, integrado ao Ensino Médio). Protótipo de loja virtual **de apresentação** — sem pagamento real e sem banco de dados

**Equipe:** Davi, Manuela e Nicolas

## Sobre o projeto

A SportZone simula uma loja virtual com listagem de produtos esportivos, carrinho de compras funcional e formulário de finalização de pedido. Todas as regras de negócio (cálculo de total, desconto e validação) rodam no navegador, em JavaScript puro, sem frameworks e sem backend.

## Estrutura dos arquivos

```
sportzone/
├── index.html   → estrutura da página (HTML)
├── style.css    → aparência da loja (CSS)
├── script.js    → funcionamento do carrinho e das regras (JavaScript)
└── README.md    → este arquivo
```

### `index.html`
Contém a estrutura de todas as seções da loja:
- **Cabeçalho** — logo da loja e menu de navegação
- **Produtos** — listagem dos itens à venda, cada um com imagem, nome, descrição, preço, campo de quantidade e botão de adicionar ao carrinho
- **Carrinho** — tabela com os itens escolhidos, resumo de valores (subtotal, desconto e total) e formulário de finalização do pedido

### `style.css`
Responsável pela aparência: cores, fontes, disposição dos elementos na tela (produtos à esquerda e carrinho fixo à direita) e adaptação do layout para celular e tablet (responsividade).

### `script.js`
Contém toda a lógica de funcionamento:
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Recalcular subtotal, desconto e total sempre que o carrinho muda
- Aplicar a regra de desconto
- Validar o formulário de finalização do pedido
- Atualizar a página em tempo real, sem recarregar (manipulação do DOM)

## Requisitos Funcionais

Descrevem **o que o sistema faz**.

| # | Requisito |
|---|---|
| RF01 | Exibir a listagem de produtos com nome, imagem, descrição e preço |
| RF02 | Permitir escolher a quantidade de um produto antes de adicionar ao carrinho |
| RF03 | Adicionar produtos ao carrinho ao clicar em "Adicionar ao Carrinho" |
| RF04 | Somar a quantidade quando o mesmo produto é adicionado mais de uma vez |
| RF05 | Remover produtos do carrinho individualmente |
| RF06 | Calcular automaticamente o subtotal, o desconto e o total da compra |
| RF07 | Aplicar 10% de desconto quando o cliente leva 3 produtos ou mais |
| RF08 | Exibir um aviso visual confirmando quando o desconto foi aplicado |
| RF09 | Validar os campos de nome e e-mail no formulário de finalização |
| RF10 | Impedir a finalização do pedido se o carrinho estiver vazio |
| RF11 | Exibir mensagem de sucesso e limpar o carrinho após finalizar o pedido |

## Requisitos Não Funcionais

Descrevem **como o sistema deve se comportar**, e não uma funcionalidade específica.

| # | Requisito |
|---|---|
| RNF01 | O site deve funcionar em qualquer navegador atual (Chrome, Edge, Firefox) sem instalação |
| RNF02 | O layout deve se adaptar a celular, tablet e computador (responsividade) |
| RNF03 | Todas as atualizações do carrinho devem ocorrer sem recarregar a página |
| RNF04 | O código deve ser organizado e comentado de forma legível para outros estudantes |
| RNF05 | O sistema não deve depender de servidor, backend ou banco de dados |
| RNF06 | O projeto não deve processar pagamentos reais nem dados sensíveis |

## Como rodar o projeto

Não é necessário instalar nada além de um navegador. Duas formas de obter o projeto:

**Opção 1 — Clonando o repositório (recomendado):**

```bash
git clone <URL-do-repositorio>
cd sportzone
```

Depois, é só abrir o arquivo `index.html` no navegador (duplo clique, ou clique com o botão direito → "Abrir com" → navegador de sua preferência).

**Opção 2 — Baixando os arquivos manualmente:**

1. Baixar os três arquivos (`index.html`, `style.css` e `script.js`) e mantê-los **na mesma pasta**
2. Dar duplo clique no arquivo `index.html`
3. A loja abrirá direto no navegador

## Funcionalidades implementadas

- Listagem de produtos com nome, imagem e preço
- Adicionar e remover produtos do carrinho dinamicamente
- Cálculo automático do valor total da compra
- Desconto condicional: **10% de desconto ao levar 3 produtos ou mais** (quantidade total de itens, não valor)
- Aviso visual confirmando quando o desconto é aplicado, e quanto falta para consegui-lo
- Validação do formulário de finalização (nome, e-mail e carrinho não vazio)
- Layout responsivo (funciona em celular, tablet e computador)

## Regras de negócio

| Regra | Condição | Efeito |
|---|---|---|
| Desconto por quantidade | Cliente leva 3 produtos ou mais no carrinho | Aplica 10% de desconto sobre o subtotal |
| Validação de nome | Campo "nome" vazio | Bloqueia o envio e mostra mensagem de erro |
| Validação de e-mail | E-mail sem "@" ou sem "." | Bloqueia o envio e mostra mensagem de erro |
| Carrinho vazio | Nenhum produto adicionado | Bloqueia a finalização do pedido |

## Observações

- Projeto **sem banco de dados**: os dados do carrinho existem apenas enquanto a página está aberta. Ao atualizar a página, o carrinho é zerado.
- Projeto **sem pagamento real**: a finalização do pedido é apenas uma simulação.
- Imagens dos produtos usadas apenas para fins de apresentação/demonstração.