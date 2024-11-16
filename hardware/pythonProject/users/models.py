import datetime

from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    surename = models.CharField(max_length=100)
    id = models.IntegerField()
    qr_code = models.IntegerField(default=0)
    reservation_start = models.DateField(default=datetime.date.today)
    reservation_end = models.DateField(default=datetime.date.today)
