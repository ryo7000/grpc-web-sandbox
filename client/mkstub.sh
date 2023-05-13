#!/usr/bin/env bash

set -eu

# Need following
#   protoc:              https://github.com/protocolbuffers/protobuf/releases
#   protoc-gen-js:       https://github.com/protocolbuffers/protobuf-javascript/releases
#   protoc-gen-grpc-web: https://github.com/grpc/grpc-web/releases

protoc -I=../proto echo.proto \
    --js_out=import_style=commonjs:./stub \
    --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:./stub
