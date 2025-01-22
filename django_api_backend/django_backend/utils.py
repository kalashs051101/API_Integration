from django.core.mail import EmailMessage
import os
from django.conf import settings

class Util:

    print('inside util functions')
    @staticmethod
    def send_email(data):

        print('inside send email : ')
        email = EmailMessage(
            subject=data['subject'],
            body = data['body'],
            from_email = settings.EMAIL_HOST_USER,
            to = [data['to_email']]
        )
        print('before send email')
        email.send()
