from django.urls import path

from .views import (
    api_salesperson,
    api_salespersons,
    api_customer,
    api_customers,
    api_sale,
    api_sales,
)

urlpatterns = [
    path(
        "salespeoples/",
        api_salespersons,
        name="api_salespersons",
    ),
    path(
        "salespeoples/<int:pk>/",
        api_salesperson,
        name="api_salesperson",
    ),
    path(
        "customers/",
        api_customers,
        name="api_customers",
    ),
    path(
        "customers/<int:pk>/",
        api_customer,
        name="api_customer",
    ),
    path(
        "sales/",
        api_sales,
        name="api_sales",
    ),
    path(
        "sales/<int:pk>/",
        api_sale,
        name="api_sale",
    ),
]
