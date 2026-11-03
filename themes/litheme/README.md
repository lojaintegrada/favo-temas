# litheme

Tema de storefront para o **Favo**, a plataforma de loja virtual da Loja Integrada.

Renderizado no servidor com Liquid. Sem framework frontend, sem bundler — só templates,
Web Components em vanilla JS e HTMX para as interações dinâmicas.

## Stack

| Camada | Tecnologia |
| ------ | ---------- |
| Templates | Liquid |
| CSS | Tailwind CSS 4 + DaisyUI 5 |
| Interatividade | HTMX 4 |
| Componentes client-side | Web Components (vanilla JS) |
| Carrossel | Embla Carousel |
| Máscara de input | iMask |

## Desenvolvimento

```bash
npm install
npm run build:css   # compila theme.css → theme.min.css (uma vez)
npm run watch:css   # rebuild automático ao salvar
```

**Nunca edite `assets/style/theme.min.css`** — é arquivo gerado. Edite
`assets/style/theme.css` e reconstrua. O `.min.css` é commitado de propósito, para que o
`.zip` da release funcione sem passo de build.

## Estrutura

```text
pages/         # configuração de páginas em JSON: quais componentes carregar + dados
templates/
  shared/      # componentes reutilizáveis (banner, header, footer, product-card…)
  pages/       # templates por página (home, product, search)
  store/       # endpoints HTMX de rotas internas — devolvem fragmentos HTML
assets/
  style/       # theme.css (fonte) + theme.min.css (gerado)
  scripts/     # Web Components (*.webc.js) + libs de terceiros em libs/
```

## Padrões

**Variantes de componente** ficam como arquivos irmãos na mesma pasta —
`banner/full.liquid`, `banner/mini.liquid`, `banner/stripe.liquid`. Não crie subpastas
para variante.

**Web Components** (`assets/scripts/*.webc.js`): arquivo em `kebab-case.webc.js`, classe
em `PascalCase extends HTMLElement`, configuração via atributos `data-*`
(ex: `data-buy-url`, `data-skus`). Inicialização em `connectedCallback()`, reatividade em
`attributeChangedCallback()`.

**Libs de terceiros** vão minificadas em `assets/scripts/libs/`, com a versão no nome do
arquivo (`htmx-4-0-1.min.js`).

**`data-send-only`** é do tema, não do HTMX. Um `<form>` sempre serializa todos os seus
inputs; esse atributo lista, separado por vírgula, quais devem sobreviver. Um listener de
`htmx:config:request` em `shared/utils/index.liquid` descarta o resto. Substitui o
`hx-params`, removido no HTMX 4. Não use o prefixo `data-hx-` para atributos do tema — ele
é o prefixo nativo do HTMX.

**Hooks `appsection`** são pontos de extensão nos templates Liquid, usados por apps
externas — ex: `{% appsection shelf_after_product_title %}`. Não remova nem renomeie.

**Pages JSON** (`pages/*.json`) definem quais componentes carregar em cada página e quais
dados injetar. Ao criar uma página nova, crie o JSON correspondente e mapeie os templates.

**CSS** usa as variáveis de tema do DaisyUI (`--color-primary`, `--color-base-100`).
Personalize em `theme.css` — não sobrescreva utilitários do DaisyUI dentro dos templates.
