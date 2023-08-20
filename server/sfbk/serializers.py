from rest_framework import serializers
from .models import *


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = '__all__'

class EventSpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventSpeaker
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    speakers = EventSpeakerSerializer(many=True, read_only=True)
    class Meta:
        model = Event
        fields = '__all__'