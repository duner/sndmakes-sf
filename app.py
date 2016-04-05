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

        # Filtering
        filtered = False
        filter_noun = False
        filter_verb = False

        filter_type = request.args.get('filter')
        filter_params = request.args.get('sel')
        filter_full_param = request.args.get('fullsel')

        if filter_type is not None:
            filtered = True

            if filter_type == 'networking':
                filter_verb = 'network with'
            if filter_type == 'skills':
                filter_verb = 'learn about'

            filter_noun = filter_full_param if (filter_full_param is not None) else filter_params

            people = filter(people, filter_type, filter_params)

        return render_template('directory.html', **{
            'people': people,
            'filtered': filtered,
            'filter_verb': filter_verb,
            'filter_noun': filter_noun
        })

def process_data_for_context(person):
    person['skills']['all'] = person['skills']['front_end'] + person['skills']['back_end'] + person['skills']['editorial']
    return person

def filter(directory, filter_type, filter_param):
    print filter_type, filter_param
    results = []
    if filter_type == 'skills':
        results = [p for p in directory if p['skills'][filter_param]]
    if filter_type == 'networking':
        results = [p for p in directory if p['networking'][filter_param]]
    return results


port = int(os.environ.get('PORT', 5000))
if __name__ == '__main__':
    app.run(port=port, host='0.0.0.0')