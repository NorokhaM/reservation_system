import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from playgrounds.models import Playground, Device
import json


@csrf_exempt  # Disable CSRF check (ensure this is okay in your environment)
def switchable_function(request):
    if request.method == 'POST':
        try:
            # Parse JSON body data from the POST request
            data = json.loads(request.body)

            # Extract parameters from the request body
            playground_name = data.get('playground_name')
            device_name = data.get('device_name')
            power = data.get('power')

            # Check if any of the parameters are missing
            if not playground_name or not device_name or power is None:
                return JsonResponse({"error": "Missing required parameters."}, status=400)

            # Get Playground and Device objects
            try:
                playground = Playground.objects.get(name=playground_name)
                device = Device.objects.get(name=device_name, playground=playground)
            except Playground.DoesNotExist:
                return JsonResponse({"error": f"Playground with name '{playground_name}' does not exist."}, status=404)
            except Device.DoesNotExist:
                return JsonResponse(
                    {"error": f"Device with name '{device_name}' does not exist in playground '{playground_name}'."},
                    status=404)

            # Prepare data to send to FastAPI
            device_data = {
                'device_id': device.deviceIp,  # Assuming `device_ip` acts as `device_id`
                'power': power,
            }

            # Send data to the FastAPI endpoint
            fastapi_url = f"{playground.rpi_link}/control-device"  # Update port/path as needed
            response = requests.post(fastapi_url, json=device_data)

            # Return the response from FastAPI
            if response.status_code == 200:
                return JsonResponse({'message': 'Data sent successfully!', 'response': response.json()})
            else:
                return JsonResponse({
                    'error': 'Failed to send data.',
                    'status_code': response.status_code,
                    'response': response.text
                }, status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data provided."}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method. Please use POST."}, status=405)
