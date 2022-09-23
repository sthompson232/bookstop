from datetime import date

from celery import shared_task

from .models import BlogPost
from .constants import BLOG_PENDING, BLOG_PUBLISHED

@shared_task(name='check_pending_blog_posts')
def check_pending_blog_posts():
	today = date.today()
	pending_blog_posts = BlogPost.objects.filter(status=BLOG_PENDING)
	for post in pending_blog_posts:
		if post.publish_date <= today:
			post.status = BLOG_PUBLISHED
			post.save()
