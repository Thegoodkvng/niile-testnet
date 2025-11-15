# backend/accounts/serializers.py

from django.contrib.auth import get_user_model
from rest_framework import serializers
from agents.models import Agent

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    full_name = serializers.CharField(max_length=255)
    phone_number = serializers.CharField(
        max_length=50, required=False, allow_blank=True
    )

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        email = validated_data["email"]
        password = validated_data["password"]
        full_name = validated_data["full_name"]
        phone_number = validated_data.get("phone_number", "")

        # Create the user (works with default and most custom user models)
        user = User.objects.create_user(
            username=email,  # safe fallback even if USERNAME_FIELD is email
            email=email,
            password=password,
        )

        # Build kwargs for Agent dynamically based on its actual fields
        agent_kwargs = {"user": user}

        # full_name is almost certainly on your Agent model
        if any(f.name == "full_name" for f in Agent._meta.get_fields()):
            agent_kwargs["full_name"] = full_name

        # Only set phone_number if the field actually exists
        if phone_number and any(
            f.name == "phone_number" for f in Agent._meta.get_fields()
        ):
            agent_kwargs["phone_number"] = phone_number

        agent = Agent.objects.create(**agent_kwargs)

        return user, agent


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
