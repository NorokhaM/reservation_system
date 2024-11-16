from django import forms
from .models import User


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'surename', 'id', 'qr_code', 'reservation_start', 'reservation_end']