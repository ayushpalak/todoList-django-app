from django.shortcuts import render
from .models import Todomodel
import json
import os
import datetime
import pytz
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from dateutil import tz
from django.views.decorators.http import require_http_methods

from django.core import serializers

def push_to_db(kwargs):
    try:
        Todomodel.objects.create(**kwargs)
    except Exception as e:
        print(e)

def ValuesQuerySetToDict(vqs):
   return [item for item in vqs]

def convertDT(utc_DT, from_zone=tz.gettz('UTC'), to_zone=tz.gettz('Asia/Kolkata')):
    try:
        utc = datetime.datetime.strptime(
            utc_DT, '%Y-%m-%dT%H:%M:%S').replace(tzinfo=from_zone)
        india_DT = utc.astimezone(to_zone)
    except Exception as e:
        utc = datetime.datetime.strptime(
            utc_DT+":0", '%Y-%m-%dT%H:%M:%S').replace(tzinfo=from_zone)
        india_DT = utc.astimezone(to_zone)
    return india_DT

# Create your views here.


@csrf_exempt
def index(request):
    return render(request, "index.html")


@csrf_exempt
@require_http_methods(["POST"])
def create_data(request):
    try:
        received_json_data  = json.loads(request.body.decode("utf-8"))
        Title               = received_json_data["title"]
        Description         = received_json_data["description"]
        Complete_by         = received_json_data["complete_by"]
        
        if "" not in [Title.strip(), Complete_by.strip(), Description.strip()]:
            Complete_by_local = convertDT(Complete_by.strip(), to_zone=tz.gettz(
                'Asia/Kolkata'), from_zone=tz.gettz('UTC'))
            
            push_to_db({"Title": Title, 
                        "Description": Description,
                        "Complete_by": Complete_by_local,
                        "Status": 0, 
                        "Is_deleted": "0"})
            return HttpResponse("success")
        else:
            return HttpResponse("field cannot be blank.")
    except Exception as e:
        print("POST with Bad request"+str(e))
        return HttpResponse(str(e))


@require_http_methods(["GET"])
@csrf_exempt
def read_data(request):
    data = list(Todomodel.objects.filter(Is_deleted=0).values('Title','Description','Created_at','Modified_at','Complete_by','Status'))[::-1]
    return JsonResponse(data,safe=False)


@csrf_exempt
@require_http_methods(["POST"])
def update_data(request):
    try:
        received_json_data = json.loads(request.body.decode("utf-8"))

        Id              = received_json_data["Id"]
        Title           = received_json_data["Title"]
        Description     = received_json_data["Description"]
        Status          = received_json_data["Status"]
        Complete_by     = received_json_data["Complete_by"]
        Modified_at     = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')

        if "" not in [Id.strip(),Title.strip(),Description.strip(),Status.strip(),Complete_by.strip()]:
            Complete_by = convertDT(Complete_by.strip(), to_zone=tz.gettz(
                'Asia/Kolkata'), from_zone=tz.gettz('UTC'))

            obj              = Todomodel.objects.get(id=Id)
            obj.Title        = Title
            obj.Description  = Description
            obj.Complete_by  = Complete_by
            obj.Status       = Status
            obj.Modified_at  = Modified_at
            obj.save()
        else:
            return JsonResponse("field cannot be blank")
        return JsonResponse("success", safe=False)
    except Exception as e:
        print(e)
        return JsonResponse(str(e), safe=False)


@require_http_methods(["POST"])
@csrf_exempt
def delete_data(request):
    try:
        received_json_data  = json.loads(request.body.decode("utf-8"))
        Id                  = received_json_data['Id']
        if(Id.strip()!=""):
            obj                 = Todomodel.objects.get(id=Id)
            obj.Is_deleted = 1
            obj.save()
            return JsonResponse("success", safe=False)
        else:
            return JsonResponse("error")
    except Exception as e:
        print(e)
        return JsonResponse(str(e), safe=False)
