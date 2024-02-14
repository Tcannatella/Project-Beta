# Generated by Django 4.0.3 on 2024-02-07 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='phone_number',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.PositiveBigIntegerField(),
        ),
        migrations.AlterField(
            model_name='salesperson',
            name='employee_id',
            field=models.PositiveSmallIntegerField(),
        ),
    ]
