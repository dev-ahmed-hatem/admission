# Generated by Django 5.2 on 2025-07-01 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='application_status',
            field=models.CharField(choices=[('قيد المراجعة', 'قيد المراجعة'), ('مقبول', 'مقبول'), ('مرفوض', 'مرفوض')], default='قيد المراجعة', max_length=12),
        ),
    ]
