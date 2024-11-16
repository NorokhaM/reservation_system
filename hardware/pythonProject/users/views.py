import json

from django.http import JsonResponse
from django.shortcuts import render
from forms import UserForm

def createUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = UserForm(data)

            if(form.is_valid()):
                user = form.save()
                return JsonResponse({"message": "User created successfully!"}, status=201)
            else:
                print(form.errors)
                return JsonResponse({"error": form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
    return JsonResponse({"error": "Only POST method is allowed."}, status=405)