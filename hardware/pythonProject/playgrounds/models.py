from django.db import models


class Playground(models.Model):
    name = models.CharField(max_length=200)
    rpi_link = models.CharField(max_length=200)
    id = models.IntegerField(primary_key=True)


class Device(models.Model):
    name = models.CharField(max_length=200)
    deviceIp = models.CharField(max_length=200)
    Id = models.IntegerField(primary_key=True)
    deviceType = models.CharField(max_length=200)
    playground = models.ForeignKey(Playground, on_delete=models.CASCADE, related_name="device_set")
