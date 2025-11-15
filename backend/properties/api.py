# backend/properties/api.py

from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from .models import Property
from .serializers import PropertySerializer


class PropertyViewSet(viewsets.ModelViewSet):
    """
    Authenticated CRUD API for Property (agent-facing).

    - GET    /api/properties/          -> list current user's properties
    - POST   /api/properties/          -> create, linked to current user
    - GET    /api/properties/{id}/     -> retrieve (only if created_by = user)
    - PUT    /api/properties/{id}/     -> update (only if created_by = user)
    - PATCH  /api/properties/{id}/     -> partial update (same)
    - DELETE /api/properties/{id}/     -> delete (same)

    Public browsing still uses the read-only ViewSet in backend/properties/views.py.
    """

    queryset = Property.objects.all().order_by("-id")
    serializer_class = PropertySerializer

    # 🔑 Make sure DRF actually tries to authenticate with your token
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Only show properties created by the logged-in user.
        """
        user = self.request.user
        if not user or not user.is_authenticated:
            return Property.objects.none()
        return Property.objects.filter(created_by=user).order_by("-id")

    def perform_create(self, serializer):
        """
        Automatically attach the logged-in user to new properties.
        """
        serializer.save(created_by=self.request.user)
