from rest_framework import serializers
from .models import Property, PropertyImage

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id","image","alt"]

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ["id","title","slug","description","price","currency","address","city","state","country",
                  "bedrooms","bathrooms","area_sqft","is_published","created_at","updated_at","images"]
