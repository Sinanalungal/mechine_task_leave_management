from rest_framework import viewsets, permissions, serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LeaveApplication, LeaveType
from .serializers import (
    LeaveApplicationWriteSerializer,
    LeaveApplicationReadSerializer,
    LeaveTypeSerializer,
)
from user_auth.permissions import IsManagerOrReadOnly
from django.core.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.views import APIView


class LeaveTypeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing leave types (manager-only)
    """
    queryset = LeaveType.objects.all()
    serializer_class = LeaveTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None


class LeaveApplicationViewSet(viewsets.ModelViewSet):
    """
    Enhanced ViewSet for leave applications with comprehensive validation
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['status'] 
    ordering_fields = ['created_at'] 

    def get_serializer_class(self):
        """
        Return different serializer classes for different actions
        """
        if self.action in ['create', 'update', 'partial_update']:
            # Use a serializer with depth 0 for write operations
            return LeaveApplicationWriteSerializer
        return LeaveApplicationReadSerializer

    def get_queryset(self):
        """
        Employees see only their leaves, managers see team leaves
        """
        user = self.request.user
        status = self.request.query_params.get('status', None)

        # If 'all' is selected, don't filter by status (or set status to None)
        if status == 'all':
            status = None

        # If the user is a manager, get their team's leave applications
        if user.role == 'manager':
            queryset = LeaveApplication.objects.filter(employee__manager=user)
        else:
            queryset = LeaveApplication.objects.filter(employee=user)

        # Filter by status only if it's a valid status (not None)
        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):
        """
        Automatically set the employee to the current user and validate
        """
        try:
            leave_application = serializer.save(employee=self.request.user)
            leave_application.clean()
            leave_application.save()
        except ValidationError as e:
            raise serializers.ValidationError(e.message_dict)

    @action(detail=False, methods=['GET'], permission_classes=[permissions.IsAuthenticated])
    def status_counts(self, request):
        """
        Custom action to get the count of leave applications by status (approved, rejected, pending)
        """
        user = request.user

        # Initialize counts
        counts = {
            'approved': 0,
            'rejected': 0,
            'pending': 0,
        }

        # Filter for the current user or their team (if manager)
        if user.role == 'manager':
            queryset = LeaveApplication.objects.filter(employee__manager=user)
        else:
            queryset = LeaveApplication.objects.filter(employee=user)

        # Get counts for each status
        counts['total'] = queryset.count()
        counts['approved'] = queryset.filter(status='approved').count()
        counts['rejected'] = queryset.filter(status='rejected').count()
        counts['pending'] = queryset.filter(status='pending').count()

        return Response(counts, status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'], permission_classes=[IsManagerOrReadOnly])
    def approve(self, request):
        """
        Custom action to approve a leave application with 'pk' from request data
        """
        pk = request.data.get('pk')  # Extract 'pk' from request data
        if not pk:
            return Response(
                {'error': 'PK is required in the request body'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            leave_app = LeaveApplication.objects.get(pk=pk)
        except LeaveApplication.DoesNotExist:
            return Response(
                {'error': 'Leave application not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Additional checks before approval
        if leave_app.status != 'pending':
            return Response(
                {'error': 'Leave application can only be approved if it is in pending status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            leave_app.status = 'approved'
            leave_app.approver = request.user
            leave_app.full_clean()  # Validate before saving
            leave_app.save()

            return Response({'status': 'Leave application approved'})

        except ValidationError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['POST'], permission_classes=[IsManagerOrReadOnly])
    def reject(self, request, pk=None):
        """
        Custom action to reject a leave application
        """
        leave_app = self.get_object()

        if leave_app.status != 'pending':
            return Response(
                {'error': 'Leave application can only be rejected if it is in pending status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        leave_app.status = 'rejected'
        leave_app.approver = request.user
        leave_app.save()

        return Response({'status': 'Leave application rejected'})


class LeaveStatusCountView(APIView):
    """
    Custom action to get the count of leave applications by status (approved, rejected, pending)
    """

    def get(self, request, *args, **kwargs):
        user = request.user

        # Initialize counts
        counts = {
            'approved': 0,
            'rejected': 0,
            'pending': 0,
        }

        # Filter for the current user or their team (if manager)
        if user.role == 'manager':
            queryset = LeaveApplication.objects.filter(employee__manager=user)
        else:
            queryset = LeaveApplication.objects.filter(employee=user)

        # Get counts for each status
        counts['total'] = queryset.count()
        counts['approved'] = queryset.filter(status='approved').count()
        counts['rejected'] = queryset.filter(status='rejected').count()
        counts['pending'] = queryset.filter(status='pending').count()

        return Response(counts, status=status.HTTP_200_OK)
