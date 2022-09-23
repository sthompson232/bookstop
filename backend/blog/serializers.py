from accounts.serializers import UserSerializer
from core.serializers import DynamicFieldsModelSerializer
from .models import BlogPost


class BlogPostSerializer(DynamicFieldsModelSerializer):
	user = UserSerializer(fields=('first_name', 'last_name'))

	class Meta:
		model = BlogPost
		fields = '__all__'
