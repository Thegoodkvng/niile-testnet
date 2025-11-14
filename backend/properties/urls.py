from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

router = DefaultRouter()
router.register(r"", PropertyViewSet, basename="property")  # /api/properties/ and /api/properties/<slug>/

urlpatterns = [ path("", include(router.urls)) ]
