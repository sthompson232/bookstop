from cgitb import reset
from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login, views as auth_views
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.tokens import default_token_generator

from emails.tasks import send_mail
from .serializers import CustomAuthTokenSerializer, UserSerializer
from .models import User

from rest_framework import permissions, views, status
from rest_framework.response import Response


class LoginView(KnoxLoginView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request, format=None):
		serializer = CustomAuthTokenSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		login(request, user)
		return super(LoginView, self).post(request, format=None)


class GetUserView(views.APIView):
	permission_classes = (permissions.AllowAny,)

	def get(self, request):
		if request.user.is_authenticated:
			user = UserSerializer(request.user).data
			return Response(user, status=status.HTTP_200_OK)
		else:
			return Response(status=status.HTTP_403_FORBIDDEN)


class PasswordResetView(views.APIView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request):
		user_email = request.data['email']
		user = User.objects.get(email=user_email)
		uid = urlsafe_base64_encode(force_bytes(user.pk))
		token = default_token_generator.make_token(user)
		reset_url = f'http://localhost:3000/auth/reset-password/{uid}/{token}'
		print(reset_url)
		context = {
			"reset_url": reset_url,
			"user": user,
		}
		send_mail(
			'emails/password_reset_subject.txt',
			'emails/password_reset_email.html',
			context,
			None,
			user_email,
			None,
		)
		return Response(status=status.HTTP_202_ACCEPTED)


class PasswordChangeView(auth_views.PasswordChangeView):
	pass
