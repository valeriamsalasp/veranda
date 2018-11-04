from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .models import Note
from server.verandaapp.serializers import UserSerializer, NoteSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    
    
class NoteViewSet(viewsets.ModelViewSet):

    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    pagination_class: None

    def get_paginated_response(self, data):
        return Response(data)
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(user_id = user)
