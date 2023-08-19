from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.http import JsonResponse
from django.conf import settings
import os

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    ordering = ['-date']



def image_list_api(request):
    assets_path = os.path.join(settings.MEDIA_ROOT, 'assets')
    image_files = [filename for filename in os.listdir(assets_path) if filename.endswith(('.jpg', '.png', '.jpeg'))]

    image_urls = [os.path.join(settings.STATIC_URL, 'assets', filename) for filename in image_files]
    return JsonResponse(image_urls, safe=False)
