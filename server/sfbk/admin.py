from django.contrib import admin
from .models import *

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'link', 'date', 'location', 'city', 'capacity', 'isPrivate', 'pkey', 'hasFee', 'entryFee', 'host', 'thumb', 'isCompleted')
# Register your models here.

admin.site.register(Event, EventAdmin)
admin.site.register(EventImage)
admin.site.register(Userprofile)
admin.site.register(EventSpeaker)
admin.site.register(EventAttendance)