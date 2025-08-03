from django.contrib.auth.models import AbstractUser
from django.db import models
from hostel.models import Hostel


class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_warden = models.BooleanField(default=False)
    # add other shared roles later (is_staff is already built-in)


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    prn = models.CharField(max_length=20, unique=True)
    branch = models.CharField(max_length=50)
    dob = models.DateField()
    mobile = models.CharField(max_length=15, blank=True)
    hostel = models.ForeignKey(Hostel, on_delete=models.SET_NULL, null=True)
    room = models.ForeignKey("hostel.Room", null=True,
                             on_delete=models.SET_NULL, related_name='students')

    def __str__(self):
        return f"{self.user.username} - {self.prn}"


class Warden(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=15, blank=True)
    department = models.CharField(max_length=150)

    hostel = models.ForeignKey(Hostel, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.department}"
