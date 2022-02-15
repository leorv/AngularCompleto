# Diretivas

## Comandos

| Component | ng g component meu-componente  |
|-----------|--------------------------------|
| Service   | ng g service meu-servico       |
| Directive | ng g directive minha-diretiva  |
| Pipe      | ng g pipe meu-pipe             |
| Class     | ng g class minha-classe        |
| Interface | ng g interface minha-interface |
| Enum      | ng g enum meu-enum             |

## Usando pré processadores

Criando um novo projeto:

```
ng new meu-projeto --style=sass
ng new meu-projeto --style=less
ng new meu-projeto --style=stylus
```

Em um projeto existente:

```
ng set defaults.styleExt scss
ng set defaults.styleExt less
ng set defaults.styleExt styl
```

Update to Angular 6+:

Use the command like this:

```
ng config schematics.@schematics/angular:component.style scss
```

and the resulting angular.json shall look like this

```
"schematics": {
   "@schematics/angular:component": {
      "style": "scss"
    }
}
```

Other possible solutions & explanations:

To create a new project with angular CLI with sass support, try this:

```
ng new My_New_Project --style=scss 
```

You can also use --style=sass & if you don't know the difference, read this short & easy article and if you still don't know, just go with scss & keep learning.

article: https://sass-lang.com/documentation/syntax

## ng lint, ng test e ng e2e

Para verificar as boas práticas no código é sempre bom usar o ng lint.

```
ng lint
```

Testes unitários:

```
ng test
```

Testes de integração end-to-end:

```
ng e2e
```

## Gerando o build de desenvolvimento

```
ng build --target=development --environment=dev

ng build --dev --e=dev

ng build --dev

ng build
```

## Gerando o build de produção (final)

```
ng build --target=production --environment=prod

ng build --prod --env=prod

ng build --prod
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
