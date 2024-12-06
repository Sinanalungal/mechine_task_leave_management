from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
from .views import (
    CustomTokenObtainPairView,
    LogoutView
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('logout/', LogoutView.as_view(), name='logout'),

]