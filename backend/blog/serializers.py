from rest_framework.serializers import ModelSerializer

from .models import BlogPost


class BlogPostPortalSerializer(ModelSerializer):
	class Meta:
		model = BlogPost
		fields = ('user', 'title', 'content', 'publish_date', 'draft', 'status')


class BlogPostSerializer(ModelSerializer):
	class Meta:
		model = BlogPost
		fields = ('user', 'title', 'content', 'publish_date')