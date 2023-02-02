from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from .serializers import ContactSerializer
from .permissions import IsClientContact
from .models import Contact


class ContactView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    serializer_class = ContactSerializer

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    def get_queryset(self):
        return Contact.objects.filter(client=self.request.user)


class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsClientContact]

    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
