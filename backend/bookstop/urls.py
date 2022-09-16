from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from blog import views


API_ENDPOINT_PREFIX = 'api/'

router = DefaultRouter()
router.register(f'{API_ENDPOINT_PREFIX}blog', views.BlogViewSet, basename='blog')

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{API_ENDPOINT_PREFIX}auth/', include('knox.urls')),
    path(f'{API_ENDPOINT_PREFIX}accounts/', include('accounts.urls')),
]
urlpatterns += router.urls
