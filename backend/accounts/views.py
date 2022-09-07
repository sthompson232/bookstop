from knox.views import LoginView as KnoxLoginView
from django.contrib.auth import login

from .serializers import CustomAuthTokenSerializer, UserSerializer

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
