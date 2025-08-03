
from django.urls import path
from .views import student_list, student_register, warden_list

urlpatterns = [
    path('students/', student_list, name='student-list'),
    path('students/register/', student_register, name='student-register'),
    path('wardens/', warden_list, name='warden-list'),
]
