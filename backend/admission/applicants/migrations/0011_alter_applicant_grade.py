# Generated by Django 5.2 on 2025-07-06 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applicants', '0010_applicant_grade_applicant_institute_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant',
            name='grade',
            field=models.CharField(choices=[('جيد جدا', 'جيد جدا'), ('امتياز', 'امتياز')], max_length=20, verbose_name='التقدير'),
        ),
    ]
