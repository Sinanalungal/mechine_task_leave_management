from rest_framework import serializers
from .models import LeaveApplication, LeaveType
# , LeaveBalance
from user_auth.serializers import UserSerializer
from django.core.exceptions import ValidationError
from user_auth.models import CustomUser


class LeaveTypeSerializer(serializers.ModelSerializer):
    """
    Serializer for leave types
    """
    class Meta:
        model = LeaveType
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Replace with your Employee model name
        fields = ['id', 'profile_picture', 'first_name','last_name', 'department']  # Adjust fields as needed


class LeaveApplicationSerializer(serializers.ModelSerializer):
    """
    Enhanced Serializer for leave applications with comprehensive validation
    """
    employee = EmployeeSerializer(read_only=True, default=serializers.CurrentUserDefault())
    approver = UserSerializer(read_only=True)

    class Meta:
        model = LeaveApplication
        fields = '__all__'
        read_only_fields = ['status', 'approver', 'duration', 'created_at', 'updated_at']
        depth = 2

    def validate(self, data):
        """
        Comprehensive validation for leave application
        """
        print(data)
        required_fields = ['leave_type', 'start_date', 'end_date']
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError(f"{field} is required")

        try:
            leave_application = LeaveApplication(
                employee=self.context['request'].user,
                **data
            )
            leave_application.clean()  # This will run all validations
        except ValidationError as e:
            raise serializers.ValidationError(str(e))

        data['duration'] = (data['end_date'] - data['start_date']).days + 1
        return data

# class LeaveBalanceSerializer(serializers.ModelSerializer):
#     """
#     Serializer for leave balances
#     """
#     employee = UserSerializer(read_only=True)

#     class Meta:
#         model = LeaveBalance
#         fields = '__all__'


class EmployeeSerializerForLeaveApprove(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Replace with your Employee model name
        fields = ['id']  # Adjust fields as needed

