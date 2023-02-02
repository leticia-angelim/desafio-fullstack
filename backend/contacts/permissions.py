from rest_framework import permissions
from .models import Contact


class IsClientContact(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: Contact) -> bool:
        return obj.client == request.user
