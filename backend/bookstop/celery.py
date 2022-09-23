import os
from django.conf import settings
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bookstop.settings')

app = Celery('bookstop')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

@app.task(bind=True)
def debug_task(self):
	print(f'Request: {self.request}')

app.conf.beat_schedule = {
	'check_pending_blog_posts' : {
		'task': 'check_pending_blog_posts',
		'schedule': crontab(minute=0, hour=0),
	}
}
