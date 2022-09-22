from rest_framework.serializers import ModelSerializer

from .models import BlogPost


class BlogPostSerializer(ModelSerializer):
	class Meta:
		model = BlogPost
		fields = ('id', 'user', 'title', 'content', 'publish_date', 'status')
