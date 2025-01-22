from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
# fro
from rest_framework.views import APIView
from rest_framework.response import Response
from django_backend.models import *
from .serializers import *
from django.contrib.auth import authenticate,login
from django_backend.renderers import User_renderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import *
from rest_framework import status
from django_backend.utils import *

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

#REGISTRATION
class User_Registration_View(APIView):
    renderer_classes = [User_renderer]
    def get(self,request):
        data = User.objects.all()
        serializer = User_Registration_serializer(data,many=True)
        return Response({'data':serializer.data,'msg':'your data is fetched'})
    
    def post(self,request,format=None):
        data = request.data
        print(data)
        serializer = User_Registration_serializer(data=data)
        if serializer.is_valid():
            print('serializer is valid')
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token':token,'data':serializer.data,'msg':'Registration is successful'}, status=status.HTTP_200_OK)

        print('serializer is not valid')
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#LOGIN
class User_Login_view(APIView):
    renderer_classes = [User_renderer]
    def post(self,request):
        serializer = User_Login_serializer(data = request.data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            print(email)
            password = serializer.data.get('password')
            print(password)
            user = authenticate(email=email,password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'data':serializer.data,'token':token,'msg':'Login successfull'}, status=status.HTTP_200_OK)
            else:
            # return Response({'error':'email and password is not valid'})
                return Response({'errors': {'non_field_errors': ['Invalid email or password']}}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#It checks which user is logged in
class User_Profile_view(APIView):
    renderer_classes = [User_renderer]
    permission_classes = [IsAuthenticated]

    def get(self,request):  
        print('i am here')
        serializer = Profile_serializer(request.user)
        print(serializer)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class User_change_password(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [User_renderer]
    def post(self,request):
        serializer = User_change_password_serializer(data = request.data,context = {'user':request.user})
        print('serialsiere is herere bro',serializer)
        if serializer.is_valid(raise_exception=True):
            print('is valid ')
            return Response({'data':serializer.data,'msg':'password changed successfully'},status=status.HTTP_200_OK)
        print('not valid ')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Send_password_reset_email_view(APIView):
    renderer_classes = [User_renderer]
    def post(self,request):
        serializer = User_send_password_reset_link_serializer(data = request.data)
        if serializer.is_valid():
            return Response({'msg':'password link has sent to your email'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class reset_password_view(APIView):
    renderer_classes = [User_renderer]
    def post(self,request,uid,token):
        context = {'uid':uid,'token':token}
        serializer = User_reset_password_serializer(data = request.data,context=context)

        if serializer.is_valid():
            return Response({'msg':'your password has reset successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # pass
