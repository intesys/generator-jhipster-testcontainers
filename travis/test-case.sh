#!/usr/bin/env bash

# This makes this script fails the Travis build when it itself fails (otherwise it is an evergreen test)
set -ev

#-------------------------------------------------------------------------------
# Force no insight
#-------------------------------------------------------------------------------
mkdir -p "$HOME"/.config/configstore/
cp "$JHIPSTER_TRAVIS"/configstore/*.json "$HOME"/.config/configstore/

ls "$HOME"/.config/configstore/

mkdir -p "HOME"/jhapp
cp -f "$JHIPSTER_TRAVIS"/"$JHIPSTER_DATABASE"/app.jdl "HOME"/jhapp/
cd "HOME"/jhapp/

npm install generator-jhipster
npm link generator-jhipster-testcontainers

jhipster import-jdl app.jdl --no-insight --force --with-entities
yo jhipster-testcontainers --force

if [ -f mvnw ]; then
    chmod +x mvnw
    ./mvnw test -Dspring.profiles.active=testcontainers
else 
    chmod +x gradlew
    ./gradlew test -Ptestcontainers
fi

