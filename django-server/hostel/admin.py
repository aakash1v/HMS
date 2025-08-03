from django.contrib import admin

from hostel.models import Hostel, Room

# Register your models here.
admin.site.register([Hostel, Room])
