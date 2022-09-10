from django.urls import path
from knox.views import LogoutView, LogoutAllView
from accounts import views


urlpatterns = [
	path('login/', views.LoginView.as_view(), name='login'),
	path('logout/', LogoutView.as_view(), name='logout'),
	path('logout-all/', LogoutAllView.as_view(), name='logout-all'),
	path('get-user/', views.GetUserView.as_view(), name='get-user'),
	path('forgot-password/', views.PasswordResetView.as_view()),
	path('reset-password/', views.PasswordChangeView.as_view()),
]
