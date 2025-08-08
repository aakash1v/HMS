from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from .models import CustomUser, Student, Warden, Attendance
from .serializers import StudentSerializer, UserSerializer, WardenSerializer, AttendanceSerializer, AttendanceCreateSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [AllowAny]


class WardenViewSet(viewsets.ModelViewSet):
    queryset = Warden.objects.all()
    serializer_class = WardenSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
def all_user(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return AttendanceCreateSerializer
        return AttendanceSerializer


def welcome_view(request):
    return HttpResponse("Welcome to django Server .. ")
