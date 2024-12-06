from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user management with profile picture handling.
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'created_time', 'email', 'first_name', 'password', 'last_name', 'role', 'phone_number', 'department', 'manager', 'profile_picture']
        extra_kwargs = {
            'password': {'write_only': True},
            'manager': {'required': False},
            'created_time': {'read_only': True},
            'profile_picture': {'required': False, 'allow_null': True},
        }

    def create(self, validated_data):
        """
        Create a new user with profile picture if provided and manager assigned.
        """
        profile_picture = validated_data.pop('profile_picture', None)
        user = CustomUser.objects.create_user(**validated_data)
        
        if profile_picture:
            user.profile_picture = profile_picture
        
        # Assign the manager if needed
        user.manager = self.context['request'].user
        user.save()
        
        return user

    def update(self, instance, validated_data):
        """
        Update an existing user and handle profile picture update.
        """
        print(validated_data)
        profile_picture = validated_data.pop('profile_picture', None)
        
        # Update the user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Update the profile picture if provided
        if profile_picture is not None:
            instance.profile_picture = profile_picture
        
        instance.save()
        return instance
