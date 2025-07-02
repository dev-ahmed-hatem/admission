from rest_framework.routers import DefaultRouter
from .views import ApplicantViewSet, get_application
from django.urls import path, include

router = DefaultRouter()
router.register(r'applicants', ApplicantViewSet, basename='applicants')

urlpatterns = [
    path("", include(router.urls)),
    path("application-view/", get_application, name="applicant-view"),
]
