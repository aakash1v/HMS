from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings  # You missed this import

# 1. Custom User Model
class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_warden = models.BooleanField(default=False)
    # You can add more roles later like is_admin, is_supervisor etc.


# 2. Student Profile
class Student(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    prn = models.CharField(max_length=20, unique=True)
    branch = models.CharField(max_length=100)
    dob = models.DateField()
    year = models.PositiveSmallIntegerField()
    mobile = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.prn})"


# 3. Warden Profile
class Warden(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=150)
    hostel = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.department}"


# 4. Daily Attendance Model (Core logic for attendance tracking)
class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    present = models.BooleanField(default=False)
    marked_by = models.ForeignKey(Warden, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "date")  # One entry per student per day

    def __str__(self):
        status = "Present" if self.present else "Absent"
        return f"{self.student.user.get_full_name()} - {self.date}: {status}"

