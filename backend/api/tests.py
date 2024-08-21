# from rest_framework.test import APITestCase, APIClient
# from rest_framework import status


# class TestAPIViewTests(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = "http://localhost:8000/api/test"

#     def test_api_view(self):
#         response = self.client.get(self.url)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#         expected_data = {
#             "status": "success",
#             "message": "API is working",
#         }
#         self.assertEqual(response.data, expected_data)
import unittest
from rest_framework.test import APIRequestFactory
from .views import test_api_view


class TestApiView(unittest.TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_test_api_view(self):
        request = self.factory.get("/test/")
        response = test_api_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["status"], "success")
        self.assertEqual(response.data["message"], "API is working")


if __name__ == "__main__":
    unittest.main()
