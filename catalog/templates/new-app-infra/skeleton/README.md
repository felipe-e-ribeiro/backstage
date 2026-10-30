# ${{ values.name }}-infra

${{ values.description }}

Gerado pelo Backstage (template `new-app-infra`) no padrão do
[platform-chart](https://github.com/felipe-e-ribeiro/personal-charts):
`Chart.yaml` + `values.yaml` + `ExternalSecret`. O ArgoCD descobre este
repo via `argocd-bootstrap/apps-registry/${{ values.name }}.yaml` e sincroniza
no namespace `${{ values.name }}`.

- Secret no OCI Vault: `${{ values.name }}-app-secrets` (chaves em `resources.yaml`).
- Atualização do platform-chart: `.github/workflows/chart-updates.yaml` (Renovate, toda segunda).
  Para o PR abrir de fato, marque em Settings → Actions → General
  "Allow GitHub Actions to create and approve pull requests".
