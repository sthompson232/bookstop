from datetime import datetime, date

from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .constants import BLOG_DRAFT, BLOG_PENDING, BLOG_PUBLISHED
from .models import BlogPost
from .serializers import BlogPostSerializer, BlogPostPortalSerializer


class PortalBlogViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = BlogPostPortalSerializer
	http_method_names = ['get', 'post', 'put']

	def create(self, request):
		publish_date = datetime.strptime(request.data['publish_date'], '%Y-%m-%d').date()
		if request.data['save_type'] == 'draft':
			post_status = BLOG_DRAFT
		elif publish_date > date.today():
			post_status = BLOG_PENDING
		else:
			post_status = BLOG_PUBLISHED

		BlogPost.objects.create({
			'title': request.data['title'],
			'content': request.data['content'],
			'user': request.user,
			'publish_date': publish_date,
			'status': post_status,
		})
		return Response(status=status.HTTP_201_CREATED)


class BlogViewSet(viewsets.ModelViewSet):
	permission_classes = (AllowAny,)
	serializer_class = BlogPostSerializer
	http_method_names = ['get']
	queryset = BlogPost.objects.filter(status=BLOG_PUBLISHED)

	def retrieve(request, *args, **kwargs):
		return Response('response given')
