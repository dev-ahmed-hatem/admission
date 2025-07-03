from rest_framework.decorators import action, api_view, permission_classes

from .models import Applicant
from .serializers import ApplicantWriteSerializer, ApplicantReadSerializer
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ApplicantWriteSerializer
        return ApplicantReadSerializer

    def get_queryset(self):
        queryset = Applicant.objects.all()
        search: str = self.request.query_params.get('search', None)

        if search is not None:
            if search.isdigit():
                queryset = queryset.filter(national_id__icontains=search)
            else:
                queryset = queryset.filter(arabic_name__icontains=search)

        return queryset

    @action(detail=True, methods=["post"])
    def set_status(self, request, pk=None):
        new_status = request.data.get("status")
        if new_status in ["مرفوض", "مقبول"]:
            try:
                applicant = Applicant.objects.get(pk=pk)
                applicant.status = new_status
                applicant.save()
                return Response(data={"status": new_status}, status=status.HTTP_200_OK)
            except Applicant.DoesNotExist:
                return Response({"error": "متقدم غير موجود"}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_application(request):
    national_id = request.GET.get("national_id", None)

    if national_id is not None:
        try:
            applicant = Applicant.objects.get(national_id=national_id)
            serializer = ApplicantReadSerializer(applicant, many=False, context={'request': request})
            return Response(serializer.data)
        except Applicant.DoesNotExist:
            return Response({'detail': 'موظف غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'detail': 'الرقم القومي مطلوب'}, status=status.HTTP_404_NOT_FOUND)
