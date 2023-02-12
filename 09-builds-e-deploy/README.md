# Builds e Deploys

## Suporte ao internet explorer

Veja o arquivo gerado pelo Angular chamado .browserlistrc, é só descomentar o IE.

E o que isso faz? Ele só adiciona aqueles prefixos nos estilos CSS para que sejam compatíveis com outros browsers.

O segundo passo, é abrir o arquivo polyfills.ts e remover o comentário daquilo que você precisa.

Caso por exemplo, esteja utilizando animações, importe elas. Instale pelo terminal.

Também o zone.js. É importante para o Angular, independente do navegador.

## Build de produção

O padrão que vem no package.json é dentro dos scripts, conter:

```
"build": "ng build"
```

Porém, isso não é suficiente para produção. Temos um outro arquivo, que é o angular.json, ele contém todas as configurações do nosso projeto, por exemplo, o sourceRoot, que é onde está nosso código fonte; o estilo que nós estamos utilizando, e além disso, temos a configuração de "architect", build, e dentro dela é que temos as configurações do build de produção.

outputPath, por exemplo, é onde será gerado o arquivo do projeto, o build de produção. Os recursos que serão adicionados no projeto, ficam na pasta assets. Por isso que é importante não colocarmos css na parte de assets. Pra isso usa o estilos.

Voltando, dito anteriormente que o ng build não era suficiente, temos que colocar a flag de prod.

```
"build": "ng build --prod"
```

Isso vai fazer com que seja substituido as configurações do arquivo angular.json.
aot, é um build mais performático, gera o html, css e java script státicos.
O buildOptimizer é muito importante também para deixar nosso build mais enxuto.

Uma recomendação é não usar o ng build --prod, e sim o npm run build. Facilita caso estejamos utilizando uma ferramenta de integração contínua.

## Usando Firebase

### Hosting

- Instalar o Firebase CLI.

```
npm install -g firebase-tools
```

```
firebase login
```

```
firebase init
```

Escolher as funcionalidades que quer habilitar para este projeto. Neste caso apenas o hosting.

Para o diretório público, informar geralmente: dist/{preencher aqui nome do projeto}

Para a pergunta se queremos usar como Single Page Application, resposta: Sim.

Ele vai gerar o .firebaserc e firebase.json.

Depois de tudo, fazer:

```
firebase deploy
```

## Deploy no Firebase usando Angular CLI

A partir da versão 8.3 do Angular CLI, foi adicionado um comando novo, o ng deploy.

Onde através destes dois comandos:

```
ng add @angular/fire
ng deploy
```

A gente faz tudo do tópico anterior por meio destes comandos.

Além disso, o ng add @angular/fire adiciona o fire no nosso projeto Angular.

Então caso você queira usar o RealTimeDatabase do Firebase no Angular, já tem todos os comando também.

https://angular.io/guide/deployment

Lembrando que deve-se ter o firebase CLI instalado no seu computador, e precisa fazer também o firebase login.

O firebase CLI sempre precisa ser a última versão, pra evitar qualquer erro.

Qualquer coisa remova todos os arquivos firebase de antes e crie/atualize novamente com o firebase CLI.

O mesmo feito para o firebase pode ser feito para o Azure, Netlify, etc. Somente mudando o comando do ng add, conforme documentação.