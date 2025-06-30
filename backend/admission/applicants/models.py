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

    CERTIFICATE_CHOICES = [
        ("الثانوية العامة", "الثانوية العامة"),
        ("الدبلوم", "الدبلوم"),
        ("معادلة", "معادلة"),
        # add more if needed
    ]

    INSTITUTE_CHOICES = [
        ("معهد فني صحي", "معهد فني صحي"),
    ]

    DIVISION_CHOICES = [
        ("علوم الاشعة", "علوم الاشعة"),
        ("الاجهزة الطبية", "الاجهزة الطبية"),
        ("البصريات", "البصريات"),
        ("الرعاية التنفسية", "الرعاية التنفسية"),
        ("تركيبات اسنان", "تركيبات اسنان"),
        ("المختبرات", "المختبرات"),
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
    )

    address = models.TextField(
        verbose_name="عنوان الطالب بالتفصيل",
        blank=True,
    )

    certificate = models.CharField(
        verbose_name="الشهادة",
        max_length=100,
        choices=CERTIFICATE_CHOICES,
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

    certificate_degree = models.CharField(
        verbose_name="مجموع الشهادة",
        max_length=50,
        blank=True,
        null=True,
    )

    certificate_year = models.PositiveIntegerField(
        verbose_name="سنة الحصول على الشهادة",
        validators=[
            MinValueValidator(2016),
            MaxValueValidator(2024),
        ],
    )

    preferences = models.JSONField(
        verbose_name="الرغبات",
        blank=True,
        default=list,
        help_text="في حالة عدم توفر شعبة مناسبة، يمكن إدخال أكثر من رغبة.",
    )

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
