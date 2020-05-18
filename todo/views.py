from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Todo


def index(response):
    todo_list = Todo.objects.all()
    context = {
        'todo_list': todo_list
    }
    return render(response, 'todo/front_page.html', context)


def add_todo_item(response):
    if response.method == 'POST':
        title = response.POST['title']
        new_item = Todo(title=title)
        new_item.save()
        data = {
            'item_id': new_item.id
        }
        return JsonResponse(data)
    else:
        return redirect('/')


def delete_todo_item(response):
    if response.method == 'POST':
        item_id = response.POST['item_id']
        item = Todo.objects.get(pk=item_id)
        item.delete()
        data = {
            'deleted': True
        }
        return JsonResponse(data)
    else:
        return redirect('/')


def update_todo_item(response):
    if response.method == 'POST':
        item_id = response.POST['item_id']
        item_value = response.POST['item_value']
        if item_value == 'true':
            updated_value = True
        else:
            updated_value = False
        updateitem = Todo.objects.filter(pk=item_id).update(complete=updated_value)
        data = {
            'updated': True
        }
        return JsonResponse(data)
    else:
        return redirect('/')
