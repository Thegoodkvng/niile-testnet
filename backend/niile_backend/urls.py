# backend/niile_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter

from properties.api import PropertyViewSet
from accounts.api import RegisterView, LoginView

router = DefaultRouter()
router.register(r"properties", PropertyViewSet, basename="property")

urlpatterns = [
    path("admin/", admin.site.urls),

    # Auth API
    path("api/auth/register/", RegisterView.as_view(), name="api-register"),
    path("api/auth/login/", LoginView.as_view(), name="api-login"),

    # Properties API
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
