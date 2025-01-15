#!/bin/sh

curl -X POST \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"$OLLAMA_MODEL\", \"stream\": false }" \
    http://ollama.fastack:11434/api/pull