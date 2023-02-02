from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from . import views

urlpatterns = [
    path("clients/", views.ClientView.as_view()),
    path("clients/<str:pk>/", views.ClientDetailView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
]
