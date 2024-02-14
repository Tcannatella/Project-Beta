from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
  vin = models.CharField(max_length=20)
  sold = models.BooleanField()

  def __str__(self):
    return self.vin


class Salesperson(models.Model):
  first_name = models.CharField(max_length=20)
  last_name = models.CharField(max_length=20)
  employee_id = models.PositiveSmallIntegerField()
  
  def __str__(self):
      return self.first_name + " " + self.last_name
  
class Customer(models.Model):
  first_name = models.CharField(max_length=20)
  last_name = models.CharField(max_length=20)
  phone_number = models.PositiveBigIntegerField()
  address = models.CharField(max_length=200)

  def __str__(self):
    return self.first_name + " " + self.last_name


class Sale(models.Model):
  automobile = models.ForeignKey(
     AutomobileVO,
     related_name = "sales",
     on_delete=models.CASCADE  
  )
  salesperson = models.ForeignKey(
     Salesperson,
     related_name = "sales",
     on_delete=models.CASCADE  
  )
  customer = models.ForeignKey(
     Customer,
     related_name = "sales",
     on_delete=models.CASCADE  
  )
  price = models.PositiveBigIntegerField()

  def __str__(self):
    return self.automobile.vin
  
  def get_api_url(self):
        return reverse("api_sales", kwargs={"pk": self.id})
