from django.db import models
from django.contrib.auth import get_user_model

# This is the Django ORM
# class = table = [directory name]_classname(tolower))
#fields = fields
#
# Note: when creating a foreign key, related_name allows foreign table to access by this name
#


class Track(models.Model):
    # id created automatically
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    # adding the current user as a foreign key, will delete all records if the user is deleted
    posted_by = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE)


class Like(models.Model):
    user = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE)
    track = models.ForeignKey(
        'tracks.Track', related_name='likes', on_delete=models.CASCADE) #Note tracks.Track maps to tracks_track in the DB
