#!/bin/bash

# Carrega as variáveis de ambiente do arquivo .env se existir
if [ -f /tmp/.env ]; then
  source /tmp/.env
fi

# Substitui as variáveis de ambiente no template
envsubst < /usr/local/kong/declarative/kong.yml.template > /usr/local/kong/declarative/kong.yml

# Inicia o Kong
exec "$@"