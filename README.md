
# Projeto Rick And Morty API Documentação

## Link da aplicação:
[Website Rick And Morty](http://localhost:3000/)

---

## Como executar a aplicação em container Docker:

1. Na raiz da aplicação executar o comando:
   ```bash
   docker build -t project-rickandmorty .
   ```

2. Após o build, ainda na raiz da aplicação executar o comando:
   ```bash
   docker run -p 3000:3000 project-rickandmorty
   ```

3. Ir em seu navegador e acessar: [http://localhost:3000/](http://localhost:3000/)

---

## Como parar a aplicação em container Docker:

1. Na raiz da aplicação executar o comando:

   ```bash
   docker stop project-rickandmorty
   ```

---

## Como executar a aplicação diretamente do projeto:

1. Na raiz da aplicação executar o comando:

   ```bash
   npm start
   ```

---

## Como executar os testes da aplicação:

1. Na raiz da aplicação executar o comando:

   ```bash
   npm test
   ```
