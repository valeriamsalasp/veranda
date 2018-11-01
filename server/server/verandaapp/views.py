from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .models import Note
from server.verandaapp.serializers import UserSerializer, NoteSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class NoteViewSet(viewsets.ModelViewSet):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    pagination_class: None
    def get_paginated_response(self, data):
        return Response(data)
