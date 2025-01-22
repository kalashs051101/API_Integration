from django.contrib import admin

# Register your models here.
from django_backend.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from django_backend.models import *
class UserModelAdmin(BaseUserAdmin):

    list_display = ["id" ,"email", "name","tc", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        ("User Credentials", {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name","tc"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]

    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name","tc", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email","id"]
    filter_horizontal = []


admin.site.register(User, UserModelAdmin)

