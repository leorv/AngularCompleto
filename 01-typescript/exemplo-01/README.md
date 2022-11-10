# Typescript

## Converter para Javascript

```
npx tsc src/index.ts
```

Para configurar todos os arquivos:

Criar um tsconfig.json com o comando `npx tsc --init`

Ele é um json com várias propriedades que podemos habilitar ou não várias coisas.

Então, é só descomentar a propriedade rootDir e indicar o caminho, que geralmente se usa ./src.

Outra propriedade interessante é outDir, que será a pasta de saída dos arquivos. Geralmente se usa ./build.

