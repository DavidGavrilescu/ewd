from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponse
from .models import PostareBlog, MesajContact, ElementGalerie, IntrebareBot, Despre

@csrf_exempt
def lista_postari_blog(request):
    if request.method == 'GET':
        postari = PostareBlog.objects.all().values('id', 'titlu', 'descriere', 'continut_html', 'etichete', 'data_creare', 'poza')
        return JsonResponse(list(postari), safe=False)
    elif request.method == 'POST':
        try:
            date = json.loads(request.body)
            postare = PostareBlog.objects.create(
                titlu=date['titlu'],
                descriere=date['descriere'],
                continut_html=date['continut_html'],
                etichete=date['etichete'],
                poza=date.get('poza', '')
            )
            return JsonResponse({
                'id': postare.id,
                'titlu': postare.titlu,
                'descriere': postare.descriere,
                'continut_html': postare.continut_html,
                'etichete': postare.etichete,
                'data_creare': postare.data_creare,
                'poza': postare.poza.url if postare.poza else None
            }, status=201)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest("Date invalide.")
    return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def lista_mesaje_contact(request):
    if request.method == 'GET':
        mesaje = MesajContact.objects.all().values()
        return JsonResponse(list(mesaje), safe=False)
    elif request.method == 'POST':
        try:
            date = json.loads(request.body)
            mesaj = MesajContact.objects.create(
                nume=date['nume'],
                email=date['email'],
                subiect=date['subiect'],
                numar_pisici=date['numar_pisici'],
                mesaj=date['mesaj'],
                abonat=date['abonat']
            )
            return JsonResponse({
                'id': mesaj.id,
                'nume': mesaj.nume,
                'email': mesaj.email,
                'subiect': mesaj.subiect,
                'numar_pisici': mesaj.numar_pisici,
                'mesaj': mesaj.mesaj,
                'abonat': mesaj.abonat
            }, status=201)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest("Date invalide.")
    return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def lista_elemente_galerie(request):
    if request.method == 'GET':
        elemente = ElementGalerie.objects.all().values('id', 'poza', 'descriere')
        return JsonResponse(list(elemente), safe=False)
    elif request.method == 'POST':
        try:
            date = json.loads(request.body)
            element = ElementGalerie.objects.create(
                poza=date.get('poza', ''),
                descriere=date['descriere']
            )
            return JsonResponse({
                'id': element.id,
                'poza': element.poza.url if element.poza else None,
                'descriere': element.descriere
            }, status=201)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest("Date invalide.")
    return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def lista_intrebari_bot(request):
    if request.method == 'GET':
        intrebari = IntrebareBot.objects.all().values('id', 'intrebare', 'variante')
        return JsonResponse(list(intrebari), safe=False)
    elif request.method == 'POST':
        try:
            date = json.loads(request.body)
            intrebare = IntrebareBot.objects.create(
                intrebare=date['intrebare'],
                variante=date['variante']
            )
            return JsonResponse({
                'id': intrebare.id,
                'intrebare': intrebare.intrebare,
                'variante': intrebare.variante
            }, status=201)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest("Date invalide.")
    return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def lista_despre(request):
    if request.method == 'GET':
        informatii = Despre.objects.all().values('id', 'titlu', 'continut')
        return JsonResponse(list(informatii), safe=False)
    elif request.method == 'POST':
        try:
            date = json.loads(request.body)
            despre = Despre.objects.create(
                titlu=date['titlu'],
                continut=date['continut']
            )
            return JsonResponse({
                'id': despre.id,
                'titlu': despre.titlu,
                'continut': despre.continut
            }, status=201)
        except (KeyError, json.JSONDecodeError):
            return HttpResponseBadRequest("Date invalide.")
    return HttpResponseNotAllowed(['GET', 'POST'])


def pagina_principala(request):
    return HttpResponse("")

@csrf_exempt
def detaliu_postare_blog(request, id):
    if request.method == 'GET':
        try:
            postare = PostareBlog.objects.get(pk=id)
            return JsonResponse({
                'id': postare.id,
                'titlu': postare.titlu,
                'descriere': postare.descriere,
                'continut_html': postare.continut_html,
                'etichete': postare.etichete,
                'data_creare': postare.data_creare,
                'poza': postare.poza.url if postare.poza else None
            })
        except PostareBlog.DoesNotExist:
            return JsonResponse({'eroare': 'Postare inexistenta'}, status=404)

    return HttpResponseNotAllowed(['GET'])