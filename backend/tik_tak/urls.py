from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Admin page
    path("admin/", admin.site.urls),
    # APP urls
    path("api/", include("api.urls")),
    # Default login/logout views on browsable API
    path("api-auth/", include("rest_framework.urls")),
    # AUTHENTICATION
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
