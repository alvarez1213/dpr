from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from storage import views

urlpatterns = [
    path('storage/', views.FilesList.as_view()),
    path('storage/<int:pk>', views.FileDetail.as_view()),

    path('users/', views.UsersList.as_view()),
    path('users/<int:pk>', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
