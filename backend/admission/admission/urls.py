from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admission/admin/', admin.site.urls),
    path('admission/api/', include([
        path('auth/', include('authentication.urls')),
        path('users/', include('users.urls')),
        path('applicants/', include('applicants.urls')),
        # path('attendance/', include('attendance.urls')),
        # path('projects/', include('projects.urls')),
    ])),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
