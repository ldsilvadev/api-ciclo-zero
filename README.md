# Gerenciador de Assinaturas Pessoais – SaaS

Uma plataforma para organizar, monitorar e economizar com suas assinaturas digitais.

---

## 💡 Sobre o Projeto

O **Gerenciador de Assinaturas Pessoais** resolve um problema comum: o descontrole sobre serviços assinados (Netflix, Spotify, Amazon Prime, cursos, softwares, etc.), esquecendo de cancelar, pagando no débito automático ou perdendo o controle dos gastos mensais.

**Solução:**
Uma plataforma centralizada onde o usuário pode cadastrar e monitorar todas as suas assinaturas, receber alertas de renovação e visualizar relatórios de gastos. Para usuários Pro, o sistema detecta assinaturas automaticamente via integração com e-mail ou Open Finance.

---

## 🚀 Funcionalidades

### MVP (Versão Mínima Viável)

- Cadastro e login de usuários
- Inserção manual de assinaturas
- Dashboard com lista de assinaturas e datas de renovação
- Notificações de renovação por e-mail
- Plano gratuito (limitado) e upgrade para plano pago

### Roadmap

| Fase | Funcionalidades                          |
| ---- | ---------------------------------------- |
| MVP  | Cadastro, assinatura manual, alertas     |
| V1   | Plano pago, estatísticas, histórico      |
| V2   | Integração com Gmail API                 |
| V3   | Open Finance, IA para previsão de gastos |

---

## 💰 Monetização

- **Plano Gratuito:**

  - Até 3 assinaturas monitoradas
  - Inserção manual apenas

- **Plano Pro (R$9,90/mês ou R$99/ano):**

  - Monitoramento automático (e-mail/Open Finance)
  - Alertas por e-mail, WhatsApp, push
  - Dashboard com gráficos e estatísticas

- **Parcerias e Afiliados:**
  - Promoção de bancos digitais, cartões ou cursos de finanças

---

## 📈 Estratégia de Marketing

- Conteúdo em TikTok e Reels com dicas de finanças pessoais
- Parcerias com influenciadores de finanças
- Blog com SEO focado em cancelamento de assinaturas
- Divulgação em grupos de finanças (Telegram, Reddit, etc.)

---

## ⚙️ Engenharia do Projeto

- **Frontend:** React (Vite) + Material UI
- **Backend:** Node.js (Fastify)
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT
- **Integrações Futuras:** Open Finance, Gmail API

---

## 🗂️ Estrutura de Pastas

```
src/
  components/
    AppRouteProviders/
    AuthenticatedRoutes/
    NonAuthenticatedRoutes/
  contexts/
  hooks/
  pages/
    Home.tsx
    Login.tsx
    Register.tsx
    ResetPassword.tsx
  providers/
    AuthProvider/
      AuthProvider.tsx
  utils/
    authToken.ts
  App.tsx
```

---

## 🗃️ Modelagem de Dados (Resumo)

**User**

- id
- name
- email
- password_hash
- plan (free/pro)
- created_at

**Subscription**

- id
- user_id (FK)
- name (ex: Netflix)
- price
- billing_cycle (monthly/yearly)
- due_date
- installment
- auto_detected (boolean)
- created_at

**Notification**

- id
- user_id (FK)
- subscription_id (FK)
- type (email/push/whatsapp)
- sent_at

**Payment**

- id
- user_id (FK)
- value
- payment_date
- method
- status

---

## 🛠️ Instalação e Uso

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/gerenciador-assinaturas.git
   cd gerenciador-assinaturas
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure variáveis de ambiente:**
   Crie um arquivo `.env` com as variáveis necessárias (exemplo: URLs da API, chaves de autenticação).

4. **Inicie o projeto:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

---

## 🧩 Scripts Disponíveis

- `npm run dev` / `yarn dev`: Inicia o servidor de desenvolvimento.
- `npm run build` / `yarn build`: Gera a versão de produção.

---

## 🔒 Autenticação

- Autenticação baseada em JWT, armazenado em `localStorage`.
- Contexto de autenticação gerencia login, logout e expiração automática.
- Sincronização entre múltiplas abas.
- Logout automático ao expirar o token.

---

## 🛡️ Gerenciamento de Rotas

- **Rotas públicas:** `/login`, `/register`, `/reset-password`
- **Rotas privadas:** `/home` e futuras
- **Redirecionamento:**
  - Usuário autenticado tentando acessar rota pública → `/home`
  - Usuário não autenticado tentando acessar rota privada → `/login`

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---
