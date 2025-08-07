from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.get_all_students, name='student-list'),
    path('students/register/', views.register_student, name='student-register'),
    path('wardens/', views.get_all_wardens, name='warden-list'),
]
