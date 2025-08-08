from django.contrib import admin
from .models import Attendance, Student, CustomUser, Warden

# Register your models here.
admin.site.register([Student, CustomUser, Warden, Attendance])
