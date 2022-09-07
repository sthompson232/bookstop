from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, PasswordResetForm
from .models import User


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('email',)


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ('email',)


class CustomPasswordResetForm(PasswordResetForm):
    def get_users(self, email):
        users = get_user_model()._default_manager.filter(
            email__iexact=email, is_active=True)
        return (u for u in users)
