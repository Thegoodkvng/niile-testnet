from rest_framework import viewsets, permissions
from .models import Agent
from .serializers import AgentSerializer

class AgentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Agent.objects.select_related("user").all().order_by("id")
    serializer_class = AgentSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
