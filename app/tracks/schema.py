import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q
import users.schema

from .models import Track, Like


class TrackType(DjangoObjectType):
    class Meta:
        model = Track


class LikeType(DjangoObjectType):
    class Meta:
        model = Like


class UpdateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)  # This is the return type to the user

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id, title=None, description=None, url=None):

        user = info.context.user

        track = Track.objects.get(id=track_id)

        if user != track.posted_by:
            raise GraphQLError(
                f'Track can only be modified by {track.posted_by}')

        track.title = title
        track.description = description
        track.url = url

        track.save()
        return UpdateTrack(track=track)


class CreateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, title, description, url):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('User not authenticated')
        track = Track(title=title, description=description,
                      url=url, posted_by=user)
        track.save()  # saves to the DB
        return CreateTrack(track=track)


class DeleteTrack(graphene.Mutation):
    track_id = graphene.Int()

    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id):

        track = Track.objects.get(id=track_id)

        user = info.context.user
        if user != track.posted_by:
            raise GraphQLError(
                f'Track can only be deleted by {track.posted_by}')

        track.delete()

        return DeleteTrack(track_id=track_id)


class CreateLike(graphene.Mutation):
    track = graphene.Field(TrackType)
    user = graphene.Field(users.schema.UserType)

    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Login to like a track')

        track = Track.objects.get(id=track_id)

        like = Like(user=user, track=track)
        like.save()

        return CreateLike(track=track, user=user)


class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()
    update_track = UpdateTrack.Field()
    delete_track = DeleteTrack.Field()
    create_like = CreateLike.Field()


class Query(graphene.ObjectType):
    tracks = graphene.List(
        TrackType, track_id=graphene.Int(), search=graphene.String())
    likes = graphene.List(LikeType)

    def resolve_tracks(self, info, track_id=None, search=None):
        if track_id:
            return [Track.objects.get(id=track_id)]
        if search:
            filter = (
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(url__icontains=search) |
                Q(posted_by__username=search)

            )
            return Track.objects.filter(filter)

        return Track.objects.all()

    def resolve_likes(self, info):
        return Like.objects.all()
