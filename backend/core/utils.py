import requests
from django.conf import settings


def validate_recaptcha(token, validation_threshold):
  data = {
    'response': token,
    'secret': settings.RECAPTCHA_SECRET_KEY
  }
  res = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
  response = res.json()
  score = response['score']
  if score and score > validation_threshold:
    return True
  return False
