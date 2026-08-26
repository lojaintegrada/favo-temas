# CLAUDE.md

Instruções para agentes trabalhando neste repositório.

## O que é este repo

Catálogo **público** de temas para o **Favo**, a plataforma de storefront da Loja Integrada.
Cada tema é um conjunto de templates Liquid + assets, distribuído como `.zip` nas Releases
para quem quiser usar como ponto de partida e publicar pela própria CLI.

Este repo **não** publica temas. A publicação é feita via CLI, manualmente,
fora daqui. Aqui é só fonte da verdade + distribuição.

## Organização

```
themes/<nome>/               # um tema por pasta, autocontido
.claude/skills/changelog/    # rascunha entradas de changelog a partir do diff
.github/workflows/
```

### O que este repo exige de um tema

Só isto. O resto é livre:

- `theme.json` — manifest da CLI. `"_version"` é a versão do **formato**, não do tema.
- `CHANGELOG.md` — `## Não publicado` no topo; seções já publicadas são imutáveis.
- `VERSION` — versão devolvida pela CLI; escrita pela Action, não editar à mão.
- `.gitattributes` — `export-ignore` do que não entra no zip. Precisa ficar **dentro** da
  pasta do tema: `git archive` de subárvore ignora o da raiz.
- `README.md` — doc do tema: stack, comandos, estrutura, padrões.

### O que é decisão de cada tema

Stack, organização de pastas, ter ou não `package.json`, ter ou não passo de build, usar ou
não framework, bundler, Tailwind ou qualquer outra ferramenta. O único ponto fixo é a saída:
templates Liquid.

**Nunca aplique a convenção de um tema em outro.** Leia o `README.md` do tema em que você
está mexendo antes de assumir qualquer coisa sobre stack, comandos ou estrutura.

## Versionamento

A versão **vem de fora**: a CLI do Favo devolve o número ao publicar. Nunca invente,
calcule ou incremente versão. Ela não é semver.

Fluxo de release:

1. Mudanças vão para `## Não publicado` no `CHANGELOG.md` do tema (use a skill `changelog`).
2. Usuário publica pela CLI e recebe o número.
3. **Actions → Release theme** (dispatch manual) faz o resto: promove o changelog, grava
   `VERSION`, commita, cria a tag `<tema>@<versão>`, empacota via `git archive` e publica
   a Release com o zip.

A Action se recusa a publicar se não houver nada sob `## Não publicado`.
Ela **não builda nada** — empacota o que está commitado.

Não rode esse fluxo por conta própria. Quem dispara é o usuário.

## Regras ao mexer num tema

- Leia o `README.md` do tema antes de tocar em qualquer coisa.
- Se o tema tem passo de build, **o artefato gerado é commitado de propósito** — o zip da
  release precisa funcionar sem build. Não mande para o `.gitignore`.
- Não edite arquivo gerado à mão. Edite a fonte e rode o build daquele tema.
- Não edite seções já publicadas do `CHANGELOG.md`, nem o `VERSION`.
- O workflow `Changelog` roda só em PR: falha quando `themes/<x>/` muda sem que
  `themes/<x>/CHANGELOG.md` mude junto. Não bloqueia o merge — a `main` não exige status
  check — e commit direto na `main` não passa por ele. Escape: label `sem-changelog`.
- Hooks `{% appsection ... %}` são pontos de extensão da plataforma, usados por apps
  externas. Não remova nem renomeie.
