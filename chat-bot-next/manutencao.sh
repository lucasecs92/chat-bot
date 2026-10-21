
#!/usr/bin/env bash
set -Eeuo pipefail

# Cores para o terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $*"; }
warn() { echo -e "${YELLOW}[ATENÇÃO]${NC} $*"; }
erro() { echo -e "${RED}[ERRO]${NC} $*" >&2; exit 1; }

echo "======================================"
echo " Manutenção e deploy Next.js"
echo "======================================"

# 1. Validar o projeto
[[ -f package.json ]] || erro "package.json não encontrado."
git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
  || erro "Projeto não está em um repositório Git."

command -v npm >/dev/null || erro "npm não instalado."
command -v git >/dev/null || erro "Git não instalado."

# Evita misturar alterações pessoais com o commit automático.
if [[ -n "$(git status --porcelain)" ]]; then
  erro "Há alterações pendentes no Git. Faça commit ou stash antes de continuar."
fi

# Não publicar diretamente de uma branch de trabalho por engano.
BRANCH="$(git branch --show-current)"
[[ -n "$BRANCH" ]] || erro "HEAD destacado. Selecione uma branch."

# 2. Verificar Vercel
command -v vercel >/dev/null \
  || erro "Vercel CLI não instalada. Instale com: npm install -g vercel"

if ! vercel whoami >/dev/null 2>&1; then
  warn "Você precisa autenticar na Vercel."
  vercel login
  vercel whoami >/dev/null 2>&1 \
    || erro "Não foi possível confirmar o login."
fi

# O vínculo do projeto é necessário para publicar no projeto correto.
if [[ ! -f .vercel/project.json ]]; then
  warn "Projeto ainda não vinculado à Vercel."
  vercel link
fi

[[ -f .vercel/project.json ]] \
  || erro "Vínculo com a Vercel não encontrado."

# 3. Atualizar dependências
info "Atualizando dependências..."
npm update

info "Corrigindo vulnerabilidades conhecidas..."
npm audit fix

# 4. Validar o projeto
info "Executando lint..."
npm run lint --if-present

info "Executando testes..."
npm run test --if-present

info "Gerando build de produção..."
npm run build

# 5. Commit apenas dos arquivos de dependências
if ! git diff --quiet -- package.json package-lock.json; then
  git add -- package.json package-lock.json

  # Impede o commit se outros arquivos acabarem staged.
  if [[ -n "$(git diff --cached --name-only | grep -v -E '^(package\.json|package-lock\.json)$' || true)" ]]; then
    erro "Há arquivos inesperados staged. Commit cancelado."
  fi

  git commit -m "chore(deps): update npm dependencies"
else
  info "Nenhuma alteração nas dependências para registrar."
fi

# 6. Publicação de produção
info "Publicando na Vercel..."
vercel --prod

echo
info "Manutenção concluída!"
info "Branch: $BRANCH"
info "Confira o deploy e o histórico do Git."