# Fastack

Lancer le projet :

```bash
npm i -g pnpm

npm i

pnpm build

cd apps/frontend

pnpm dev
```

# Virtuoso

Once the container is up update the virtuoso.ini file

```
DirsAllowed			= ., /usr/local/virtuoso-opensource/share/virtuoso/vad, /data
```

Down and up the container then enter bash

````bash
docker exec -it virtuoso bash
```

Execute the following commands in order to load the graph into the container

```bash
# access sql console
isql-v

# load the data
ld_dir('/data', 'poke-a.nq', 'http://www.example.com/my-graph');

rdf_loader_run();

```
Go to http://localhost:8890/sparql and query your graph





````
