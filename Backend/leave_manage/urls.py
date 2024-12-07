from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeaveTypeViewSet, 
    LeaveApplicationViewSet, 
    LeaveStatusCountView
)

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'leave-types', LeaveTypeViewSet, basename='leave-type')
router.register(r'leave-applications', LeaveApplicationViewSet, basename='leave-application')

urlpatterns = [
    # Include router URLs
    path('', include(router.urls)),
    path('leave-balance/status_counts/', LeaveStatusCountView.as_view(),name='leave-status-count'),
]