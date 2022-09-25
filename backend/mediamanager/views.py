from django.conf import settings
from rest_framework import views, permissions, status, viewsets
from rest_framework.response import Response

from .models import Image
from .paginators import ImagePaginator
from .serializers import ImageSerializer
from .utils import process_image


class ImageViewSet(viewsets.ModelViewSet):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = ImageSerializer
  pagination_class = ImagePaginator
  queryset = Image.objects.all().order_by('-uploaded_on')

  def list(self, request):
    images = self.get_queryset()
    page = self.paginate_queryset(images)
    if page is not None:
      serializer = self.get_serializer(page, many=True)
      return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(images, many=True)
    return self.get_paginated_response(serializer.data)


class UploadTinyMCEImage(views.APIView):
  permission_classes = (permissions.IsAuthenticated,)

  def post(self, request):
    if 'file' not in request.data:
      return Response(status=status.HTTP_400_BAD_REQUEST)
    img, width, height = process_image(request.data['file'], 1000, 1000)
    img = Image.objects.create(file=img, width=width, height=height, user=request.user)
    url = img.file.url
    if settings.DEBUG:
      url = request.build_absolute_uri(img.file.url)
    return Response({"location": url}, status=status.HTTP_200_OK)
