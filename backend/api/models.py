from django.db import models

class PostareBlog(models.Model):
    titlu = models.CharField(max_length=200)
    poza = models.ImageField(upload_to='media/')
    descriere = models.TextField()
    continut_html = models.TextField()
    etichete = models.CharField(max_length=300)
    data_creare = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titlu

class MesajContact(models.Model):
    nume = models.CharField(max_length=100)
    email = models.EmailField()
    subiect = models.CharField(max_length=200)
    numar_pisici = models.PositiveIntegerField(default=0)
    mesaj = models.TextField()
    abonat = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nume} - {self.subiect}"

class ElementGalerie(models.Model):
    poza = models.ImageField(upload_to='imagini_galerie/')
    descriere = models.TextField()

    def __str__(self):
        return f"Element Galerie {self.id}"

class IntrebareBot(models.Model):
    intrebare = models.CharField(max_length=300)
    variante = models.TextField(help_text="JSON")

    def __str__(self):
        return self.intrebare

class Despre(models.Model):
    titlu = models.CharField(max_length=200)
    continut = models.TextField()

    def __str__(self):
        return self.titlu

class Review(models.Model):
    nume = models.CharField(max_length=100)
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 stars
    comentariu = models.TextField()
    data_creare = models.DateTimeField(auto_now_add=True)
    session_id = models.CharField(max_length=255)  # pentru identificarea user-ului

    def __str__(self):
        return f"{self.nume} - {self.rating} stars"

    class Meta:
        ordering = ['-data_creare']
