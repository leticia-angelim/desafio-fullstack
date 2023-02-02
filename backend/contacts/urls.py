from django.urls import path
from . import views

urlpatterns = [
    path("contacts/", views.ContactView.as_view()),
    path("contacts/<str:pk>/", views.ContactDetailView.as_view()),
]
