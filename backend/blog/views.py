from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from .constants import BLOG_PUBLISHED
from .models import BlogPost
from .serializers import BlogPostSerializer, BlogPostPortalSerializer


class PortalBlogViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = BlogPostPortalSerializer
	http_method_names = ['get', 'post', 'put']


class BlogViewSet(viewsets.ModelViewSet):
	permission_classes = (AllowAny,)
	serializer_class = BlogPostSerializer
	http_method_names = ['get']
	queryset = BlogPost.objects.filter(status=BLOG_PUBLISHED)

	def get(request, *args, **kwargs):
		return Response('response given')
