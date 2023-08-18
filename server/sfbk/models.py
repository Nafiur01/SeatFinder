from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
import os
from django.core.exceptions import ValidationError

# Create your models here.

        

def event_thumbnail_path(instance, filename):
    # Generate a slug from the event name
    event_name_slug = slugify(instance.name)
    
    # Get the file extension from the original filename
    _, ext = os.path.splitext(filename)
    
    # Construct the new filename using the event name slug and file extension
    new_filename = f"thumbnails/{event_name_slug}{ext}"
    
    return new_filename


class EventImage(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='')

    def upload_to_path(instance, filename):
        return os.path.join('img', instance.event.link, filename)

    image.upload_to = upload_to_path

    def __str__(self):
        return f"Image for {self.event.name}"


class Event(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField()
    link = models.CharField(max_length=100)
    date = models.DateTimeField()
    location = models.CharField(max_length=500)
    city = models.CharField(max_length=50)
    capacity = models.IntegerField()
    isPrivate = models.BooleanField(default=False)
    pkey = models.CharField(max_length=32, blank=True)
    hasFee = models.BooleanField(default=True)
    entry_fee = models.IntegerField(null=True, blank=True)
    host = models.CharField(max_length=500)
    # thumb = models.ImageField(upload_to='thumbnail/', null=True, blank=True)
    thumb = models.ImageField(upload_to=event_thumbnail_path, null=True, blank=True)
    isCompleted = models.BooleanField(default=False)
    # images = models.ManyToManyField(EventImage, blank=True)

    def clean(self):
        if self.isPrivate and not self.pkey:
            raise ValidationError({'pkey': 'pkey is required when isPrivate is selected'})

        if self.hasFee and self.entry_fee is None:
            raise ValidationError({'entry_fee': 'entry_fee is required when hasFee is selected'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Event, self).save(*args, **kwargs)

    
    def __str__(self):
        return self.name

@receiver(post_save, sender=Event)
def create_event_folder(sender, instance, created, **kwargs):
    if created:
        folder_path = os.path.join('static', 'images', 'img', instance.link)
        os.makedirs(folder_path, exist_ok=True)

@receiver(post_save, sender=Event)
def update_is_completed(sender, instance, **kwargs):
    if instance.date <= timezone.now():
        instance.isCompleted = True
        instance.save(update_fields=['isCompleted'])


