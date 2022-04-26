# User Guide

## Start up local explorer on docker
```
cd docker 
make local-pg
# need to modify clean_domain_database to choose which .env file to use and setup its setting
make clean_domain_database
make local-indexer
make local-web
```

## Modify Settings
To change some of the content shown or the behaviour of the explorer, we can modify the environment variable settings in ./docker/.env_local

## Working with Metamask
You can easily add our chain settings to Metamask just by pressing on "Add Chain" button on the top bar.
![image](https://user-images.githubusercontent.com/6849462/136337910-7209e993-1a5a-4045-abb7-ccf078218501.png)
____

# Developer Guide

## Building docker image
if the building process(`prepare_mainnet_gcr_container` or `prepare_testnet_gcr_container`) terminated with `Killed` in `> webpack --mode production` step, try to assign more memory(default 2GB -> try 4GB) in docker setting

## Build up Test Environment
```
cd docker
make prepare_builder_container
make local-pg
make local-builder

# commands below are run in container

# build up elixir, phoenix, and js dependencies and build up postgres db settings
make mx-install
make setup-coin
make mx-compile
make js-install
make mx-digest

# This line should be run whenever postgres is created
make mx-prepare-db

# start up phoenix server (about 2 minutes)
make mx-start-server

```

## Apply .scss style changes
```
# after modify scss files for style changes
cd docker
make prepare_builder_container
make local-pg
make local-builder

# commands below are run in container
make js-install
make mx-digest
make mx-start-server

```

## Apply .ex file changes
```
# after modify .ex files for elixir/phoenix logic changes
cd docker
make prepare_builder_container
make local-pg
make local-builder

# commands below are run in container
make mx-compile
make mx-digest
make mx-start-server

```

## Apply .eex template changes
```
# after modify eex template files
cd docker
make prepare_builder_container
make local-pg
make local-builder

# commands below are run in container
make js-install
make mx-digest
make mx-start-server

```

## Reset database
```
cd docker 
make local-pg
# need to modify clean_domain_database to choose which .env file to use and setup its setting
make clean_domain_database
```