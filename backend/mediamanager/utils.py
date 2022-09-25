from django.core.files.base import ContentFile

from PIL import Image
import io
import uuid


def process_image(image, max_width, max_height):
  img = Image.open(image)
  format = img.format
  image_width = img.width
  image_height = img.height
  
  if img.height > max_height or img.width > max_width:

    if img.height > max_height:
      height_ratio = (max_height / float(img.size[1]))
      width = int((float(img.size[0]) * float(height_ratio)))
      img = img.resize((width, max_height), Image.ANTIALIAS)
      image_width = width
      image_height = max_height

    if img.width > max_width:
      width_ratio = (max_width / float(img.size[0]))
      height = int((float(img.size[1]) * float(width_ratio)))
      img = img.resize((max_width,height), Image.ANTIALIAS)
      image_width = max_width
      image_height = height

  buffer = io.BytesIO()
  img = img.save(buffer, format.upper(), quality=80)
  return ContentFile(buffer.getvalue(), name=f'{uuid.uuid4()}.{format.lower()}'), image_width, image_height
