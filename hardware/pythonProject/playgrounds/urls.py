from django.urls import path

from . import views

urlpatterns = [
    path('api/playgrounds_with_devices/', views.playgrounds_with_devices_json, name='playgrounds_with_devices_json'),
    path("create_playground", views.create_playground, name="create_playground"),
    path("create_device", views.create_device, name="create_device"),
    path("delete_playground", views.delete_playground, name="delete_playground"),
    path("delete_device", views.delete_device, name="delete_device"),
]