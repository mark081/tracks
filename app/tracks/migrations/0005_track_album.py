# Generated by Django 3.0.6 on 2020-05-29 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0004_auto_20200529_2010'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='album',
            field=models.TextField(blank=True),
        ),
    ]
