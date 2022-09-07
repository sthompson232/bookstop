from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

from .managers import CustomAccountManager


class User(AbstractUser):
	email = models.EmailField(_('email address'), unique=True)
	first_name = models.CharField(max_length=200)
	last_name = models.CharField(max_length=200)
	username = None
	is_staff = models.BooleanField(default=True)
	is_active = models.BooleanField(default=True)

	objects = CustomAccountManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []

	def __str__(self):
		return self.email
