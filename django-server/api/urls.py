from django.urls import path, include

urlpatterns = [

    path('', include("hostel.urls")),
    path('', include('accounts.urls')),
]
