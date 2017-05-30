from flask import Flask
from flask import request
from flask import Response
import json
import traceback
import logging
import datetime


app = Flask(__name__)

import sqlite3

conn = sqlite3.connect('db.sqlite')
conn.row_factory = sqlite3.Row
USER_COOKIE = 'uid'


# return json
def json_response(data, cookies=[]):
    encoded = json.dumps(data)
    resp = Response(response=encoded,
                    status=200,
                    mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    if cookies:
        for c in cookies:
            print(c)
            resp.set_cookie(c[0], str(c[1]))
    return resp


def get_row_dict(row):
    return dict(zip(row.keys(), row))


@app.route('/')
def main():
    return 'Hello from api'


@app.route('/user/login')
def login():
    c = conn.cursor()
    email = request.values.get('email', '')
    password = request.values.get('password', '')

    c.execute('SELECT *  FROM user WHERE email = ?  AND password = ? LIMIT 1',
              [email, password])
    data = c.fetchone()

    if data and c.arraysize > 0:
        return json_response({'status': 'OK', 'data': {'user': data['user_id'], 'login': data['login']}},
                             [[USER_COOKIE, data['user_id']]])

    return json_response({'status': 'ERROR', 'data': {'message': 'Incorrect email or password'}})


@app.route('/register')
def register():
    c = conn.cursor()
    email = request.values.get('email', '')
    password = request.values.get('password', '')
    login = request.values.get('login', '')
    car = request.values.get('car', '')
    plates = request.values.get('plates', '')
    desc = request.values.get('desc', '')

    check_email = conn.cursor()
    check_email.execute('SELECT * FROM user WHERE email = ? LIMIT 1', (email,))
    check_email_data = check_email.fetchone()

    # check if email exists
    if check_email_data:
        return json_response({'status': 'ERROR', 'data': {'message': 'Email already exists.'}})

    #otherwise insert it to table
    try:
        c.execute('INSERT INTO user (login, password, email, car, plates, desc) values (?,?,?,?,?,?)',
                  [login, password, email, car, plates, desc])

        conn.commit()
        uid = c.lastrowid
        return json_response({'status': 'OK', 'data': {'user': uid, 'login': login}},  [[USER_COOKIE, uid]])
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR', 'data': {'message': 'Database error. Please try again.'}})


@app.route('/user/get/<string:id>')
def get_user(id):
    c = conn.cursor()

    c.execute('SELECT *  FROM user WHERE user_id = ?', (id,))
    data = c.fetchone()

    if c.arraysize > 0:
        data = get_row_dict(data)
        data.pop('password', None)
        return json_response({'status': 'OK', 'data': data})

    return json_response({'status': 'ERROR', 'data': {'message': 'User not found'}})


@app.route('/routes')
def get_routes():
    c = conn.cursor()

    try:
        c.execute('SELECT *  FROM routes WHERE date("NOW") <= date(date) AND passengers < max_passengers')
        data = c.fetchall()

        ret = []
        if c.arraysize > 0:
            for row in data:
                ret.append(get_row_dict(row))
        return json_response({'status': 'OK', 'data': {'routes': ret}})
    except:
        return json_response({'status': 'ERROR'})

@app.route('/blog')
def get_blogs():
    c = conn.cursor()

    try:
        c.execute('SELECT *  FROM blog ORDER BY date(DATE) DESC')
        data = c.fetchall()

        ret = []
        if c.arraysize > 0:
            for row in data:
                ret.append(get_row_dict(row))
        return json_response({'status': 'OK', 'data': {'posts': ret}})
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR'})

@app.route('/blog/post/<string:id>')
def get_post(id):
    c = conn.cursor()

    c.execute('SELECT *  FROM blog WHERE blog_id = ?', (id,))
    data = c.fetchone()

    if c.arraysize > 0:
        data = get_row_dict(data)
        data.pop('password', None)
        return json_response({'status': 'OK', 'data': data})

    return json_response({'status': 'ERROR', 'data': {'message': 'Blog post not found'}})


@app.route('/blog/save')
def save_blog():
    c = conn.cursor()
    now = datetime.datetime.now()
    title = request.values.get('title', '')
    text = request.values.get('text', '')
    date = now.strftime("%Y-%m-%d %H:%M")
    user = request.cookies.get(USER_COOKIE, 0)

    if title == '' or text == '' or user == 0:
        return json_response({'status': 'ERROR', 'data': {'message': 'An error has occured. Empty title or text.'}})

    #otherwise insert it to table
    try:
        c.execute('INSERT INTO blog (title, text, date, user_id) values (?,?,?,?)',
                  [title, text, date, user])

        conn.commit()
        blog_id = c.lastrowid
        return json_response({'status': 'OK', 'data': {'id': blog_id, }})
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR', 'data': {'message': 'Database error. Please try again.'}})


if __name__ == '__main__':
    app.run()
