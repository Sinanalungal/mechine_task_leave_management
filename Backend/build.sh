#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e



echo "Applying migrations..."
python manage.py migrate --noinput

# Conditionally create a superuser if the CREATE_SUPERUSER environment variable is set
if [[ $CREATE_SUPERUSER ]];
then
  echo "Creating superuser..."
  python manage.py createsuperuser --no-input
fi


echo "Build script completed successfully."
