# Changelog — litheme

## Não publicado

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
