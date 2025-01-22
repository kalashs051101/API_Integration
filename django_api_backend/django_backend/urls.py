from django.contrib import admin
from django.urls import path,include
from django_backend.views import *

urlpatterns = [
    # path("",home,name='home'),
    path('register/',User_Registration_View.as_view(),name='register'),
    path('login/',User_Login_view.as_view(),name='login'),
    path('profile/',User_Profile_view.as_view(),name='profile'),
    path('change_password/',User_change_password.as_view(),name='change_password'),
    path('Send_password_email/',Send_password_reset_email_view.as_view(),name='Send_password_email'),
    path('reset_password/<uid>/<token>/',reset_password_view.as_view(),name='reset_password'),

]
