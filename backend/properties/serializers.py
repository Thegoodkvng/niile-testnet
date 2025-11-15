# backend/properties/serializers.py

from rest_framework import serializers
from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    """
    Minimal serializer that exposes all fields on the Property model,
    including created_by.
    """

    class Meta:
        model = Property
        fields = "__all__"
