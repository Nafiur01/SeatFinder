# Generated by Django 4.2.4 on 2023-08-20 23:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sfbk', '0011_alter_event_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventAttendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('registered', 'Registered'), ('interested', 'Interested')], max_length=20)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sfbk.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
