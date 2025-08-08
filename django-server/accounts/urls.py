from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, WardenViewSet, AttendanceViewSet, all_user, welcome_view

router = DefaultRouter()
router.register("students", StudentViewSet)
router.register("wardens", WardenViewSet)
router.register("attendance", AttendanceViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/all_user", all_user),
    path("", welcome_view),
]
