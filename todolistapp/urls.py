from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name=''),
    path('create_data', views.create_data, name='create'),
    path('read_data', views.read_data, name='read_data'),
    path('update_data', views.update_data, name='update_data'),
    path('delete_data', views.delete_data, name='delete_data'),
]
