# 🐳 Docker

## O que é Docker?

Docker é uma plataforma que permite empacotar aplicações e suas dependências em **containers**, garantindo que funcionem da mesma forma em qualquer ambiente. Ele facilita o desenvolvimento, testes e deploy de aplicações sem se preocupar com configurações específicas de cada máquina.

## Por que usamos Docker neste projeto?

No projeto **CicloZero**, utilizamos o Docker para garantir que o ambiente de desenvolvimento e produção sejam consistentes, estáveis e fáceis de replicar. Ele permite subir rapidamente serviços essenciais como o banco de dados PostgreSQL, além de facilitar a inicialização do backend e testes locais.

## Benefícios para o CicloZero

- 🚀 **Setup rápido**: bastam alguns comandos (`npm run docker:up`) para iniciar o ambiente completo.
- 🖁️ **Ambiente replicável**: o mesmo ambiente pode ser usado por qualquer desenvolvedor da equipe.
- 🔧 **Isolamento**: cada serviço roda em seu próprio container, evitando conflitos.
- 🛠️ **Facilidade de manutenção**: atualizações e reinicializações são simples e rápidas.

## Serviços Docker Utilizados

- **PostgreSQL** – Banco de dados relacional onde as informações de usuários, assinaturas e pagamentos são armazenadas.
- _(Futuramente outros serviços podem ser adicionados, como Redis, pgAdmin, etc.)_

## 📦 Scripts NPM para Docker

Este projeto utiliza o Docker e o Docker Compose para configurar o ambiente de desenvolvimento com um banco de dados PostgreSQL. Abaixo estão os comandos disponíveis via `npm run` e suas descrições.

## 🚀 Scripts disponíveis

### `npm run docker:up`

Sobe os containers definidos no `docker-compose.yml`.

```bash
npm run docker:up
```

**Equivalente a:**

```bash
docker compose up -d
```

### `npm run docker:down`

Derruba os containers e remove os volumes e redes associadas.

```bash
npm run docker:down
```

**Equivalente a:**

```bash
docker compose down -v
```

### `npm run docker:logs`

Exibe os logs em tempo real dos containers.

```bash
npm run docker:logs
```

**Equivalente a:**

```bash
docker compose logs -f
```

### `npm run docker:ps`

Lista os containers ativos do projeto.

```bash
npm run docker:ps
```

**Equivalente a:**

```bash
docker compose ps
```

### `npm run docker:restart`

Reinicia os containers do projeto.

```bash
npm run docker:restart
```

**Equivalente a:**

```bash
docker compose restart
```

---

## 🌐 Sobre a Rede Docker personalizada

O arquivo `compose.yaml` define uma rede personalizada chamada `backend_network`:

```yaml
networks:
  backend_network:
    driver: bridge
```

### 📌 O que ela faz:

- Cria uma rede isolada para os containers do projeto.
- Permite que os serviços se comuniquem entre si usando nomes como hostnames (ex: `db` para o banco de dados).
- Usa o driver `bridge`, padrão para redes Docker locais.

### 💡 Exemplo de conexão com o banco via `DATABASE_URL`:

```bash
DATABASE_URL=postgres://usuario:senha@db:5432/nomedobanco
```

Assim, o backend pode se conectar ao banco usando o nome `db` definido no serviço do `docker-compose`.
