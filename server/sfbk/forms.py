from django import forms
from .models import Event, EventImage

EventImageFormSet = forms.modelformset_factory(
    EventImage,
    fields=('image',),
    extra=10,  # Allow up to 10 images per event
    max_num=10,
)