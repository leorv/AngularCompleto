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


