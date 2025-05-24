from django.contrib import admin
from django.urls import path, include
from api.views import pagina_principala
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', pagina_principala, name='pagina_principala'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)