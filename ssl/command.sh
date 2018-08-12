#!/bin/bash

openssl req \
  -newkey rsa:2048 \
  -x509 \
  -nodes \
  -keyout key.pem \
  -new \
  -out cert.pem \
  -subj "/C=IN/ST=Karnataka/O=Enchanting Travels/CN=tm.dev" \
  -reqexts SAN \
  -extensions SAN \
  -config <(cat /System/Library/OpenSSL/openssl.cnf \
    <(printf '[SAN]\nsubjectAltName=DNS:tm.dev,DNS:jw.tm.dev,DNS:auth.tm.dev')) \
  -sha256 \
  -days 3650
