from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
import os
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User,AnonymousUser 

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
    link = models.CharField(max_length=100, unique=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=500)
    city = models.CharField(max_length=50)
    capacity = models.IntegerField()
    isPrivate = models.BooleanField(default=False)
    pkey = models.CharField(max_length=32, blank=True)
    hasFee = models.BooleanField(default=True)
    entryFee = models.IntegerField(null=True, blank=True)
    host = models.CharField(max_length=500)
    tags = models.CharField(max_length=500, null=True, blank=True)
    # thumb = models.ImageField(upload_to='thumbnail/', null=True, blank=True)
    thumb = models.ImageField(upload_to=event_thumbnail_path, null=True, blank=True)
    # isCompleted = models.BooleanField(default=False)
    # images = models.ManyToManyField(EventImage, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    @property
    def isCompleted(self):
        if timezone.now() > self.date:
            return True
        return False


    def clean(self):
        if self.isPrivate and not self.pkey:
            raise ValidationError({'pkey': 'pkey is required when isPrivate is selected'})

        if self.hasFee and self.entryFee is None:
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

class EventSpeaker(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    dp = models.ImageField(upload_to='')

    def upload_to_path(instance, filename):
        return os.path.join('img', instance.event.link, 'speakers', filename)

    dp.upload_to = upload_to_path

    def __str__(self):
        return f"Speakers for {self.event.name}"

class Userprofile(models.Model):
    user = models.OneToOneField(User,primary_key=True,verbose_name='user',related_name='profile',on_delete= models.CASCADE)
    phone = models.CharField(max_length=11,null=True,blank=True)
    email = models.CharField(max_length=50,null=True,blank=True)
    avatar = models.ImageField(upload_to='avatar/')

    def __str__(self):
        return self.user.username

class EventAttendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    STATUS_CHOICES = (
        ('registered', 'Registered'),
        ('interested', 'Interested'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.event.name} - {self.status}"


    



