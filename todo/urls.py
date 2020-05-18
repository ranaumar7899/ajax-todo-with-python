from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('add_item', views.add_todo_item, name="add_item"),
    path('delete_item', views.delete_todo_item, name="delete_item"),
    path('update_item', views.update_todo_item, name="update_item"),

]
