from django.db import models
from django.core.validators import (
    RegexValidator,
    MinValueValidator,
    MaxValueValidator,
    EmailValidator,
)


class Applicant(models.Model):
    GENDER_CHOICES = [
        ("ذكر", "ذكر"),
        ("أنثى", "أنثى"),
    ]

    RELIGION_CHOICES = [
        ("مسلم", "مسلم"),
        ("مسيحي", "مسيحي"),
        ("أخرى", "أخرى"),
    ]

    INSTITUTE_CHOICES = [
        ("معهد فني صحي", "معهد فني صحي"),
    ]

    DIVISION_CHOICES = [
        ("علوم الأشعة والتصوير الطبي", "علوم الأشعة والتصوير الطبي"),
        ("المختبرات الطبية", "المختبرات الطبية"),
        ("الرعاية التنفسية", "الرعاية التنفسية"),
        ("صناعة تركيبات الأسنان", "صناعة تركيبات الأسنان"),
        ("الأجهزة الطبية الحيوية", "الأجهزة الطبية الحيوية"),
        ("البصريات", "البصريات"),
    ]

    APPLICATION_STATUS_CHOICES = [
        ("قيد المراجعة", "قيد المراجعة"),
        ("مقبول", "مقبول"),
        ("مرفوض", "مرفوض"),
    ]

    arabic_name = models.CharField(
        verbose_name="اسم الطالب باللغة العربية",
        max_length=200,
    )

    english_name = models.CharField(
        verbose_name="اسم الطالب باللغة الانجليزية",
        max_length=200,
    )

    religion = models.CharField(
        verbose_name="الديانة",
        max_length=20,
        choices=RELIGION_CHOICES,
    )

    nationality = models.CharField(
        verbose_name="بلد الجنسية",
        max_length=100,
    )

    gender = models.CharField(
        verbose_name="النوع",
        max_length=10,
        choices=GENDER_CHOICES,
    )

    governorate = models.CharField(
        verbose_name="المحافظة",
        max_length=100,
    )

    city = models.CharField(
        verbose_name="المدينة",
        max_length=100,
    )

    national_id = models.CharField(
        verbose_name="الرقم القومي",
        max_length=14,
        validators=[
            RegexValidator(
                regex=r"^\d{14}$",
                message="الرقم القومي يجب أن يتكون من 14 رقمًا"
            )
        ],
        unique=True,
    )

    birthdate = models.DateField(
        verbose_name="تاريخ الميلاد",
    )

    mobile = models.CharField(
        verbose_name="رقم الموبايل",
        max_length=20,
        validators=[
            RegexValidator(
                regex=r"^\+?\d{10,15}$",
                message="رقم الهاتف غير صالح"
            )
        ],
    )

    email = models.EmailField(
        verbose_name="البريد الالكتروني",
        validators=[EmailValidator()],
        unique=True,
    )

    address = models.TextField(
        verbose_name="عنوان الطالب بالتفصيل",
        blank=True,
    )

    institute = models.CharField(
        verbose_name="المعهد",
        max_length=100,
        choices=INSTITUTE_CHOICES,
    )

    division = models.CharField(
        verbose_name="الشعبة",
        max_length=100,
        choices=DIVISION_CHOICES,
        blank=True,
        null=True,
    )

    certificate_percentage = models.DecimalField(
        verbose_name="نسبة الشهادة",
        max_digits=5,
        decimal_places=2,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(100),
        ],
        null=True,
        blank=True,
    )

    total_mark = models.PositiveIntegerField(
        verbose_name="المجموع",
    )

    total_out_of = models.PositiveIntegerField(
        verbose_name="إجمالي الدرجات",
    )

    certificate_year = models.PositiveIntegerField(
        verbose_name="سنة الحصول على الشهادة",
        validators=[
            MinValueValidator(2016),
            MaxValueValidator(2024),
        ],
    )

    status = models.CharField(max_length=12, choices=APPLICATION_STATUS_CHOICES, default="قيد المراجعة")

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="تاريخ التسجيل",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="تاريخ آخر تعديل",
    )

    class Meta:
        verbose_name = "متقدم"
        verbose_name_plural = "المتقدمين"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.arabic_name} - {self.national_id}"
