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

@app.route('/directory')
def directory():
    with open('static/new_sample.json') as datafile:
        data = json.load(datafile)
        people = [process_data_for_context(person) for person in data['people']]
        return render_template('directory.html', **{
            'people': people
        })

def process_data_for_context(person):
    person['skills']['all'] = person['skills']['front_end'] + person['skills']['back_end'] + person['skills']['editorial']
    return person

def filter(person, directory):
    pass


port = int(os.environ.get('PORT', 5000))
if __name__ == '__main__':
    app.run(port=port, host='0.0.0.0')