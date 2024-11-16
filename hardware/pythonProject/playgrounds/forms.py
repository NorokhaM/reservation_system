from django import forms
from .models import Playground, Device


class PlaygroundForm(forms.ModelForm):
    class Meta:
        model = Playground
        fields = ['name', 'rpi_link', 'id']


class DeviceForm(forms.ModelForm):
    class Meta:
        model = Device
        fields = ['name', 'deviceIp', 'Id', 'deviceType', 'playground']
