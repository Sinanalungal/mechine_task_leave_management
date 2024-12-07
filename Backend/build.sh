#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e



echo "Applying migrations..."
python manage.py migrate --noinput
python Backend/manage.py migrate --noinput


echo "Creating superuser..."
python manage.py createsuperuser --no-input
python Backend/manage.py createsuperuser --no-input


echo "Build script completed successfully."
