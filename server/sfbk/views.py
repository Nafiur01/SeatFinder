from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.http import JsonResponse
from django.conf import settings
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by('-created_at')
    serializer_class = EventSerializer
    # order = ['-created_at']

class EventAttendanceViewSet(viewsets.ModelViewSet):
    queryset = EventAttendance.objects.all()
    serializer_class = EventAttendanceSerializer

class EventSpeakerViewSet(viewsets.ModelViewSet):
    queryset = EventSpeaker.objects.all()
    serializer_class = EventSpeakerSerializer

class EventImageViewSet(viewsets.ModelViewSet):
    queryset = EventImage.objects.all()
    serializer_class = EventImageSerializer

@api_view(['GET'])
def event_speakers_list(request, event_id):
    speakers = EventSpeaker.objects.filter(event=event_id)
    serializer = EventSpeakerSerializer(speakers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def event_images_list(request, event_id):
    eimgs = EventImage.objects.filter(event=event_id)
    serializer = EventImageSerializer(eimgs, many=True)
    return Response(serializer.data)

def image_list_api(request):
    assets_path = os.path.join(settings.MEDIA_ROOT, 'assets')
    image_files = [filename for filename in os.listdir(assets_path) if filename.endswith(('.jpg', '.png', '.jpeg'))]

    image_urls = [os.path.join(settings.STATIC_URL, 'assets', filename) for filename in image_files]
    return JsonResponse(image_urls, safe=False)

@api_view(['GET'])
def event_attendances_list(request, event_id):
    attendances = EventAttendance.objects.filter(event=event_id)
    serializer = EventAttendanceSerializer(attendances, many=True)
    return Response(serializer.data)