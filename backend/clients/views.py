from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics

from .serializers import ClientSerializer
from .permissions import IsAccountOwner, IsAuthenticatedOrCreateOnly
from .models import Client
from contacts.models import Contact


class ClientView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrCreateOnly]

    serializer_class = ClientSerializer

    def perform_create(self, serializer):
        contacts = Contact.objects.filter(client=self.request.user)
        serializer.contacts = contacts
        serializer.save()

    def get_queryset(self):
        return Client.objects.filter(id=self.request.user.id)


class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAccountOwner]

    serializer_class = ClientSerializer
    queryset = Client.objects.all()
