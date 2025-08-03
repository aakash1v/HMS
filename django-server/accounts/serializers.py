
from rest_framework import serializers
from .models import CustomUser, Student
from hostel.serializers import HostelSerializer, RoomSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email',
                  'is_student', 'first_name', 'last_name']


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    hostel = HostelSerializer()
    room = RoomSerializer()

    class Meta:
        model = Student
        fields = ['prn',  'branch', 'dob', 'mobile', 'user', 'hostel', 'room']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = CustomUser.objects.create_user(**user_data)
        user.is_student = True
        user.save()
        student = Student.objects.create(user=user, **validated_data)
        return student


class WardenSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    hostel = HostelSerializer()

    class Meta:
        model = Student
        fields = ['department', 'mobile', 'user', 'hostel']

