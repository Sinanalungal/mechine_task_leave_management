from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow the owner of an object to update it.
    """
    def has_object_permission(self, request, view, obj):
        # Only allow update if the object belongs to the current user
        return obj == request.user

class IsManagerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow managers to modify users
    """
    def has_permission(self, request, view):
        # Allow all users to read
        if request.method in permissions.SAFE_METHODS:
            return True
        # Only managers can create/modify users
        return request.user.is_authenticated and request.user.role == 'manager'
