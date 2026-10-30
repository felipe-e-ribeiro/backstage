# backstage

Backstage pessoal do laboratório `oks-personal`
(<https://backstage.felipeduribeiro.com.br>). Gerado com
`@backstage/create-app` 1.56.0 e ajustado pra:

- **Login só via GitHub** (OAuth App), resolvido contra o User
  `felipe-e-ribeiro` em `catalog/org.yaml`. Guest só no `yarn start` local.
- **Postgres compartilhado** (`comprasweb-postgres.comprasweb`), banco
  `backstage` com um schema por plugin (`pluginDivisionMode: schema`).
- **Catálogo**: `catalog/org.yaml` + o `catalog-info.yaml` de cada
  `<app>-infra` (lista em `app-config.production.yaml`).
- **Template `new-app-infra`** (`catalog/templates/new-app-infra/`): cria
  `<app>-infra` no padrão do platform-chart, abre PR no
  `argocd-bootstrap/apps-registry/` e registra no catálogo. O secret do
  OCI Vault continua manual (comando no output do template).
- **GitHub Actions** por componente (plugin `github-actions`, usa o token
  OAuth de quem está logado).

## Deploy

Push na `main` → `.github/workflows/build-and-push.yaml` → imagem
`ghcr.io/felipe-e-ribeiro/backstage:sha-<commit>` (linux/arm64) → bump
da tag em `backstage-infra/values.yaml` → ArgoCD sincroniza.

Secrets: `BACKSTAGE_INFRA_PAT` (fine-grained, Contents RW só no
`backstage-infra`) neste repo; o resto (`GITHUB_TOKEN`,
`AUTH_GITHUB_CLIENT_*`, `POSTGRES_*`) no OCI Vault, secret
`backstage-app-secrets`.

## Local

```bash
corepack enable
yarn install
yarn start   # SQLite em memória + login guest
```
