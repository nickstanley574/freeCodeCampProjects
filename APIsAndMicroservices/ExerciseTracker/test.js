const assert = require('assert');
const request = require("request")

const port = process.argv[2]

localUrl = `http://0.0.0.0:${port}`



console.log(" => I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and <code>_id</code>.")
var username = 'test_00'
request.post(
    `${localUrl}/api/exercise/new-user`, { json: { username: username } },
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            assert(body.hasOwnProperty('username'))
            assert(body.hasOwnProperty('_id'))
            assert.equal(body.username, username)
        } else {
            console.log("ERROR!")
        }
    }
);



console.log(" => I can get an array of all users by getting api/exercise/users with the same info as when creating a user.")
request.post(`${localUrl}/api/exercise/new-user`, { json: { username: "test_01" } })
request.post(`${localUrl}/api/exercise/new-user`, { json: { username: "test_02" } })

request.get(`${localUrl}/api/exercise/users`, function(err, res, body) {
    let json = JSON.parse(body)
    assert.equal(json.length, 3)

    JSON.parse(body).forEach(function(value) {
        request.post(`${localUrl}/api/exercise/delete-user`, { json: { userId: value._id } })
    });
})


//"testString": "async getUserInput => { const url = getUserInput('url'); const res = await fetch(url + '/api/exercise/new-user', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `username=fcc_test_${Date.now()}`.substr(0, 29) });\nif (res.ok) { const { _id, username } = await res.json(); const expected = { username, description: 'test', duration: 60, _id, date: 'Mon Jan 01 1990' };\nconst addRes = await fetch(url + '/api/exercise/add', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}&date=1990-01-01` }); if (addRes.ok) { const actual = await addRes.json(); assert.deepEqual(actual, expected); } else { throw new Error(`${addRes.status} ${addRes.statusText}`); } } else { throw new Error(`${res.status} ${res.statusText}`); } } "

console.log(" => I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. App will return the user object with the exercise fields added.")


console.log(" => I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). App will return the user object with added array log and count (total exercise count).")

// "testString": "async getUserInput => { const url = getUserInput('url'); const res = await fetch(url + '/api/exercise/new-user', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `username=fcc_test_${Date.now()}`.substr(0, 29) });\nif (res.ok) { const { _id, username } = await res.json(); const expected = { username, description: 'test', duration: 60, _id, date: new Date().toDateString() };\nconst addRes = await fetch(url + '/api/exercise/add', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}` }); if (addRes.ok) { const logRes = await fetch(url + `/api/exercise/log?userId=${_id}`); if (logRes.ok) { const { log } = await logRes.json(); assert.isArray(log); assert.equal(1, log.length); } else { throw new Error(`${logRes.status} ${logRes.statusText}`); } } else { throw new Error(`${addRes.status} ${addRes.statusText}`); } } else { throw new Error(`${res.status} ${res.statusText}`); } } "

console.log(" => I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int).")

// "testString": "async getUserInput => { const url = getUserInput('url'); const res = await fetch(url + '/api/exercise/new-user', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `username=fcc_test_${Date.now()}`.substr(0, 29) });\nif (res.ok) { const { _id, username } = await res.json(); const expected = { username, description: 'test', duration: 60, _id, date: new Date().toDateString() };\nconst addExerciseRes = await fetch(url + '/api/exercise/add', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}&date=1990-01-01` }); const addExerciseTwoRes = await fetch(url + '/api/exercise/add', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `userId=${_id}&description=${expected.description}&duration=${expected.duration}&date=1990-01-02` }); if (addExerciseRes.ok && addExerciseTwoRes.ok) { const logRes = await fetch( url + `/api/exercise/log?userId=${_id}&from=1989-12-31&to=1990-01-03` ); if (logRes.ok) { const { log } = await logRes.json(); assert.isArray(log); assert.equal(2, log.length); } else { throw new Error(`${logRes.status} ${logRes.statusText}`); }\nconst limitRes = await fetch( url + `/api/exercise/log?userId=${_id}&limit=1` ); if (limitRes.ok) { const { log } = await limitRes.json(); assert.isArray(log); assert.equal(1, log.length); } else { throw new Error(`${limitRes.status} ${limitRes.statusText}`); } } else { throw new Error(`${res.status} ${res.statusText}`); } } else { throw new Error(`${res.status} ${res.statusText}`); } } "