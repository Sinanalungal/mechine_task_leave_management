from django.contrib import admin
from .models import LeaveApplication,LeaveType
# ,LeaveBalance,

admin.site.register(LeaveApplication)
# admin.site.register(LeaveBalance)
admin.site.register(LeaveType)

