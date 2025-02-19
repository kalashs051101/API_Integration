from rest_framework import renderers
import json

# it is used for showing the errors

class User_renderer(renderers.JSONRenderer):
    charset = 'utf-8'

    def render(self,data,accepted_media_type=None,renderer_context = None):
        response=''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'errors':data})
        else:
            response = json.dumps(data)

        return response
    
