# Generated by Django 5.1.3 on 2024-12-02 07:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('leave_manage', '0003_remove_leavetype_annual_allocation'),
    ]

    operations = [
        migrations.DeleteModel(
            name='LeaveBalance',
        ),
    ]