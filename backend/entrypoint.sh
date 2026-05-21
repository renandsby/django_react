#!/bin/sh
set -e

# Espera por serviços dependentes (opcional)
# sleep 1

echo "Running migrations..."
python manage.py migrate --noinput || true

echo "Collecting static files..."
python manage.py collectstatic --noinput || true

exec "$@"
