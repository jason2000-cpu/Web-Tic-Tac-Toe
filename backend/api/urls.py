from django.urls import path
from . import views

urlpatterns = [
    path("test/", views.test_api_view, name="test_api_view"),
]
