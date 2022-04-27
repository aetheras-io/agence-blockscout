SHELL := /bin/bash
SEM_VER := 0.1.5
ORG := aetheras-io
PROJECT := blockscout

prepare_mainnet_gcr_container:
	source .env_local && docker build --build-arg COIN=$$COIN -t gcr.io/${ORG}/${PROJECT}:v${SEM_VER} -f Dockerfile ../

prepare_testnet_gcr_container:
	source .env_testnet && docker build --build-arg COIN=$$COIN -t gcr.io/${ORG}/${PROJECT}_testnet:v${SEM_VER} -f Dockerfile ../

prepare_builder_container: 
	source .env_local && docker build --build-arg COIN=$$COIN -f Dockerfile.builder -t blockscout_builder:latest ../

clean_domain_database:
	source .env_local ; \
	echo "clean up database: $$DOMAIN_DATABASE" ; \
	psql -U postgres -d postgresql://127.0.0.1:5432/postgres -c 'DROP DATABASE IF EXISTS '"\"$$DOMAIN_DATABASE\""';' ; \
	sleep 3 ; \
	docker run -e DATABASE_URL=$$DATABASE_URL -e ECTO_USE_SSL=$$ECTO_USE_SSL --rm gcr.io/${ORG}/${PROJECT}_testnet:v${SEM_VER} /bin/sh -c "mix do ecto.create, ecto.migrate"

local: local-pg clean_domain_database local-indexer local-web

local-down:
	source .env_local; \
	docker-compose -f docker-compose.yaml down

local-pg:
	source .env_local; \
	docker-compose -f docker-compose.yaml up -d postgres adminer ; \
	sleep 3

local-builder: 
	@echo "==> Starting blockscout" 
	source .env_local; \
	docker-compose -f docker-compose.yaml up -d blockscout_builder ;\
	docker exec -ti explorer_builder /bin/sh -c 'cd /builder_app/docker ; /bin/sh'

local-indexer: 
	@echo "==> Starting blockscout indexer" 
	source .env_local; \
	docker-compose -f docker-compose.yaml up -d blockscout_indexer ;\

local-web: 
	@echo "==> Starting blockscout web" 
	source .env_local; \
	docker-compose -f docker-compose.yaml up -d blockscout_web ;\

# local-web-extra: 
# 	@echo "==> Starting blockscout web" 
# 	source .env_local; \
# 	docker-compose -f docker-compose.yaml up -d blockscout_web_extra ;\

clean_builder:
	cd ../ ; \
	rm -rf .npm \
		.cache \
		.rustup \
		.cargo \
		.profile \
		.ash.history \
		_build \
		deps \
		logs \
		apps/block_scout_web/assets/node_modules \
		apps/block_scout_web/priv/static \

# It costs lots of time when called at first time
# Should be run in explorer_builder due to rust dependency
mx-install:
	cd ../ ; \
	mix do deps.get, local.rebar --force, deps.compile 

setup-coin:
	echo 'setup COIN symbol as ${COIN}' ; \
	sed -i -e '/msgid "Ether"/ {' -e 'n; s/msgstr ""/msgstr "${COIN}"/' -e '}' ../apps/block_scout_web/priv/gettext/en/LC_MESSAGES/default.po

# It costs lots of time when called at first time
# Should be run in explorer_builder
mx-compile:
	cd ../ ;\
	mix compile

# Should be run in explorer_builder due to some building files have dependency to os system
js-install:
	cd ../ ;\
	cd apps/block_scout_web/assets/ ; \
    npm install && npm run deploy
	cd ../ ; \
    cd apps/explorer/ ; \
    npm install

# Should be run in explorer_builder
mx-digest:
	cd ../ ;\
	mix phx.digest

# Should be run in explorer_builder
mx-prepare-db:
	cd ../ ;\
	echo $$MIX_ENV ;\
	mix do ecto.create, ecto.migrate

# Should be run in explorer_builder due to environment variables
mx-start-server:
	cd ../ ;\
	mix phx.server

.PHONY: clean_builder
