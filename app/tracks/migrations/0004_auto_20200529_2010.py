# Generated by Django 3.0.6 on 2020-05-29 20:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0003_like'),
    ]

    operations = [
        migrations.RenameField(
            model_name='track',
            old_name='description',
            new_name='artist',
        ),
        migrations.RemoveField(
            model_name='track',
            name='url',
        ),
    ]
