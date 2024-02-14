from django.contrib import admin
from .models import Salesperson, Sale, Customer, AutomobileVO


admin.site.register(AutomobileVO)
admin.site.register(Customer)
admin.site.register(Sale)
admin.site.register(Salesperson)
