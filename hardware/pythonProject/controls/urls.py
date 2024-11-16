from django.urls import path

from . import views

urlpatterns = [
    path('switchable/', views.switchable_function, name='switchable_function'),
]
