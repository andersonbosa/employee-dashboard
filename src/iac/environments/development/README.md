# src/iac/environments/development/README.md

Aqui você encontra toda informação necessária para provisionar o ambiente de desenvolvimento.

O provisionamento foi automatizado usando `Makefile`. 

## Subindo/iniciando o ambiente

Use o seguinte comando para provisionar o ambiente:

```bash
make up
```

Após subir o ambiente você terá os seguintes containers Docker criados em sua máquina:

```
CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS          PORTS                                           NAMES
d161932b0311   development-frontend   "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes   0.0.0.0:4000->4000/tcp, :::4000->4000/tcp       development-frontend-1
1a541c51cf8f   development-backend    "docker-entrypoint.s…"   20 minutes ago   Up 13 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp       development-backend-1
de2d26316fe3   mongo:latest           "docker-entrypoint.s…"   20 minutes ago   Up 13 minutes   0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   development-mongodb-1
```

## Derrubando/parando o ambiente

Use o seguinte comando para parar o ambiente:

```bash
make down
```
