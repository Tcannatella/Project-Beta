from django.urls import path

from .views import api_appointments, api_technicians, api_appointment, api_technician

urlpatterns = [
    path("appointments/", api_appointments, name="api_apoinments"),
    path("appointment/<int:pk>/", api_appointment, name=" api_appointment"),
    path('appointments/<int:pk>/<str:action>/', api_appointment),
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician")
]
