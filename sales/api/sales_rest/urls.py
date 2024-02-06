from django.urls import path

from .views import api_salespeople, api_sales, api_customers


urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("customers/", api_customers, name="api_customers"),
    path("sales/", api_sales, name="api_sales"),
]
