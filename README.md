# Stack

- React
- TypeScript
- Vite
- Django

# Setup & Rulare

## Frontend

- `cd frontend`
- `npm install`
- `npm run dev`

## Backend

- `cd backend`
- `python -m venv venv`
- `source venv/bin/activate` # sau `venv\Scripts\activate` pe Windows
- `pip install -r requirements.txt`
- `pip install django-cors-headers Pillow` # dependinte suplimentare
- `python manage.py migrate`
- `python manage.py createsuperuser` # optional, pentru acces admin
- `python manage.py runserver`

Panoul de admin este disponibil la http://localhost:8000/admin dupa crearea utilizatorului.

# Tool-uri Necesare

- Node.js
- NPM
- Python 3.x
