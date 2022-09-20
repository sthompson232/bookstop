from django.conf import settings
from rest_framework import views, permissions, status
from rest_framework.response import Response

from .models import TinyMCEImage
from .utils import process_image


class UploadTinyMCEImage(views.APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		img, width, height = process_image(request.data['file'], 1000, 1000)
		img = TinyMCEImage.objects.create(file=img, width=width, height=height, user=request.user)
		url = img.file.url
		if settings.DEBUG:
			url = request.build_absolute_uri(img.file.url)
		return Response({"location": url}, status=status.HTTP_200_OK)
