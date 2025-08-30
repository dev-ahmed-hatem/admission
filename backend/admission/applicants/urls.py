from rest_framework.routers import DefaultRouter
from .views import ApplicantViewSet, get_application, get_home_statistics, export_applicants_excel, get_student_exam, \
    record_exam_mark
from django.urls import path, include

router = DefaultRouter()
router.register(r'applicants', ApplicantViewSet, basename='applicants')

urlpatterns = [
    path("", include(router.urls)),
    path("application-view/", get_application, name="applicant-view"),
    path("home-stats/", get_home_statistics, name="home-stats"),

    path("export-applicants/", export_applicants_excel, name="export-applicants"),
    path("student-exam/", get_student_exam, name="student-exam"),
    path("record-mark/", record_exam_mark, name="record-mark"),
]
