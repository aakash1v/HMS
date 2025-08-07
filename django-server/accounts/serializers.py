from rest_framework import serializers
from .models import CustomUser, Student, Warden


# Base User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_student', 'first_name', 'last_name']


# Writable Nested User Serializer for Creation
class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'username']

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)


# Student Serializer (with nested user, hostel, room)
class StudentSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()

    class Meta:
        model = Student
        fields = ['prn', 'branch', 'dob', 'mobile', 'user', 'year']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data)
        user.is_student = True
        user.save()

        student = Student.objects.create(user=user, **validated_data)
        return student

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data


# Warden Serializer (uses correct model and nested user + hostel)
class WardenSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()

    class Meta:
        model = Warden
        fields = ['department', 'mobile', 'user', 'hostel']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data)
        user.is_warden = True
        user.save()

        warden = Warden.objects.create(user=user, **validated_data)
        return warden

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data

