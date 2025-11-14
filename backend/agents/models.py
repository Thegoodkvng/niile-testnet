from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()

class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="agent_profile")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="agents/", blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = self.user.get_full_name() or self.user.username
            self.slug = slugify(base)[:220]
        super().save(*args, **kwargs)

    def __str__(self): return self.user.get_full_name() or self.user.username
