from django.db import models
from django.contrib.auth import get_user_model
from properties.models import Property

User = get_user_model()

class Inquiry(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="inquiries")
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    assigned_to_email = models.EmailField(blank=True)  # agent email copy (optional)
    def __str__(self): return f"Inquiry for {self.property.title} by {self.name}"
