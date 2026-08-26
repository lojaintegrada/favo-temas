---
name: changelog
description: Rascunha entradas de CHANGELOG para um tema a partir do diff real desde a última release, para o usuário revisar. Use quando o usuário disser "changelog", "o que mudou no tema", "atualiza o changelog", "/changelog", ou antes de publicar um tema.
---

# Rascunhar changelog de um tema

Você escreve o rascunho. O usuário revisa e ajusta. **Nunca commite.**

## 1. Descobrir o tema e o intervalo

Tema: veio como argumento? Use. Senão, veja quais pastas em `themes/` têm mudanças
(`git status --short` + `git diff --stat HEAD`) e use essa. Duas ou mais? Pergunte.

Intervalo — desde a última release daquele tema:

```
base=$(git describe --tags --match "<tema>@*" --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)
```

## 2. Ler o diff que importa

```
git diff --stat "$base" -- themes/<tema>
git diff "$base" -- themes/<tema> ':!*.min.*' ':!*-lock.json' ':!*/CHANGELOG.md' ':!*/VERSION'
```

Inclua também o que ainda não foi commitado (`git diff HEAD` e arquivos novos).

Cada tema tem stack própria. Leia o `README.md` do tema para saber **quais arquivos são
gerados por build** ali e ignore-os — mudança em artefato compilado nunca vira entrada,
já está descrita pela mudança na fonte. Diff grande? Leia o `--stat` primeiro e mergulhe
só nos arquivos com mudança substantiva.

## 3. Escrever as entradas

Regras duras:

- **Perspectiva de quem usa a loja, não de quem escreve o código.**
  Ruim: "refatora `product-card/components/pricing.liquid`".
  Bom: "Preço parcelado agora aparece no card de produto da vitrine".
- **Corte o que não é visível**: refactor puro, renomeação, formatação, comentário,
  bump de devDependency, CSS compilado. Se a mudança não altera o que aparece na
  tela nem o comportamento, ela não vira entrada.
- Português, uma linha por mudança, sem prefixo de tipo, sem emoji.
- Nada de inventar. Não deu pra saber o efeito de uma mudança olhando o diff?
  Liste ela numa seção separada `> Não consegui inferir:` no fim do rascunho,
  em vez de chutar.
- Não repita entrada que já está sob `## Não publicado`.

## 4. Inserir e mostrar

Insira as entradas sob `## Não publicado` em `themes/<tema>/CHANGELOG.md`
(crie o arquivo com o cabeçalho `# Changelog — <tema>` e a seção se não existir).

Depois mostre ao usuário só o que você adicionou, e diga em uma linha quantos
arquivos você descartou por não serem visíveis. Pare aí — ele revisa.
