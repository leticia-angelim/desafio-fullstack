# **Desafio Fullstack**

Uma pequena aplicação de cadastro de clientes com vínculo de contatos, onde é mostrado o cliente e seus contatos.

<br/>

## Tecnologias utilizadas

- Typescript
- React
- NodeJS
- Express
- TypeORM
- PostgreSQL
- Material UI
- toastify
- react-router-dom
- Cypress

<br/>

## Instalação e execução em ambiente de desenvolvimento

### Entre na pasta backend

```
cd backend/
```

### Instale as dependências

```
yarn
```

### Faça uma cópia do arquivo .env.example e coloque os dados do seu database

### Execute as migrações

```
yarn typeorm migration:run -d src/data-source.ts
```

### Rode a aplicação

```
yarn dev
```

### Abra um novo terminal e entre na pasta frontend

```
cd frontend/
```

### Instale as dependências

```
yarn
```

### Rode a aplicação

```
yarn start
```

<br/>

## Testes

### Abra um novo terminal, entre na pasta frontend e rode os testes

```
yarn run cypress open
```

### Quando o Cypress abrir, clique em E2E Testing, selecione um navegador, e rode o spec desejado
