# Bookstop
Basic blog/ecommerce site including basic functionality for a modern/scalable web app:
- Secure token authentication across multiple devices with django-rest-knox
- Celery, Celery beat and Redis
- SWR
- Typescript
- Tailwind
- React hook forms
- Quill.js or another WYSIWYG editor.
- Stripe API
- Potentially Redux toolkit if needed


# To run the project
- Create a virtual environment - `python -m venv venv`
- Enter virtual environment - `source venv/bin/activate`
- Install packages - `pip install -r requirements.txt`
- Migrate database - `python manage.py migrate`

- Run Django - `python manage.py runserver`
- Run Celery - `celery -A bookstop worker -l INFO`
- Run Celery beat - `celery -A bookstop beat -l INFO`

- Install node packages - `yarn install`
- Run Nextjs - `yarn dev`
