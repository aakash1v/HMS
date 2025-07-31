
from rest_framework import serializers
from .models import CustomUser, Student


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'is_student']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['user', 'prn', 'hostel', 'room', 'branch', 'dob', 'mobile']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data)
        user.is_student = True
        user.save()
        student = Student.objects.create(user=user, **validated_data)
        return student
