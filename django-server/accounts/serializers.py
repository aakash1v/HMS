from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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
                  "dob", "year", "mobile", "created_at", "mongoID"]

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
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")

    class Meta:
        model = Student
        fields = ["prn", "first_name", "last_name"]


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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (optional)
        token['username'] = user.username
        token['email'] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra response data
        if self.user.is_student:
            data['user'] = {
                "mongoID": self.user.student.mongoID,
                "username": self.user.username,
                "email": self.user.email
            }
        elif self.user.is_warden:
            data['user'] = {
                "username": self.user.username,
                "email": self.user.email,
                "role": "warden"
            }
        else:
            data['user'] = {
                "username": self.user.username,
                "email": self.user.email,
                "role": "other"
            }

        return data
