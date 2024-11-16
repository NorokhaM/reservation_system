import json

from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Playground, Device
from .forms import PlaygroundForm, DeviceForm


def playgrounds_with_devices_json(request):
    """
    Returns a JSON response with all playgrounds and their associated devices.
    """
    playgrounds = Playground.objects.prefetch_related('device_set').all()
    data = [
        {
            'playground_name': playground.name,
            'pi_link': playground.rpi_link,
            'id': playground.id,
            'devices': [
                {'name': device.name, 'type': device.deviceType, 'id': device.Id}
                for device in playground.device_set.all()
            ]
        }
        for playground in playgrounds
    ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def create_playground(request):
    """
    Creates a new playground from a POST request and returns a JSON response.
    """
    if request.method == 'POST':
        try:
            # Try to load the JSON data
            data = json.loads(request.body)
            form = PlaygroundForm(data)

            # Check if form is valid
            if form.is_valid():
                form.save()
                return JsonResponse({"message": "Playground created successfully!"}, status=201)
            else:
                # Log the form errors for debugging
                print(form.errors)
                return JsonResponse({"error": form.errors}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

    return JsonResponse({"error": "Only POST method is allowed."}, status=405)

@csrf_exempt
def create_device(request):
    if request.method == 'POST':
        try:
            # Try to load the JSON data
            data = json.loads(request.body)
            form = DeviceForm(data)

            # Check if form is valid
            if form.is_valid():
                form.save()
                return JsonResponse({"message": "Device created successfully!"}, status=201)
            else:
                # Log the form errors for debugging and return them
                print(form.errors)
                return JsonResponse({"error": form.errors}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

    return JsonResponse({"error": "Only POST method is allowed."}, status=405)

@csrf_exempt
def delete_device(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            playground = Playground.objects.get(id=data['playground_id'])
            device = Device.objects.get(device_id=data['id'], playground=playground)
            device.delete()
            return JsonResponse({"message": "Device deleted successfully!"}, status=200)
        except Device.DoesNotExist:
            return JsonResponse({"error": "Device not found."}, status=400)
        except Playground.DoesNotExist:
            return JsonResponse({"error": "Playground not found."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"message": "Only DELETE method is allowed!"}, status=204)

@csrf_exempt
def delete_playground(request):
    if request.method == 'DELETE':
        try:
            # Parse the JSON request body
            data = json.loads(request.body)
            gamefield_id = data.get('gamefield')
            if not gamefield_id:
                return JsonResponse({"error": "Gamefield ID is required."}, status=400)

            # Fetch the playground and associated devices
            playground = Playground.objects.get(id=gamefield_id)
            devices = Device.objects.filter(playground=gamefield_id)  # Adjusted query

            # Perform deletion
            for device in devices:
                device.delete()
            playground.delete()

            return JsonResponse({"message": "Gamefield and associated devices deleted successfully."}, status=200)

        except Playground.DoesNotExist:
            return JsonResponse({"error": "Gamefield not found."}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Only DELETE method is allowed"}, status=405)
