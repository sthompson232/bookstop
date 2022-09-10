from django.contrib import admin
from django.urls import path, include

API_ENDPOINT_PREFIX = 'api/'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{API_ENDPOINT_PREFIX}auth/', include('knox.urls')),
    path(f'{API_ENDPOINT_PREFIX}accounts/', include('accounts.urls')),
		path(f'{API_ENDPOINT_PREFIX}blog/', include('blog.urls')),
		path(f'{API_ENDPOINT_PREFIX}emails/', include('emails.urls')),
]
