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
def api_salespeople(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
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



@require_http_methods(["GET", "POST", "DELETE"])
def api_customers(request, pk):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder
        )
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a Customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "POST", "DELETE"])
def api_sales(request, pk):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleEncoder
        )
    elif request.method == "DELETE":
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create a Sale"}
            )
            response.status_code = 400
            return response
