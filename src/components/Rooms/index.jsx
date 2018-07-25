import React from 'react';
import {
  startOfWeek,
  endOfWeek,
  getWeekDays,
  isSameDate,
} from '../../utils/date';
import './Rooms.css';
import uuid from 'uuid';

const Rooms = ({ rooms, bookEvent, unbookEvent }) => {
  const days = getWeekDays(startOfWeek, endOfWeek);
  const renderTableHead = () => (
    <thead>
      <tr>
        <th />
        {days.map(e => <td key={uuid()}>{e.date()}</td>)}
      </tr>
    </thead>
  );
  const renderTableBody = () => {
    return (
      <tbody>
        {rooms.map(room => (
          <tr key={uuid()}>
            <th>
              {+room.id + 1}
              {room.isVip ? ' vip' : ' standart'}
            </th>
            {days.map(day => {
              const isBooked = isSameDate(day, room.book);
              return (
                <td
                  className={isBooked ? 'booked' : 'free'}
                  room={room.id}
                  date={day.format('YYYY-MM-DD')}
                  onClick={!isBooked ? bookEvent : unbookEvent}
                  key={uuid()}
                >
                  {isBooked ? 'Booked' : 'Free'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  const renderTable = () => (
    <table>
      {renderTableHead()}
      {renderTableBody()}
    </table>
  );
  return renderTable();
};

export default Rooms;
