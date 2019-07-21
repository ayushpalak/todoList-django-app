# todoList-django-app
To do list app to create to do list. built over python django stack and bootstrap framework.

# install dependencies (few dependecies are for VS code specific)
pip install -r requirements.txt 

# create required tables
python manage.py makemigrations
python manage.py migrate

# create admin user
python manage.py createsuperuser

# run server
python manage.py runserver

open http://127.0.0.1:8000   -> create a to do list and submit


# The entry deleted from non-admin interface are still visible for the Admin.

# Provided search and filtering with required fields in the admin interface.

# Admin is able to download the bulk entries of to-do list in csv format from
Django Admin Interface.

# Created a bash script that makes a curl request to get all the todolist items.
