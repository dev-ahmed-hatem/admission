from rest_framework import serializers
from .models import Applicant, TranscriptFile


class TranscriptFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranscriptFile
        fields = ['id', 'file']


class ApplicantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = "__all__"


class ApplicantReadSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        model = Applicant
        fields = "__all__"


class ApplicantWriteSerializer(serializers.ModelSerializer):
    # transcript_files = TranscriptFileSerializer(many=True, required=True)

    class Meta:
        model = Applicant
        fields = "__all__"

    def validate_transcript_files(self, value):
        if len(value) > 2:
            raise serializers.ValidationError("يمكن رفع ملفين كحد أقصى لبيان الدرجات.")
        return value

    def validate(self, attrs):
        """
        Extra validation for internship_certificate
        """
        division = attrs.get('division')
        internship_certificate = attrs.get('internship_certificate')

        if division != "البصريات" and not internship_certificate:
            raise serializers.ValidationError({
                "internship_certificate": "شهادة الامتياز مطلوبة"
            })

        return attrs
