# favo-temas

Temas para o Favo. Cada tema vive em `themes/<nome>/` e é publicado como um `.zip` nas [Releases](../../releases).

## Temas

| Tema | Versão | Download |
|------|--------|----------|
| [litheme](themes/litheme) | — | _(sem release ainda)_ |

## Anatomia de um tema

Cada tema é autocontido e escolhe a própria stack — com ou sem build, com ou sem framework, com ou sem Tailwind. O ponto fixo é a saída: templates Liquid. Consulte o `README.md` do tema para stack, comandos e estrutura.

Do lado do repositório, todo tema tem estes arquivos:

```
themes/<nome>/
  README.md        # doc do tema: stack, comandos, estrutura, padrões
  CHANGELOG.md     # promovido pela Action, com "## Não publicado" no topo
  VERSION          # versão da CLI; escrita pela Action, vai dentro do zip
  theme.json       # manifest da CLI ("_version" = versão do formato, não do tema)
  .gitattributes   # marca o que não entra no zip (export-ignore)
```

Temas com passo de build commitam o artefato gerado de propósito: o `.zip` da release precisa funcionar sem build para quem baixa.

## Usando um tema

Baixe o `.zip` da release, use como ponto de partida e publique pela sua própria CLI do Favo. O arquivo `VERSION` dentro do zip diz de qual versão você partiu.

## Publicando uma nova versão

A versão **não** é decidida aqui — ela vem da CLI do Favo.

1. Durante o desenvolvimento, anote as mudanças em `themes/<nome>/CHANGELOG.md`, sob `## Não publicado` — ou rode `/changelog <tema>` no Claude Code para rascunhar as entradas a partir do diff e só revisar.
2. Publique pela CLI do Favo e anote o número de versão que ela devolver.
3. Vá em **Actions → Release theme → Run workflow** e informe o tema e a versão.

A Action promove o bloco `## Não publicado` para `## <versão> — <data>`, grava o `VERSION`, cria a tag `<tema>@<versão>`, empacota via `git archive` e publica a Release com o `.zip` anexado.

Se não houver nada sob `## Não publicado`, ela falha de propósito — release sem changelog não passa.

Quem trabalha por PR tem um aviso antes disso: o check `Changelog` falha quando `themes/<nome>/` muda sem que o `CHANGELOG.md` daquele tema mude junto. Ele não bloqueia o merge, e commit direto na `main` não passa por ele. O label `sem-changelog` dispensa.
