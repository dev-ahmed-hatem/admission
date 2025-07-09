from rest_framework.routers import DefaultRouter
from .views import ApplicantViewSet, get_application, get_home_statistics
from django.urls import path, include

router = DefaultRouter()
router.register(r'applicants', ApplicantViewSet, basename='applicants')

urlpatterns = [
    path("", include(router.urls)),
    path("application-view/", get_application, name="applicant-view"),
    path("home-stats/", get_home_statistics, name="home-stats"),
]
