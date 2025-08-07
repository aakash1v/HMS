from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Student, Warden
from .serializers import StudentSerializer, WardenSerializer


@api_view(['GET'])
def get_all_students(request):
    """
    List all registered students.
    """
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register_student(request):
    """
    Register a new student.
    """
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_wardens(request):
    """
    List all wardens.
    """
    wardens = Warden.objects.all()
    serializer = WardenSerializer(wardens, many=True)
    return Response(serializer.data)

