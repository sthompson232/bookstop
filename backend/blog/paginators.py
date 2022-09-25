import math

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class BlogPostPaginator(PageNumberPagination):
  page_size = 10

  def get_paginated_response(self, data):
    count = self.page.paginator.count
    total_pages = int(math.ceil(count / self.page_size))
    return Response({
      'next': self.get_next_link(),
      'previous': self.get_previous_link(),
      'count': count,
      'results': data,
      'total_pages': total_pages,
    })
