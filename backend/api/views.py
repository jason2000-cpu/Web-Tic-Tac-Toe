from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# TEST API VIEW
@api_view(["GET"])
def test_api_view(request):
    return Response(
        {
            "status": "success",
            "message": "API is working",
        },
        status=status.HTTP_200_OK,
    )
