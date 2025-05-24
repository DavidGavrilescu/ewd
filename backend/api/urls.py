from django.urls import path
from . import views

urlpatterns = [
    path('postari-blog/', views.lista_postari_blog, name='lista_postari_blog'),
    path('postari-blog/<int:id>/', views.detaliu_postare_blog, name='detaliu_postare_blog'),  # <-- ADĂUGAT
    path('mesaje-contact/', views.lista_mesaje_contact, name='lista_mesaje_contact'),
    path('elemente-galerie/', views.lista_elemente_galerie, name='lista_elemente_galerie'),
    path('intrebari-bot/', views.lista_intrebari_bot, name='lista_intrebari_bot'),
    path('despre/', views.lista_despre, name='lista_despre'),
]
