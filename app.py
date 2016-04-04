import os
import urllib
import requests
import json

from flask import Flask, render_template, request, Response
from flask.ext.compress import Compress

app = Flask(__name__)
Compress(app)

if os.environ.get('DEPLOYMENT_TARGET', False) == 'production':
    app.config.from_object('config.ProdConfig')
else:
    app.config.from_object('config.Config')

@app.route('/')
def home():
    return render_template('home.html', **{'content': 'SNDMAKES!'})


port = int(os.environ.get('PORT', 5000))
if __name__ == '__main__':
    app.run(port=port, host='0.0.0.0')
