from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    # add other shared roles later (is_staff is already built-in)


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    prn = models.CharField(max_length=20, unique=True)
    hostel = models.CharField(max_length=50)
    room = models.CharField(max_length=10)
    branch = models.CharField(max_length=50)
    dob = models.DateField()
    mobile = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.username} - {self.prn}"
