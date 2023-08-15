from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'host', 'name', 'description', 'date', 'location', 'city', 'capacity', 'isPrivate', 'pkey', 'hasFee', 'entry_fee', 'link', )
# Register your models here.

admin.site.register(Event, EventAdmin)