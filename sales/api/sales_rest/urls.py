from django.urls import path

from .views import api_salespeople, api_sales, api_customers


urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:pk>/", api_salespeople, name="api_salespeople"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customers, name="api_customers"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sales, name="api_sales"),
]
