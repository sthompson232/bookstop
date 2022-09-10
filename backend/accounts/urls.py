from django.urls import path
from knox.views import LogoutView, LogoutAllView
from accounts import views


urlpatterns = [
	path('login/', views.LoginView.as_view(), name='login'),
	path('logout/', LogoutView.as_view(), name='logout'),
	path('logout-all/', LogoutAllView.as_view(), name='logout-all'),
	path('get-user/', views.GetUserView.as_view(), name='get-user'),
	path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password'),
	path('reset-password/', views.ResetPasswordView.as_view(), name='reset-password'),
]
