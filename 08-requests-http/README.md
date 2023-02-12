# RequestsHttp

## Instalando o bootstrap

Conferir em nos docs do bootstrap. Em geral:

```npm install bootstrap --save```

Se quiser passar uma versão:

```npm install bootstrap@3.3.7```

O --save atualiza o package.json. Recomendável.

Adicionar o bootstrap nos styles.

## Instalando o ngx-bootstrap

Ao invés de usar o JQuery, podemos usar o ngx-bootstrap.

Conferir nas docs do ngx bootstrap. Em geral:

```ng add ngx-bootstrap```

## Utilizar o json-server

Para simular os 4 verbos http.

```npm install -g json-server```

Podemos criar um arquivo db.json com alguns dados de exemplo.

Então, no terminal:

```json-server --watch db.json```

## Plugin REST CLIENT

Podemos testar o server com este plugin, fazendo requisições http.

É um plugin do VS Code.

Então criamos um arquivo *.http e podemos criar as requisições lá.