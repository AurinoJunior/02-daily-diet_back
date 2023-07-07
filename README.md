<div align="center">
    <img src="/gh-assests/logo-readme.svg" alt="Um garfo e uma faca preto com o nome Daily Diet ao lado direito" width="280"/>
   <h3>Daily Diet</h3>
</div>

<p align="center">
   <a href="https://www.instagram.com/aurigod97/">
      <img alt="Aurino Junior" src="https://img.shields.io/badge/-aurigod97-0390fc?style=flat&logo=Instagram&logoColor=white&color=blue" />
   </a>
    <a href="https://www.linkedin.com/in/aurino-junior-7718a4158/">
      <img alt="Aurino Junior" src="https://img.shields.io/badge/-Aurino%20Junior-0390fc?style=flat&logo=Linkedin&logoColor=white&color=blue" />
   </a>
</p>

📍 **Conteúdo**

- [Contexto](#blue_book-contexto)
- [Tecnologias](#computer-tecnologias)
- [Iniciando o projeto](#video_game-iniciando-o-projeto)
- [Licença](#page_with_curl-licença)

## :blue_book: Contexto

Nesse desafio desenvolvi uma API para controle de dieta diária, a Daily Diet API, desafio proposto para finalização do segundo modulo do bootcamp ignite nodejs 2023.

## :computer: Tecnologias

- Node
- Typescript
- Fastify
- Knex
- zod
- sqlite3
- vitest
- supertest
- eslint

## :video_game: Iniciando o projeto

1. Clonar o repositório com git
2. Instalar todas as dependencias com `yarn`
3. Criar um arquivo `.env` com base no `.env.example`
4. Rodar as migrations com `yarn knex migrate:latest`
5. E por fim rodar o projeto com `yarn dev`

> para rodar os testes uso um arquivo de variaveis de ambiente diferente `.env.test`

## Requisitos funcionais

- [x] Deve ser possível criar um usuário;
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
  1. Nome
  2. Descrição
  3. Data e Hora
  4. Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição.
- [x] Deve ser possível apagar uma refeição.
- [x] Deve ser possível listar todas as refeições de um usuário.
- [x] Deve ser possível visualizar uma única refeição.
- [x] Deve ser possível recuperar as métricas de um usuário.
  - [x] Quantidade total de refeições registradas.
  - [x] Quantidade total de refeições dentro da dieta.
  - [x] Quantidade total de refeições fora da dieta.
  - [x] Melhor sequência de refeições dentro da dieta.

## Requisitos de negocio

- [x] Deve ser possivel identificarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou.

## :page_with_curl: Licença

MIT
