from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        id = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
        password = serializers.CharField(allow_blank=True, max_length=100, required=False)

        fields = ('id', 'username','password', 'email', 'first_name', 'last_name')
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
    



class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = ('id', 'title', 'description', 'user_id', 'color')