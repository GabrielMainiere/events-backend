FROM kong:3.4

USER root

# Instala gettext-base para o comando envsubst
RUN apt-get update && apt-get install -y gettext-base && rm -rf /var/lib/apt/lists/*

# Copia o plugin e os arquivos de configuração
COPY plugins/jwt-claims-injector /usr/local/share/lua/5.1/kong/plugins/jwt-claims-injector
COPY kong.yml.template /usr/local/kong/declarative/kong.yml.template
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Define permissões
RUN chown -R kong:kong /usr/local/share/lua/5.1/kong/plugins && \
    chown -R kong:kong /usr/local/kong/declarative && \
    chmod +x /usr/local/bin/entrypoint.sh

USER kong

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
