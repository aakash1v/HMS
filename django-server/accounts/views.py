from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student, Warden
from .serializers import StudentSerializer, WardenSerializer


@api_view(['GET'])
def student_list(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def student_register(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def warden_list(request):
    wardens = Warden.objects.all()
    serializer = WardenSerializer(wardens, many=True)
    return Response(serializer.data)
