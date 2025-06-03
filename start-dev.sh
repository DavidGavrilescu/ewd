#!/bin/zsh

echo "🚀 Pornim aplicatia EWD..."

echo "🔧 Backend Django la http://localhost:8000"
cd backend

python manage.py shell -c "
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')
" 2>/dev/null

python manage.py runserver &

echo "🎨 Frontend React la http://localhost:5173"
cd ../frontend && npm run dev &

echo "✅ Aplicatia a pornit!"
echo "📋 Pentru oprire: Ctrl+C"
echo "🔑 Admin panel: http://localhost:8000/admin/ (admin/admin)"

wait
