# from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.


def root(req):
    return JsonResponse({"welcome": "Hello welcome"})
