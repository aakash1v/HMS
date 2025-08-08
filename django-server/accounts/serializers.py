from rest_framework import serializers
from .models import CustomUser, Student, Warden, Attendance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "first_name", "last_name",
                  "email", "password", "is_student", "is_warden"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ["id", "user", "prn", "branch",
                  "dob", "year", "mobile", "created_at"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_data["is_student"] = True
        user = UserSerializer().create(user_data)
        student = Student.objects.create(user=user, **validated_data)
        return student


class WardenSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Warden
        fields = ["id", "user", "mobile", "department", "hostel"]

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user_data["is_warden"] = True
        user = UserSerializer().create(user_data)
        warden = Warden.objects.create(user=user, **validated_data)
        return warden


class StudentMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["prn"]


class AttendanceSerializer(serializers.ModelSerializer):
    student = StudentMiniSerializer()

    class Meta:
        model = Attendance
        fields = ["id", "student", "date", "present", "created_at"]

# Serializer for creating attendance without full nested data


class AttendanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["student", "date", "present"]
