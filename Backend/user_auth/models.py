from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError

class CustomUser(AbstractUser):
    """
    Custom user model with additional fields for leave management and profile picture.
    """
    ROLE_CHOICES = (
        ('employee', 'Employee'),
        ('manager', 'Manager'),
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
    first_name = models.CharField(max_length=100, blank=False, null=False)  
    last_name = models.CharField(max_length=100, blank=False, null=False)   
    department = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True, unique=True)
    created_time = models.DateTimeField(auto_now_add=True)
    manager = models.ForeignKey('self', on_delete=models.SET_NULL, 
                                null=True, blank=True, 
                                limit_choices_to={'role': 'manager'},
                                related_name='team_members')
    email = models.EmailField(max_length=100,unique=True,null=False,blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    # def get_leave_balance(self, leave_type):
    #     """
    #     Retrieve the current leave balance for a specific leave type
        
    #     :param leave_type: LeaveType instance
    #     :return: Current leave balance or 0 if no balance exists
    #     """
    #     from leave_manage.models import LeaveBalance 
        
    #     # Get the current year
    #     current_year = timezone.now().year
        
    #     # Try to get the leave balance for the current year
    #     try:
    #         leave_balance = LeaveBalance.objects.get(
    #             employee=self,
    #             leave_type=leave_type,
    #             year=current_year
    #         )
    #         return leave_balance.balance
    #     except LeaveBalance.DoesNotExist:
    #         # If no balance exists, return 0
    #         return 0

    # def deduct_leave_balance(self, leave_type, days):
    #     """
    #     Deduct leave balance for a specific leave type
        
    #     :param leave_type: LeaveType instance
    #     :param days: Number of days to deduct
    #     """
    #     from leave_manage.models import LeaveBalance  # Import here to avoid circular import
        
    #     # Get the current year
    #     current_year = timezone.now().year
        
    #     try:
    #         # Get or create leave balance for the current year
    #         leave_balance, created = LeaveBalance.objects.get_or_create(
    #             employee=self,
    #             leave_type=leave_type,
    #             year=current_year,
    #             defaults={'balance': 0}  # Default balance if creating new
    #         )
            
    #         # Check if sufficient balance exists
    #         if leave_balance.balance < days:
    #             raise ValidationError(f"Insufficient {leave_type.name} leave balance. "
    #                                   f"Available: {leave_balance.balance} days, "
    #                                   f"Requested: {days} days")
            
    #         # Deduct leave balance
    #         leave_balance.balance -= days
    #         leave_balance.save()
        
    #     except Exception as e:
    #         # Log the error or handle it as needed
    #         raise ValidationError(f"Error deducting leave balance: {str(e)}")

    # def add_leave_balance(self, leave_type, days):
    #     """
    #     Add leave balance for a specific leave type (useful for admin adjustments)
        
    #     :param leave_type: LeaveType instance
    #     :param days: Number of days to add
    #     """
    #     from leave_manage.models import LeaveBalance  # Import here to avoid circular import
        
    #     # Get the current year
    #     current_year = timezone.now().year
        
    #     # Get or create leave balance for the current year
    #     leave_balance, created = LeaveBalance.objects.get_or_create(
    #         employee=self,
    #         leave_type=leave_type,
    #         year=current_year,
    #         defaults={'balance': 0}  
    #     )
        
    #     # Add leave balance
    #     leave_balance.balance += days
    #     leave_balance.save()