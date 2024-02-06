from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Customer, Sale, Salesperson


# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "customer",
        "salesperson",
        "automobile"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
        "salesperson": SalespersonEncoder(),
    }


@require_http_methods(["GET", "POST", "DELETE"])
def api_salespeople(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder
        )
    elif:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a Salesperson"}
            )
            response.status_code = 400
            return response
    else:
        request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
