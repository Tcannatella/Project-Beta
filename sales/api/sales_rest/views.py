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
        "id",
        "vin",
        "sold"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
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


@require_http_methods(["GET", "POST"])
def api_salespeople(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except json.JSONDecodeError:
            response = JsonResponse(
                {"message": "Could not create a Salesperson"},
                status=400
            )
            return response


@require_http_methods(["DELETE"])
def api_salesperson(request, pk):
    request.method == "DELETE"
    count, _ = Salesperson.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except json.JSONDecodeError:
            response = JsonResponse(
                {"message": "Could not create a Customer"},
                status=400
            )
            return response


@require_http_methods(["DELETE"])
def api_customer(request, pk):
    request.method == "DELETE"
    count, _ = Customer.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sale": sale},
            encoder=SaleEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except json.JSONDecodeError:
            response = JsonResponse(
                {"message": "Could not create a Sale"},
                status=400
            )
            return response


@require_http_methods(["DELETE"])
def api_sale(request, pk):
    request.method == "DELETE"
    count, _ = Sale.objects.filter(id=pk).delete()
    return JsonResponse({"deleted": count > 0})
