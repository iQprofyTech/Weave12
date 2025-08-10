#!/bin/bash
set -e
cd "$(dirname "$0")/.."
docker compose -f infra/docker/docker-compose.yml run --rm api npx prisma migrate deploy
