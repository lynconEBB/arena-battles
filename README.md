# Arena Battles

Este projeto tem como objetivo criar um jogo multiplayer em tempo real de batalhas em instâncias, em que os jogadores controlam naves e devem atirar projetéis em seus adversários.

![Janela Jogo](https://github.com/lynconEBB/arena-battles/blob/master/content/game.png)

---

### Requisitos

- Node
- NPM

### Considerações

Este projeto foi criado como meio avaliativo de conclusão da matéria de Instrodução a Ciência da Computação da Universidade Estadual do Oeste do Paraná (UNIOESTE).

O jogo foi escrito totalmente em javascript utilizando o framework express com node para back-end juntamente com o pacote socket.io para manipulação de web sockets.

### Instalação

Primeiramente clone o repositório no local em que achar adequado com o comando:
```bash
git clone https://github.com/lynconEBB/arena-battles
```
Em seguida, instale as dependencias necessárias utilizando o seguinte comando estando na pasta raiz do projeto:
```bash
npm install
```

### Uso
É possivel acessar o jogo utilizando o seguinte comando e acessando o localhost na porta 3000:
```bash
npm run serve
```
Ou por meio do [link oficial](https://arena-battles.herokuapp.com/).

É possivel criar uma partida utilizando o primeiro botão no menu principal, o que resultará em um código de partida unico que poderá ser compartilhado e posteriormente acessado por outras pessoas pressionando o segundo botão do menu principal e inserindo este código

O criador da partida poderá iniciar o jogo pressionando o botão *play* no topo da tela.

![Janela Principal](https://github.com/lynconEBB/arena-battles/blob/master/content/initialPage.png)

### Autores

- Lyncon Baez
- Kevin Matheus
- Vitor Fonseca

### Licença

[MIT](https://github.com/lynconEBB/arena-battles/blob/master/LICENSE)