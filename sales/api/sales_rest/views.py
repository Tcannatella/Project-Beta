from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
# Create your views here.
from .encoders import (
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)

from .models import Salesperson, Sale, AutomobileVO, Customer

##################### SALESPEOPLE API ##################################

# #####used to create a salesperson and retrieve list of saleperson(s)
@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            print("content: ",content)
            salesperson = Salesperson.objects.create(**content)


            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response

# used to delete a specific salesperson 
@require_http_methods(["DELETE", "GET"])
def api_salesperson(request, pk):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


########################### CUSTOMER API ############################

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


######################## SALE API ###############################
        
@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        models = Sale.objects.all()
        return JsonResponse(
            {"models": models},
            encoder=SaleEncoder
        )
    else:
        try:
            content = json.loads(request.body)

            salesperson = Salesperson.objects.get(id=content['salesperson'])
            content['salesperson'] = salesperson

            customer = Customer.objects.get(id=content['customer'])
            content['customer'] = customer

            automobile_vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content['automobile'] = automobile

        #    Trying to update the "sold" key inside the "automobile" key which resides in Sale object
            # prop = ["sold"]
            # setattr(automobile, prop, content['true'])
            # automobile.save()
            
            model = Sale.objects.create(**content)

            return JsonResponse(
                model,
                encoder=SaleEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sale model"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale(request, pk):
    if request.method == "GET":
        try:
            model = Sale.objects.get(id=pk)
            return JsonResponse(
                model,
                encoder=SaleEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            model = Sale.objects.get(id=pk)
            model.delete()
            return JsonResponse(
                model,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            model = Sale.objects.get(id=pk)
            props = ["name", "picture_url"]
            for prop in props:
                if prop in content:
                    setattr(model, prop, content[prop])
            model.save()

            return JsonResponse(
                model,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
