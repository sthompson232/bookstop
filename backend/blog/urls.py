from django.urls import path

from blog import views


urlpatterns = [
	path('', views.TestView.as_view(), name='test'),
]
