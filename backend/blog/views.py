from datetime import datetime, date

from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny

from .constants import BLOG_DRAFT, BLOG_PENDING, BLOG_PUBLISHED
from .models import BlogPost
from .paginators import BlogPostPaginator
from .serializers import BlogPostSerializer


class PortalBlogViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	serializer_class = BlogPostSerializer
	http_method_names = ['get', 'post', 'put', 'delete']
	pagination_class = BlogPostPaginator
	queryset = BlogPost.objects.all()

	def list(self, request):
		posts = self.get_queryset()
		page = self.paginate_queryset(posts)
		if page is not None:
			serializer = self.get_serializer(page, many=True)
			return self.get_paginated_response(serializer.data)

		serializer = self.get_serializer(posts, many=True)
		return self.get_paginated_response(serializer.data)

	def create(self, request):
		publish_date = datetime.strptime(request.data['publish_date'], '%Y-%m-%d').date()
		if request.data['save_type'] == 'draft':
			post_status = BLOG_DRAFT
		elif publish_date > date.today():
			post_status = BLOG_PENDING
		else:
			post_status = BLOG_PUBLISHED

		data = {
			'title': request.data['title'],
			'content': request.data['content'],
			'user': request.user,
			'publish_date': publish_date,
			'status': post_status,
		}
		BlogPost.objects.create(**data)
		return Response(status=status.HTTP_201_CREATED)

	def retrieve(self, request, pk=None):
		post = get_object_or_404(BlogPost, pk=pk)
		serializer = BlogPostSerializer(post)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def update(self, request, pk=None):
		publish_date = datetime.strptime(request.data['publish_date'], '%Y-%m-%d').date()
		if request.data['save_type'] == 'draft':
			post_status = BLOG_DRAFT
		elif publish_date > date.today():
			post_status = BLOG_PENDING
		else:
			post_status = BLOG_PUBLISHED
		data = {
			'title': request.data['title'],
			'content': request.data['content'],
			'publish_date': publish_date,
			'status': post_status,
		}
		BlogPost.objects.filter(pk=pk).update(**data)
		return Response(status=status.HTTP_200_OK)

	def destroy(self, request, pk=None):
		post = get_object_or_404(BlogPost, pk=pk)
		post.delete()
		return Response(status=status.HTTP_200_OK)


class BlogViewSet(viewsets.ModelViewSet):
	permission_classes = (AllowAny,)
	serializer_class = BlogPostSerializer
	http_method_names = ['get']
	queryset = BlogPost.objects.filter(status=BLOG_PUBLISHED)
