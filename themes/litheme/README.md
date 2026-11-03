# litheme

Tema de storefront para o **Favo**, a plataforma de loja virtual da Loja Integrada.

Renderizado no servidor com Liquid. Sem framework frontend, sem bundler — só templates,
Web Components em vanilla JS e HTMX para as interações dinâmicas.

## Stack

| Camada | Tecnologia |
| ------ | ---------- |
| Templates | Liquid |
| CSS | Tailwind CSS 4 + DaisyUI 5 |
| Interatividade | HTMX 2 |
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
blocks/        # componentes com configuração que o lojista pode mudar (JSON Schema)
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
arquivo (`htmx-2-0-8.min.js`).

**Hooks `appsection`** são pontos de extensão nos templates Liquid, usados por apps
externas — ex: `{% appsection shelf_after_product_title %}`. Não remova nem renomeie.

**Pages JSON** (`pages/*.json`) definem quais componentes carregar em cada página e quais
dados injetar. Ao criar uma página nova, crie o JSON correspondente e mapeie os templates.
As páginas estão no formato `_version: "4"`, que **não aceita `properties` em componente
`template`**.

**Blocos** (`blocks/*.json`) são para o que o **lojista** configura pelo painel (ex.: título
da vitrine). Cada prop do schema vira um campo no painel, então só entra no schema o que o
lojista pode mudar. O bloco aponta para o template com o mesmo caminho usado nas páginas
(`shared/components/...`, sem `templates/` nem `.liquid`). Não use `templates/blocks/`. A
plataforma valida as props no `push`/`sync` e entrega `props` com os defaults aplicados,
então não use `| default:` para uma prop que está no schema. O `data` continua declarado
na página.

**Decisão do tema não é prop.** Modo esqueleto/conteúdo, slot e layout por tipo de página
ficam no próprio template:

- esqueleto que carrega via HTMX × conteúdo do partial → `ctx.location == 'partial'`
  (tarja de condições, recomendações, avaliações, aviso de cookies);
- variação por tipo de página → `ctx.location` (`product`, `cart`, `page`, `category`,
  `search`…), como na barra flutuante e no breadcrumb;
- variação dentro da mesma página → arquivo irmão que faz `render` com o valor fixo
  (`banner/full.liquid`, `banner/showcase-odd.liquid`,
  `buy-together/before-product.liquid`, `home/shelf-newest.liquid`).

**CSS** usa as variáveis de tema do DaisyUI (`--color-primary`, `--color-base-100`).
Personalize em `theme.css` — não sobrescreva utilitários do DaisyUI dentro dos templates.
