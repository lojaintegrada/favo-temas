# Changelog — litheme

## Não publicado

- Acessibilidade: o botão de busca do cabeçalho passa a ter o nome "Buscar" anunciado corretamente por leitores de tela. Os fundos escuros dos drawers de busca, menu, minicart e filtros deixam de usar um atributo ARIA inválido, apontado pelo Lighthouse.

## 71 — 2026-11-03

- HTMX atualizado da versão 2.0.8 para a 4.0.1.

## 70 — 2026-11-03

- Lojas com preço restrito a clientes logados: para visitantes sem login, o preço aparece como "R$ \*\*\*" no card e na página de produto, sem preço riscado, parcelamento, desconto à vista nem badge de desconto. Antes, o valor podia aparecer em branco ou como R$ 0,00.
- Lojas com preço restrito: o card de produto deixa de mostrar o botão de compra rápida para visitantes sem login.
- Lojas com preço restrito: na página de produto, o botão de comprar dá lugar a "Identifique-se para ver preço", que leva ao login e depois volta para o produto. O botão flutuante de compra, o link "mais formas de pagamento", o modal de formas de pagamento e o cálculo de frete não aparecem.
- Produto sob consulta com variações agora mostra o botão "Consulte o preço" e esconde o botão flutuante e o cálculo de frete antes de o cliente escolher uma variação. Antes, aparecia o botão de comprar desabilitado.

## 69 — 2026-11-03

- Atualiza a biblioteca de estilos do tema (Tailwind CSS 4.3.3 e daisyUI 5.7.50).
- Atualiza a biblioteca dos carrosséis (Embla Carousel 9.0.0-rc04).

## 68 — 2026-10-28

- Painéis de calcular frete, cupom, avise-me, produto sob consulta e compra rápida, o botão sobre a galeria do produto, as bandeiras de pagamento do rodapé e a mensagem de sucesso da newsletter passam a usar a cor de superfície do tema em vez de branco fixo. Na paleta padrão nada muda; em lojas com cores personalizadas, essas áreas ficam na mesma cor dos menus laterais e do carrinho.
- Ícones de atendimento, quantidade no carrinho, fechar, minha conta, busca, menu de categorias, filtros e newsletter passam a seguir a cor de texto do tema, em vez de um preto fixo.
- O ícone de aviso do produto esgotado e do produto sob consulta segue a cor de erro do tema, e a estrela da nota das avaliações segue a cor de alerta.
- Aviso de brinde no carrinho passa a usar o fundo da loja e uma borda pontilhada neutra, em vez de cinza fixo com borda na cor principal.

## 67 — 2026-10-21

- Número de itens do carrinho no cabeçalho é atualizado sozinho quando fica mais de 5 minutos sem atualização ou quando a aba volta a ficar visível. Antes, ele podia mostrar itens de um carrinho que já estava vazio.

## 66 — 2026-10-21

- Vitrines da home, recomendações do produto, resultados de categoria, marca e busca e sugestões do carrinho passam a enviar o evento de visualização de lista de produtos (`view_item_list`) para o Google Analytics e o GTM, com preço e posição de cada produto.
- Cliques em produtos dessas listas passam a informar a lista de origem e a posição do produto.
- Evento de visualização do compre junto passa a enviar o preço dos produtos, que antes chegava vazio.

## 65 — 2026-10-06

- Pagamento com Pagaleve no modal de formas de pagamento agora mostra cada parcela com o mesmo valor e o prazo: a 1ª no ato da compra e as demais a cada 15 dias.
- Parcelas no modal de formas de pagamento aparecem com texto menor.
- Tarja de parcelamento no banner deixou de dizer "no cartão", já que o parcelamento pode valer para outros meios de pagamento.

## 62 — 2026-08-26

- Primeira versão do tema litheme.
