from flask import Flask, render_template, request
import json
from utils import *

app=Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def main():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    image = request.files.get("image")
    image = file2array(image)
    return json.dumps({"code":200, "img":array2base64(image)})

@app.route("/upload_base64", methods=["POST"])
def upload_base64():
    image = request.json['image']
    image = base642array(image)
    return json.dumps({"code":200, "img":array2base64(image)})

if __name__ == "__main__":
    app.run('0.0.0.0', port='80')