from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage; extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display=("title","city","price","currency","is_published","created_at")
    list_filter=("city","country","is_published","currency")
    search_fields=("title","city","state","country","address","slug")
    prepopulated_fields={"slug":("title",)}
    inlines=[PropertyImageInline]
