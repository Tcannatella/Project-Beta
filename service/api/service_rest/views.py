from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)

        try:

            tech_id = content.get("technician_id")
            technician = Technician.objects.get(pk=tech_id)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
    # else:
        # content = json.loads(request.body)

        # try:
        #     tech_id = content["technician"]
        #     technician = Technician.objects.get(pk=tech_id)
        #     content["technician"] = technician
        #     appointment = Appointment.objects.create(**content)
        #     return JsonResponse(
        #         {"message": "Appointment created successfully"},
        #         status=201,
        #     )
        except (Technician.DoesNotExist, json.JSONDecodeError):
            response = JsonResponse(
             {"message": "Could not create the appointment"},
            status=400
            )
            return response




@require_http_methods(["GET", "DELETE", "PUT", ])
def api_appointment(request, pk, action=None):
    try:
        model = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(model, encoder=AppointmentEncoder, safe=False)
    elif request.method == "DELETE":
        model.delete()
        return JsonResponse({"message": "Appointment deleted successfully"})

    if action == "cancel":
        model.status = "canceled"
    elif action == "finish":
        model.status = "finished"
    else:
        return JsonResponse({"message": "Invalid action for PUT request"}, status=405)

    model.save()
    return JsonResponse(model, encoder=AppointmentEncoder, safe=False)

@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except json.JSONDecodeError:
            response = JsonResponse(
                {"message": "Could not create a Technician"},
                status=400
            )
            return response

@require_http_methods(["GET", "DELETE"])
def api_technician(request, pk):
    try:
        technician = Technician.objects.get(id=pk)
    except Technician.DoesNotExist:
        return JsonResponse({"message": "Technician does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        technician.delete()
        return JsonResponse({"message": "Technician deleted successfully"})
