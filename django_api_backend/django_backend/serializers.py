from django.utils.encoding import force_bytes,smart_str,DjangoUnicodeDecodeError
from rest_framework import serializers
from django_backend.models import *
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from .utils import *



class User_Registration_serializer(serializers.ModelSerializer):
    # password = serializers.CharField(style={'input_type':'password'},write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)

    class Meta:
        model = User
        fields = ["id","name","email","password","password2","tc"]
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def validate(self,attrs):
        password = attrs.get('password')
        print(password)
        password2 = attrs.get('password2')
        print(password2)

        if password != password2:
            print('password is not valid')
            raise serializers.ValidationError('password not match')
        return attrs

    def create(self,validated_data):
        return User .objects.create_user(**validated_data)


class User_Login_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255)

    class Meta:
        model= User
        fields = ['id','email','password']


class Profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email']


class User_change_password_serializer(serializers.Serializer):

    password = serializers.CharField(max_length = 20,style = {'input_type':'password'}
                                     ,write_only = True)
    password2 = serializers.CharField(max_length = 100,style = {'input_type':'password'}
                                      ,write_only = True)
    class Meta:
        model = User
        fields = ['password','password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        print('p1',password)
        print('p2',password2)
        user = self.context.get('user')
        print(user)

        if password!=password2:
            raise serializers.ValidationError('password not match')
        user.set_password(password)
        user.save()
        print('i am here')

        return attrs


class User_send_password_reset_link_serializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 100)

    class Meta:
        model = User
        fields = ["email"]
    
    def validate(self, attrs):
        email = attrs.get('email')
        print(email)
        if User.objects.filter(email = email).exists():
            user = User.objects.get(email = email)
            print('this is user',user)
            uid = urlsafe_base64_encode(force_bytes(user.id)) 

            token = PasswordResetTokenGenerator().make_token(user)

            link = 'http://127.0.0.1:3000/api/reset_password/'+uid+ '/' +token
            print(link)

            body = f'click here for reset your account :{link}'
            #send email here
            data ={
                'subject' : 'reset your password',
                'body' :body,
                'to_email':user.email,
            }
            print('before sending mail')
            # Util.send_email(data)
            print('After sending mail')
            return attrs
        else:
            raise serializers.ValidationError('you are not registered')


class User_reset_password_serializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255,style = {'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length=255,style = {'input_type':'password'},write_only=True)

    # pass
    class Meta:
        model = User
        fields = ['password','password2']
    def validate(self, attrs):
        password =attrs.get('password') 
        password2=attrs.get('password2')
        uid = self.context.get('uid')
        token = self.context.get('token')

        if password!=password2:
            raise serializers.ValidationError('password does not match')
        id = smart_str(urlsafe_base64_decode(uid))

        user = User.objects.get(id =id)

        if not PasswordResetTokenGenerator().check_token(user,token):
            raise ValidationError('token is not valid or expired')
        user.set_password(password)
        user.save()

        return attrs
     



