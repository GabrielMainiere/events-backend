FROM kong:3.4

USER root

# Instala gettext-base para o comando envsubst
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

# Copia o plugin
COPY plugins/jwt-claims-injector /usr/local/share/lua/5.1/kong/plugins/jwt-claims-injector

# Cria o diretório declarative e define permissões
RUN mkdir -p /usr/local/kong/declarative && \
    chown -R kong:kong /usr/local/share/lua/5.1/kong/plugins && \
    chown -R kong:kong /usr/local/kong/declarative

USER kong
