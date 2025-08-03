from django.db import models


class Hostel(models.Model):
    hostel_name = models.CharField(max_length=150)
    capacity = models.IntegerField()

    def __str__(self):
        return self.hostel_name


class Room(models.Model):
    capacity = models.IntegerField()
    name = models.CharField(max_length=200, null=True)
    floor = models.CharField(max_length=200, null=True)
    hostel = models.ForeignKey("hostel.Hostel", on_delete=models.CASCADE)

    s1 = models.ForeignKey("accounts.Student", on_delete=models.SET_NULL, null=True, related_name='room_s1')
    s2 = models.ForeignKey("accounts.Student", on_delete=models.SET_NULL, null=True, related_name='room_s2')
    s3 = models.ForeignKey("accounts.Student", on_delete=models.SET_NULL, null=True, related_name='room_s3')
    s4 = models.ForeignKey("accounts.Student", on_delete=models.SET_NULL, null=True, related_name='room_s4')
    s5 = models.ForeignKey("accounts.Student", on_delete=models.SET_NULL, null=True, related_name='room_s5')
    s6 = models.ForeignKey("accounts.Student", on_delete=models.SET_NULL, null=True, related_name='room_s6')

    def __str__(self):
        return self.name or f"Room {self.id}"
