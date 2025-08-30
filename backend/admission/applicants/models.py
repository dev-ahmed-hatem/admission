from django.db import models
from django.core.validators import (
    RegexValidator,
    MinValueValidator,
    MaxValueValidator,
    EmailValidator,
)
import os
import re


def safe_name(name):
    # Remove any unsafe characters and replace spaces with underscores
    return re.sub(r"[^\w\-]", "", name.replace(" ", "_"))


def upload_path(instance, filename, document_name):
    if hasattr(instance, "applicant") and instance.applicant:
        applicant_name = safe_name(instance.applicant.arabic_name)
        national_id = instance.applicant.national_id
    else:
        applicant_name = safe_name(instance.arabic_name)
        national_id = instance.national_id

    ext = filename.split(".")[-1]

    new_filename = f"{applicant_name}_{document_name}{instance.id or ''}.{ext}"

    return os.path.join(f"applicants/documents", f"{national_id}", new_filename)


def certificate_file_upload_path(instance, filename):
    return upload_path(instance, filename, "الشهادة المؤقتة")


def national_id_upload_path(instance, filename):
    return upload_path(instance, filename, "بطاقة الرقم القومي")


def military_status_upload_path(instance, filename):
    return upload_path(instance, filename, "شهادة المعاملة العسكرية")


def internship_certificate_upload_path(instance, filename):
    return upload_path(instance, filename, "شهادة الامتياز")


def transcript_upload_path(instance, filename):
    return upload_path(instance, filename, "بيان درجات")


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
        ("معهد فني صحي حكومي", "معهد فني صحي حكومي"),
        ("معهد فني صحي أزهر", "معهد فني صحي أزهر"),
        ("معهد بصريات", "معهد بصريات"),
    ]

    DIVISION_CHOICES = [
        ("علوم الأشعة والتصوير الطبي", "علوم الأشعة والتصوير الطبي"),
        ("المختبرات الطبية", "المختبرات الطبية"),
        ("الرعاية التنفسية / رعاية حرجة وطوارئ / تخدير ورعاية مركزية",
         "الرعاية التنفسية / رعاية حرجة وطوارئ / تخدير ورعاية مركزية"),
        ("صناعة تركيبات الأسنان", "صناعة تركيبات الأسنان"),
        ("الأجهزة الطبية الحيوية", "الأجهزة الطبية الحيوية"),
        ("البصريات", "البصريات"),
        ("البيولوجيا الحيوية", "البيولوجيا الحيوية"),
        ("عظام", "عظام"),
        ("معاون صحي / مراقب صحي", "معاون صحي / مراقب صحي"),
        ("تغذية علاجية", "تغذية علاجية"),
        ("صناعات دوائية", "صناعات دوائية"),
        ("تسجيل طبي وإحصاء", "تسجيل طبي وإحصاء"),
        ("إرشاد وتثقيف صحي", "إرشاد وتثقيف صحي"),
        ("خدمات طبية", "خدمات طبية"),
    ]

    ENROLLMENT_CHOICES = [
        ("علوم الأشعة والتصوير الطبي", "علوم الأشعة والتصوير الطبي"),
        ("المختبرات الطبية", "المختبرات الطبية"),
        ("الرعاية التنفسية / رعاية حرجة وطوارئ / تخدير ورعاية مركزية",
         "الرعاية التنفسية / رعاية حرجة وطوارئ / تخدير ورعاية مركزية"),
        ("صناعة تركيبات الأسنان", "صناعة تركيبات الأسنان"),
        ("الأجهزة الطبية الحيوية", "الأجهزة الطبية الحيوية"),
        ("البصريات", "البصريات"),
        ("المستوى الأول", "المستوى الأول")
    ]

    APPLICATION_STATUS_CHOICES = [
        ("قيد المراجعة", "قيد المراجعة"),
        ("مقبول", "مقبول"),
        ("مرفوض", "مرفوض"),
    ]

    PREFERENCE_CHOICES = [
        ("الالتحاق بالمرحلة الأولى", "الالتحاق بالمرحلة الأولى"),
        ("تركيبات الأسنان", "تركيبات الأسنان"),
        ("تكنولوجيا البصريات", "تكنولوجيا البصريات"),
    ]
    GRADE_CHOICES = [
        ("جيد جدا", "جيد جدا"),
        ("امتياز", "امتياز"),
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

    place_of_birth = models.CharField(
        max_length=50,
        verbose_name="محل الميلاد",
        null=True,
        blank=True,
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

    mobile2 = models.CharField(
        verbose_name="رقم الموبايل (2)",
        max_length=20,
        validators=[
            RegexValidator(
                regex=r"^\+?\d{10,15}$",
                message="رقم الهاتف غير صالح"
            )
        ],
        blank=True,
        null=True,
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

    institute_name = models.CharField(
        verbose_name="المعهد",
        max_length=100,
    )

    division = models.CharField(
        verbose_name="الشعبة",
        max_length=100,
        choices=DIVISION_CHOICES,
        blank=True,
        null=True,
    )

    enrollment = models.CharField(
        verbose_name="الالتحاق",
        max_length=100,
        choices=ENROLLMENT_CHOICES,
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
            MaxValueValidator(2025),
        ],
    )

    grade = models.CharField(
        max_length=20,
        choices=GRADE_CHOICES,
        verbose_name="التقدير",
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

    # DOCUMENTS
    certificate_file = models.FileField(
        upload_to=certificate_file_upload_path,
        verbose_name="صورة واضحة من الشهادة المؤقتة",
    )
    national_id_photo = models.FileField(
        upload_to=national_id_upload_path,
        verbose_name="صورة بطاقة الرقم القومي",
    )
    military_certificate = models.FileField(
        upload_to=military_status_upload_path,
        verbose_name="شهادة المعاملة العسكرية",
        blank=True,
        null=True,
    )
    internship_certificate = models.FileField(
        upload_to=internship_certificate_upload_path,
        verbose_name="شهادة الامتياز",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "متقدم"
        verbose_name_plural = "المتقدمين"
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.arabic_name} - {self.national_id}"

    def delete(self, *args, **kwargs):
        """
        Override delete to remove all uploaded files
        """
        file_fields = [
            self.certificate_file,
            self.national_id_photo,
            self.military_certificate,
            self.internship_certificate,
        ]

        applicant_directory = os.path.dirname(self.certificate_file.path)

        for file_field in file_fields:
            if file_field and file_field.name:
                file_field.delete(save=False)

        # Delete related transcript files
        for transcript in self.transcript_files.all():
            transcript.delete()

        # Delete applicant documents directory
        try:
            if applicant_directory:
                os.rmdir(applicant_directory)
        except Exception as e:
            print(e)

        super().delete(*args, **kwargs)


class TranscriptFile(models.Model):
    applicant = models.ForeignKey(
        Applicant,
        related_name="transcript_files",
        on_delete=models.CASCADE,
    )
    file = models.FileField(
        upload_to=transcript_upload_path,
        verbose_name="صورة واضحة من بيان درجات فرقة أولى وثانية",
        blank=True
    )

    def delete(self, *args, **kwargs):
        """
        Override delete to remove the file from storage
        """
        if self.file and self.file.name:
            self.file.delete(save=False)
        super().delete(*args, **kwargs)

    def __str__(self):
        return f"Transcript file for applicant {self.applicant.id}"


from django.db import models


class StudentExam(models.Model):
    national_id = models.CharField(
        max_length=20,
        unique=True,
        verbose_name="الرقم القومي"
    )
    mark = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="الدرجة"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.national_id} - {self.mark if self.mark is not None else 'لم يمتحن بعد'}"
