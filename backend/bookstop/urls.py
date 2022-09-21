from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from blog.views import BlogViewSet
from mediamanager.views import ImageViewSet


API_ENDPOINT_PREFIX = 'api/'

router = DefaultRouter()
router.register(f'{API_ENDPOINT_PREFIX}blog', BlogViewSet, basename='blog')
router.register(f'{API_ENDPOINT_PREFIX}images', ImageViewSet, basename='media-manager')

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{API_ENDPOINT_PREFIX}auth/', include('knox.urls')),
    path(f'{API_ENDPOINT_PREFIX}accounts/', include('accounts.urls')),
		path(f'{API_ENDPOINT_PREFIX}media-manager/', include('mediamanager.urls')),
]
urlpatterns += router.urls
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)