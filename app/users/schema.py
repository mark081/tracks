from django.contrib.auth import get_user_model
from graphql import GraphQLError

import graphene
from graphene_django import DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        # restricts the user fields we import
        # only_fields = ('id', 'username', 'email', 'password')


class Query(graphene.ObjectType):
    user = graphene.Field(UserType, email=graphene.String())
    me = graphene.Field(UserType)

    def resolve_user(self, info, email):
        tmp = get_user_model()
        return tmp.objects.get(email=email)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Not logged in!')
        return user


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username, email=email)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
