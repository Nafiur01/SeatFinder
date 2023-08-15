from django.db import models

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=1000)
    description = models.TextField()
    link = models.CharField(max_length=100)
    date = models.DateTimeField()
    location = models.CharField(max_length=500)
    city = models.CharField(max_length=50)
    capacity = models.IntegerField()
    isPrivate = models.BooleanField(default=False)
    pkey = models.CharField(max_length=32)
    hasFee = models.BooleanField(default=True)
    entry_fee = models.IntegerField(null=True, blank=True)
    host = models.CharField(max_length=500)
    # thumb = models.ImageField()
    
    def __str__(self):
        return self.name
    