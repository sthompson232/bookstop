from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from reversion.admin import VersionAdmin

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User


class CustomUserAdmin(UserAdmin):
  add_form = CustomUserCreationForm
  form = CustomUserChangeForm
  model = User
  list_display = ('email', 'is_staff', 'is_superuser', 'is_active',)
  list_filter = ('email', 'is_staff', 'is_superuser', 'is_active',)
  fieldsets = (
    (None, {'fields': ('email', 'first_name', 'last_name' ,'password')}),
    ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
  )
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': ('email', 'password1', 'password2', 'is_staff', 'is_superuser', 'is_active')}
    ),
  )
  search_fields = ('email',)
  ordering = ('email',)

@admin.register(User)
class UserAdmin(CustomUserAdmin, VersionAdmin):
  pass
