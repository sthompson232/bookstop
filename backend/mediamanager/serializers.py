from rest_framework import serializers

from .models import TinyMCEImage

class TinyMCEImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = TinyMCEImage
		fields = ('__all__')
