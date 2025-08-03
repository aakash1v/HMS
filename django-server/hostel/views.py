# from django.shortcuts import render
from rest_framework import generics
from hostel.models import Hostel
from hostel.serializers import HostelSerializer


class HostelListAPIView(generics.ListAPIView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer
