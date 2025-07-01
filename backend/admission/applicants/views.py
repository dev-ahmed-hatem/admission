from .models import Applicant
from .serializers import ApplicantWriteSerializer, ApplicantReadSerializer
from rest_framework import viewsets


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ApplicantWriteSerializer
        return ApplicantReadSerializer
