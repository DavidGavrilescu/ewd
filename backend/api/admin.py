from django.contrib import admin
from .models import PostareBlog, MesajContact, ElementGalerie, IntrebareBot, Despre, Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('nume', 'rating', 'data_creare', 'session_id')
    list_filter = ('rating', 'data_creare')
    search_fields = ('nume', 'comentariu')
    readonly_fields = ('data_creare', 'session_id')
    ordering = ('-data_creare',)

admin.site.register(PostareBlog)
admin.site.register(MesajContact)
admin.site.register(ElementGalerie)
admin.site.register(IntrebareBot)
admin.site.register(Despre)
