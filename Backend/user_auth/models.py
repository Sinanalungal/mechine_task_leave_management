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

    