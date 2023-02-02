from rest_framework import permissions
from .models import Client


class IsAuthenticatedOrCreateOnly(permissions.BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated

        return True


class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj: Client) -> bool:
        return request.user.is_authenticated and obj == request.user
