# Generated by Django 4.2.4 on 2023-08-19 12:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sfbk', '0004_userprofile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='entry_fee',
            new_name='entryFee',
        ),
        migrations.RemoveField(
            model_name='event',
            name='isCompleted',
        ),
    ]
