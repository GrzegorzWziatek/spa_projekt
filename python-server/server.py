from flask import Flask
from flask import request
from flask import Response
import json
import traceback
import logging
import datetime
from dateutil import parser
import uuid
from flask_cors import CORS
from flask import send_file


app = Flask(__name__)
#CORS(app)

import sqlite3

conn = sqlite3.connect('db.sqlite')
conn.row_factory = sqlite3.Row
USER_COOKIE = 'uid'


@app.after_request
def apply_headers(resp):
    origin = request.headers.get('Origin', None) or '*'
    resp.headers['Access-Control-Allow-Origin'] = origin
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name'
    return resp

# return json
def json_response(data, cookies=[]):
    encoded = json.dumps(data)
    resp = Response(response=encoded,
                    status=200,
                    mimetype='application/json')

    if cookies:
        domain = request.headers['Host']
        domain = '.' + domain
        domain = domain.replace(":5000", "")
        print(domain)
        for c in cookies:
            if len(c) == 3:
                resp.set_cookie(c[0], str(c[1]), expires=c[2], domain=domain)
            else:
                resp.set_cookie(c[0], str(c[1]), domain=domain)
    return resp


def get_row_dict(row):
    return dict(zip(row.keys(), row))


@app.route('/')
def main():
    return 'Hello from api'


@app.route('/user/login', methods=['POST'])
def login():
    c = conn.cursor()
    data = request.json
    email = data.get('email', '')
    password = data.get('password', '')

    c.execute('SELECT *  FROM user WHERE email = ?  AND password = ? LIMIT 1',
              [email, password])
    data = c.fetchone()

    if data and c.arraysize > 0:
        expire_date = datetime.datetime.now()
        expire_date = expire_date + datetime.timedelta(days=10)
        return json_response({'status': 'OK', 'data': {'user': data['user_id'], 'login': data['login']}},
                             [[USER_COOKIE, data['user_id'], expire_date]])

    return json_response({'status': 'ERROR', 'data': {'message': 'Incorrect email or password'}})

@app.route('/user/logout')
def logout():
    return json_response({'status': 'OK'},  [[USER_COOKIE, '-1', True]])

@app.route('/user/logged')
def is_logged():
    uid = request.cookies.get(USER_COOKIE, '-1')
    print(uid)
    logged = False
    if int(uid) > 0:
        logged = True
    return json_response({'status': 'OK', 'logged': logged})


@app.route('/user/register', methods=['POST'])
def register():
    c = conn.cursor()
    email = request.json.get('email', '')
    password = request.json.get('password', '')
    login = request.json.get('login', '')
    car = request.json.get('car', '')
    plates = request.json.get('plates', '')
    desc = request.json.get('desc', '')

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


def process_route_row(route_row):
    if route_row.get('passengers', 0) < route_row.get('max_passengers', 0):
        route_row['can_book'] = True
    else:
        route_row['can_book'] = False
    return route_row

@app.route('/routes')
def get_routes():
    c = conn.cursor()

    try:
        c.execute('SELECT *  FROM routes WHERE date("NOW") <= date(date) ORDER BY strftime("%s", date) ASC')
        data = c.fetchall()

        ret = []
        if c.arraysize > 0:
            for row in data:
                ret.append(process_route_row(get_row_dict(row)))
        return json_response({'status': 'OK', 'data': {'routes': ret}})
    except:
        return json_response({'status': 'ERROR'})


@app.route('/routes/<string:id>')
def get_route(id):
    c = conn.cursor()
    user = request.cookies.get(USER_COOKIE, 0)

    try:
        c.execute('SELECT *  FROM routes LEFT JOIN user ON (routes.user_id = user.user_id) WHERE route_id=?', (id,))
        route = c.fetchone()

        if route is not None:
            route = get_row_dict(route)
            route = process_route_row(route)
        else:
            return json_response({'status': 'ERROR', 'data': { 'message': 'There is no such route.'}})

        route_users = []
        c.execute('SELECT * FROM route_user LEFT JOIN user ON (route_user.user_id = user.user_id) WHERE route_id = ?', (id,))
        data = c.fetchall()

        if (data is not None):
            for row in data:
                tmp = get_row_dict(row)
                if int(tmp.get('user_id', 0)) == int(user):
                    route['user_joined'] = True
                tmp.pop('password', None)
                route_users.append(tmp)
        return json_response({'status': 'OK', 'data': {'route': route, 'passengers': route_users}})
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR'})


@app.route('/routes/ical/<string:id>')
def get_ical(id):
    c = conn.cursor()
    user = request.cookies.get(USER_COOKIE, 0)

    try:
        c.execute('SELECT *  FROM routes LEFT JOIN user ON (routes.user_id = user.user_id) WHERE route_id=?  ', (id))
        route = c.fetchone()

        if route is not None:
            route = process_route_row(get_row_dict(route))
            print(route)

            dt = parser.parse(route['date'])
            dt2 = dt + datetime.timedelta(hours=2)

            with open('my.ics', 'w') as f:
                f.write('BEGIN:VCALENDAR\n')
                f.write('VERSION:2.0\n')
                f.write('PRODID:-//WA//FRWEB//EN\n')
                f.write('BEGIN:VEVENT\n')

                summary = "Prejazd z carpooling"
                begin_date = dt.strftime("%Y%m%dT%H%M%S")
                end_date = dt2.strftime("%Y%m%dT%H%M%S")
                uid = str(uuid.uuid4()) + 'carpooling'
                location = route['route_from']
                organizer = route['email']
                description = 'Przejazd z:' + route['route_from'] + ' do: ' + route['route_to'] + '\nOpis: ' + route['desc_route']

                f.write('SUMMARY:%s\n' % summary)
                f.write('DTSTART:%s\n' % begin_date)
                f.write('DTEND:%s\n' % end_date)
                f.write('UID:%s\n' % uid)
                f.write('LOCATION:%s\n' % location)
                f.write('ORGANIZER:MAILTO:%s\n' % organizer)
                f.write('DESCRIPTION:%s\n' % description)
                f.write('END:VEVENT\n')
                f.write('END:VCALENDAR')

            return send_file('my.ics',
                             mimetype='text/calendar',
                             attachment_filename='event.ics',
                             as_attachment=True)

        else:
            return json_response({'status': 'ERROR', 'data': { 'message': 'There is no such route.'}})


    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR'})


@app.route('/routes/join', methods=['POST'])
def join_route():
    c = conn.cursor()
    route_id = request.json.get('route_id', '')
    user = request.cookies.get(USER_COOKIE, 0)

    # check parameters
    if route_id == '':
        return json_response({'status': 'ERROR', 'data': {'message': 'An error has occured. Are you logged in?.'}})

    # check if already signed

    check = conn.cursor()
    check.execute('SELECT * FROM route_user WHERE route_id = ? AND user_id = ? LIMIT 1', (route_id, user))
    check_data = check.fetchone()

    if check_data is not None:
        return json_response({'status': 'ERROR', 'data': {'message': 'Already joined route'}})

    #otherwise insert it to table
    try:
        c.execute('INSERT INTO route_user (route_id, user_id) values (?,?)',
                  [route_id, user])
        c.execute('UPDATE routes SET passengers = passengers + 1 WHERE route_id = ?', (route_id,))

        conn.commit()
        return json_response({'status': 'OK'})
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR', 'data': {'message': 'Database error. Please try again.'}})

@app.route('/routes/leave', methods=['POST'])
def leave_route():
    c = conn.cursor()
    route_id = request.json.get('route_id', '')
    user = request.cookies.get(USER_COOKIE, 0)

    # check parameters
    if route_id == '' or user == 0:
        return json_response({'status': 'ERROR', 'data': {'message': 'An error has occured. Are you logged in?.'}})


    # check if user is signed for route
    check = conn.cursor()
    check.execute('SELECT * FROM route_user WHERE route_id = ? AND user_id = ? LIMIT 1', (route_id, user))
    check_data = check.fetchone()

    if check_data is None:
        return json_response({'status': 'ERROR', 'data': {'message': 'You were not signed for this route'}})

    #otherwise do job
    try:
        c.execute('DELETE FROM route_user WHERE route_id = ? AND user_id =?',
                  [route_id, user])
        c.execute('UPDATE routes SET passengers = passengers - 1 WHERE route_id = ?', (route_id,))

        conn.commit()
        return json_response({'status': 'OK'})
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR', 'data': {'message': 'Database error. Please try again.'}})


@app.route('/routes/add', methods=['POST'])
def add_route():
    c = conn.cursor()
    user = request.cookies.get(USER_COOKIE, 0)
    passengers = 0
    route_from = request.json.get('route_from', '')
    route_to = request.json.get('route_to', '')
    date = request.json.get('date', '')
    max_passengers = request.json.get('max_passengers', '0')
    desc_route = request.json.get('desc_route', '')
    price = float(request.json.get('price', '0.0'))

    if route_from == '' or route_to == '' or user == 0 or len(date) == 0 or max_passengers == 0:
        return json_response({'status': 'ERROR', 'data': {'message': 'An error has occured. Check if all fields are filled.'}})

    #insert if ok
    try:
        c.execute('INSERT INTO routes (passengers, route_from, route_to, date, max_passengers, desc_route, price, user_id ) values (?,?,?,?,?,?,?,?)',
                  [passengers, route_from, route_to, date, max_passengers, desc_route, price, user])

        conn.commit()
        route_id = c.lastrowid
        return json_response({'status': 'OK', 'data': {'id': route_id, }})
    except Exception as e:
        logging.error(traceback.format_exc())
        return json_response({'status': 'ERROR', 'data': {'message': 'Database error. Please try again.'}})


@app.route('/blog')
def get_blogs():
    c = conn.cursor()

    try:
        c.execute('SELECT *  FROM blog ORDER BY blog_id DESC')
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

    c.execute('SELECT *  FROM blog  LEFT JOIN user ON (blog.user_id = user.user_id) WHERE blog_id = ?  ORDER BY date(date) DESC ', (id,))
    data = c.fetchone()

    if c.arraysize > 0:
        data = get_row_dict(data)
        data.pop('password', None)
        return json_response({'status': 'OK', 'data': data})

    return json_response({'status': 'ERROR', 'data': {'message': 'Blog post not found'}})


@app.route('/blog/save', methods=['POST'])
def save_blog():
    c = conn.cursor()
    now = datetime.datetime.now()
    title = request.json.get('title', '')
    text = request.json.get('text', '')
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
    app.run(host='0.0.0.0', port=5000)
