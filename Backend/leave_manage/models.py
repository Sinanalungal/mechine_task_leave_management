from django.db import models
from django.core.exceptions import ValidationError
from user_auth.models import CustomUser

class LeaveType(models.Model):
    """
    Predefined leave types for the organization
    """
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class LeaveApplication(models.Model):
    """
    Enhanced Leave application model to track leave requests with comprehensive validation
    """
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled')
    )

    employee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='leave_applications')
    leave_type = models.ForeignKey(LeaveType, on_delete=models.PROTECT)
    start_date = models.DateField()
    end_date = models.DateField()
    duration = models.DecimalField(max_digits=4, decimal_places=1)  # in days
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    approver = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, 
                                 null=True, blank=True, 
                                 related_name='approved_leaves')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        """
        Comprehensive validation for leave application
        """
        # Ensure end date is after start date
        if self.end_date < self.start_date:
            raise ValidationError("End date must be after start date")
        
        # Calculate duration
        self.duration = (self.end_date - self.start_date).days + 1

        # Check for overlapping leave applications
        self.validate_leave_overlap()

        # Validate leave type eligibility
        # self.validate_leave_type_eligibility()

    def validate_leave_overlap(self):
        """
        Check for existing leave applications that overlap with current request
        """
        # Check for existing leave applications with overlapping dates
        overlapping_leaves = LeaveApplication.objects.filter(
            employee=self.employee,
            status__in=['pending', 'approved'],
            start_date__lte=self.end_date,
            end_date__gte=self.start_date
        ).exclude(pk=self.pk)  # Exclude current leave application when editing

        if overlapping_leaves.exists():
            raise ValidationError({
                'start_date': 'You have already applied for leave during this period.',
                'end_date': 'You have already applied for leave during this period.'
            })

    # def validate_leave_type_eligibility(self):
    #     """
    #     Validate employee's eligibility for the selected leave type
    #     """
    #     # Check if employee has sufficient leave balance
    #     employee_leave_balance = self.employee.get_leave_balance(self.leave_type)
        
    #     if self.duration > employee_leave_balance:
    #         raise ValidationError(f"Insufficient {self.leave_type.name} leave balance. "
    #                               f"Available: {employee_leave_balance} days, "
    #                               f"Requested: {self.duration} days")

    def save(self, *args, **kwargs):
        """
        Override save method to perform validation
        """
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.username} - {self.leave_type.name} - {self.start_date}"


# class LeaveBalance(models.Model):
#     """
#     Track leave balances for each employee and leave type
#     """
#     employee = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
#     balance = models.DecimalField(max_digits=5, decimal_places=1, default=0)
#     year = models.IntegerField()

#     class Meta:
#         unique_together = ('employee', 'leave_type', 'year')

#     def __str__(self):
#         return f"{self.employee.username} - {self.leave_type.name} - {self.year}"