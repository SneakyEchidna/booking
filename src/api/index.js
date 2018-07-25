import * as demoData from '../data/rooms';
const LSDATAKEY = 'rooms';

let rooms = localStorage.getItem(LSDATAKEY);
try {
  rooms = JSON.parse(rooms);
} catch (e) {
  console.log('json parse error');
}
if (!Array.isArray(rooms)) {
  rooms = demoData.rooms;
}

function saveItems(rooms) {
  localStorage.setItem(LSDATAKEY, JSON.stringify(rooms));
}

export const getItems = () =>
  new Promise(resolve => setTimeout(resolve, 1000, [...rooms]));

export const addItems = newRooms => {
  rooms = [...newRooms];
  saveItems(rooms);
  return new Promise(resolve => setTimeout(resolve, 1000, rooms));
};
