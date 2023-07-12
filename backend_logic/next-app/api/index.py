from fastapi import FastAPI
import requests

app = FastAPI()

url = "http://auto-gpt:3000/api/python"  # Use the service name defined in the docker-compose.yml file

try:
    response = requests.get(url)  # Make the request to the auto-gpt service
    if response.status_code == 200:
        print("Request successful!")
    else:
        print(f"Request failed with status code: {response.status_code}")
except requests.exceptions.RequestException as e:
    print("An error occurred while making the request:", str(e))

@app.get("/")
def redirect_to_index():
    return {"message": "Hello World"}

@app.get("/api/python")
def hello_world():
    return {"message": "Hello Python"}
