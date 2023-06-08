
# Bem-vindo ao Trivia
Trivia é um jogo de perguntas e respostas divertido e educativo. O objetivo é acertar o máximo de perguntas em um tempo determinado. A pontuação é baseada na quantidade de perguntas corretas e na rapidez em respondê-las. É uma opção versátil e acessível para todos os públicos.

</details>

## Sumário
- [Bem-vindo ao Trivia](#bem-vindo-ao-trivia)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Deploy](#deploy)
- [QRcode](#qrcode)
- [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
- [Lint](#lint)

## Tecnologias e Ferramentas Utilizadas

Este projeto utiliza as seguintes tecnologias e ferramentas:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/) | Linguagem de programação de auto nível. 
- [React](https://react.dev/) | Biblioteca javascript de código aberto para criação de interfaces de usuários.
- [Gravatar](https://mongoosejs.com/docs/) | Serviço online que permite associar uma imagem de perfil a um endereço de e-mail.
- [Redux](https://expressjs.com/pt-br/) | Biblioteca de gerenciamento de estado para aplicativos JavaScript.

O uso do JavaScript, React, Gravatar e Redux no desenvolvimento de aplicações web oferece uma série de benefícios e vantagens. Quando utilizo o JavaScript, posso criar aplicações web interativas e dinâmicas, tornando minhas páginas mais envolventes e responsivas. Com o React, tenho acesso a uma biblioteca JavaScript focada na construção de interfaces de usuário (UI). Isso me permite criar componentes reutilizáveis e declarativos, simplificando o processo de criação de interfaces complexas e interativas. Além disso, o Gravatar é um serviço online que utilizo para associar uma imagem de perfil ao meu endereço de e-mail. Isso é especialmente útil em sites e aplicativos nos quais desejo exibir minha imagem de perfil aos outros usuários. Com o Gravatar, tenho a vantagem de ter uma imagem de perfil consistente em diferentes comunidades online, facilitando o reconhecimento e a identificação. Quanto ao Redux, ele é uma biblioteca de gerenciamento de estado que utilizo para minhas aplicações JavaScript, especialmente aquelas construídas com o React. Com o Redux, tenho uma abordagem previsível e centralizada para gerenciar o estado da minha aplicação. Essa biblioteca é especialmente útil em aplicações com fluxos de dados complexos, nos quais várias partes da minha aplicação precisam acessar e atualizar o mesmo estado. 

## Instalação e Execução
### Download do projeto
```
git@github.com:JonathanProjetos/Trivia.git
```
### Instalar dependências
```
cd Trivia
npm install
npm start
```
### Comportamento esperado
  - Para inicializar, será necessário informar um nome com a soma dos caracteres maior que 6 e um e-mail válido no formato test@test.com.
  - Quando acessar a página do jogo, o contador será iniciado. Você terá 1 minuto para concluir todas as 10 questões. Caso o tempo expire, você será redirecionado para a página de feedback.
  - Cada questão pode ser selecionada apenas uma vez, sendo necessário clicar no botão "Next" para receber uma nova pergunta. A pontuação pode variar com base no nível de dificuldade estabelecido       na API que é consumida pela aplicação. Os níveis de dificuldade nesta aplicação podem ser difíceis, médios e fáceis. O cálculo da pontuação em função da dificuldade já está sendo feito dentro       da aplicação.
  - Após a conclusão das perguntas, você será direcionado para a página de feedback, onde terá acesso ao resumo da partida. Nesta tela, você também poderá acessar o ranking e iniciar uma nova           partida.

### Gravatar
  - Você pode criar um perfil único vinculado ao seu e-mail no site do Gravatar. Isso permitirá que você tenha uma imagem de perfil associada ao seu endereço de e-mail neste [Link](https://br.gravatar.com/)
### Deploy
- Foi realizado o deploy da aplicação no Vercel. Você pode acessar a aplicação através deste. [Link](https://trivia-nu-ten.vercel.app/).

### QRcode
  <img src="https://drive.google.com/uc?export=view&id=1us2NY8_8SR6hG2Tx9nlXYJrxM0K0mYQW" width="200" height="200" />
  
### Git, GitHub e Histórico de Commits
Este projeto utilizou a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli) para ajudar a seguir a convenção de commits. É importante utilizar a convenção de commits em projetos para manter o histórico de commits organizado e facilitar a leitura e o entendimento do que foi desenvolvido.


### Lint
- O projeto foi desenvolvido seguindo os padrões de Clean Code especificados pelo [Lint da Trybe](https://github.com/betrybe/eslint-config-trybe).

