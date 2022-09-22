from django.db import models
from accounts.models import User
from .constants import BLOG_PUBLISHED, BLOG_DRAFT, BLOG_PENDING


class BlogPost(models.Model):

	STATUS = (
		(BLOG_PUBLISHED, 'Published'),
		(BLOG_DRAFT, 'Draft'),
		(BLOG_PENDING, 'Pending'),
	)

	user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
	title = models.CharField(max_length=200)
	content = models.TextField()
	date_created = models.DateTimeField(auto_now_add=True)
	publish_date = models.DateField()
	status = models.PositiveSmallIntegerField(choices=STATUS , default=BLOG_PUBLISHED)

	def __str__(self):
		return self.title
