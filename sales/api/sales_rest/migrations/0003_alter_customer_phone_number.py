# Generated by Django 4.0.3 on 2024-02-09 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_customer_phone_number_alter_sale_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.PositiveBigIntegerField(),
        ),
    ]
