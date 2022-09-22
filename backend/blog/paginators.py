from rest_framework.pagination import PageNumberPagination


class BlogPostPaginator(PageNumberPagination):
	page_size = 20
