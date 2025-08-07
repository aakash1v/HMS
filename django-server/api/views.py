
from django.http import JsonResponse


def root(req):
    return JsonResponse({"msg": "Welcome to django backend service ...!"})
