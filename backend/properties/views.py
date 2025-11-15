# backend/properties/views.py

from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Property.objects.filter(is_published=True).order_by("-created_at")
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter]
    search_fields = ["title","city","state","country","description","address"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        qs = self.get_queryset()[:6]
        return Response(self.get_serializer(qs, many=True).data)
