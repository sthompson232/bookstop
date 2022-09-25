from django.db import models
from accounts.models import User


class Image(models.Model):
  file = models.FileField()
  width = models.PositiveIntegerField()
  height = models.PositiveBigIntegerField()
  uploaded_on = models.DateTimeField(auto_now_add=True)
  user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)

  def __str__(self):
    return self.file.url
