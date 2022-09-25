from django.urls import path
from mediamanager import views


urlpatterns = [
  path('upload-tinymce-image/', views.UploadTinyMCEImage.as_view(), name='upload-tinymce-image'),
]
