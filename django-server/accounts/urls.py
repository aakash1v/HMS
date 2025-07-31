
from django.urls import path
from .views import student_list, student_register

urlpatterns = [
    path('students/', student_list, name='student-list'),
    path('students/register/', student_register, name='student-register'),
]
