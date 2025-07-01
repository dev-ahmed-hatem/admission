from rest_framework import serializers
from .models import Applicant


class ApplicantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = "__all__"


class ApplicantReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = "__all__"


class ApplicantWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = "__all__"
