import React from 'react';
import {useMutation} from 'react-query';
import {makeReservation} from '../API';
import './Reservation.css';

function convertTo24HourFormat(time) {
    var addHour = 0;
    if (time.includes("PM"))
        addHour = 12;
    var t = time.replace(/[AM|PM|am|pm|\s]/g,""); //remove all space, AM, PM from time
    var tmp = t.split(":");
    var hour = parseInt(tmp[0]) % 12 + addHour;

    return hour + ":" + tmp[1];
}

function Reservation({reservations}) {
    const mutation = useMutation(makeReservation, {
        onSuccess: (data) => {
            console.log("Reservation success", data);
        }
    });
    const {user_id, room_id, date, times} = reservations;
    //times should be an array of object with format {start, end}
    const conformTimes = times.map((t) => {
        var start = convertTo24HourFormat(t.start);
        var end = convertTo24HourFormat(t.end);
        return {start: date + " " + start,
                end: date + " " + end}
    });
    const data = {
        user_id: 1,
        room_id: 2,
        time_blocks:conformTimes,
    };

    return (
        <button onClick={() => mutation.mutate(data)}> Reservation</button>
    )
}

export default Reservation;
