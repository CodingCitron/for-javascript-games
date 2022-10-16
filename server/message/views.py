from django.shortcuts import render
from ninja import NinjaAPI

api = NinjaAPI()

@api.get("/")
def add(request):
    return {"result": '접속'}

@api.get("/add")
def add(request, a: int, b: int):
    return {"result": a + b}