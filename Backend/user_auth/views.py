from rest_framework import viewsets
from .models import CustomUser
from .serializers import UserSerializer
from .permissions import IsManagerOrReadOnly,IsOwnerOrReadOnly

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer to include user details
    """
    def validate(self, attrs):
        # Default token generation
        data = super().validate(attrs)
        
        # Add user details to the response
        refresh = self.get_token(self.user)
        # data['user_id'] = self.user.id
        # data['username'] = self.user.username
        data['email'] = self.user.email
        data['role'] = self.user.role
        
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom token obtain view to return additional user information
    """
    serializer_class = CustomTokenObtainPairSerializer

class LogoutView(APIView):
    """
    Logout view to blacklist refresh token
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            # Blacklist the token
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        



class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for user management (only accessible by managers).
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated,IsOwnerOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        """
        Managers see all users, employees see only themselves.
        """
        user = self.request.user
        print(user)
        return CustomUser.objects.filter(pk=user.pk) 
    # if user.role == 'employee' else CustomUser.objects.all()

    def perform_create(self, serializer):
        """
        Create a user and assign the manager if needed.
        """
        serializer.save()

