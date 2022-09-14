from knox.views import LoginView as KnoxLoginView
from django.core.exceptions import ValidationError
from django.conf import settings
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import login
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator

from emails.tasks import send_email
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
			return Response({}, status=status.HTTP_403_FORBIDDEN)


class ForgotPasswordView(views.APIView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request):
		if 'email' in request.data:
			user_email = request.data['email']
			user = User.objects.get(email=user_email)
			uid = urlsafe_base64_encode(force_bytes(user.pk))
			token = default_token_generator.make_token(user)
			reset_url = f'http://localhost:3000/auth/reset-password/{uid}/{token}'
			context = {
				"reset_url": reset_url,
			}
			send_email.delay(
				'emails/password_reset_subject.txt',
				'emails/password_reset_email.html',
				context,
				None,
				user_email,
			)
			return Response({}, status=status.HTTP_200_OK)
		return Response({}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(views.APIView):
	permission_classes = (permissions.AllowAny,)

	def post(self, request):
		data = request.data
		if 'password1' in data and 'password2' in data and 'uid' in data and 'token' in data:
			password1 = request.data['password1']
			password2 = request.data['password2']
			uid = request.data['uid']
			token = request.data['token']
			if password1 == password2:
				try:
					user = User.objects.get(pk=urlsafe_base64_decode(uid).decode())
				except (TypeError, ValueError, OverflowError, User.DoesNotExist, ValidationError):
					return Response({}, status=status.HTTP_403_FORBIDDEN)
				valid_token = default_token_generator.check_token(user, token)
				if valid_token:
					try:
						validate_password(password1, user)
					except ValidationError as errors:
						return Response({ 'errors': errors }, status=status.HTTP_400_BAD_REQUEST)
					user.set_password(password1)
					user.save()
					return Response({}, status=status.HTTP_200_OK)
				else:
					return Response({}, status=status.HTTP_403_FORBIDDEN)
			else:
				return Response({}, status=status.HTTP_400_BAD_REQUEST)
		else:
			return Response({}, status=status.HTTP_400_BAD_REQUEST)


class GetTinyAPIKey(views.APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		return Response({ 'key': settings.TINY_API_KEY }, status=status.HTTP_200_OK)
