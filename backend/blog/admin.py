from django.contrib import admin
from reversion.admin import VersionAdmin
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(VersionAdmin):
	pass
