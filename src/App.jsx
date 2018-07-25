import React, { Component } from 'react';
import './App.css';
import Rooms from './components/Rooms/';
import { price } from './data/rooms';
import { daysBetween, getWeekDaysFromString } from './utils/date';
import { getItems, addItems } from './api';
import BookingForm from './components/BookingForm';
import Modal from './components/Modal';

class App extends Component {
  state = {
    showBookingForm: false,
    unbookingRoomId: null,
    unbookingRoomDate: null,
    bookingRoomId: null,
    bookingStartDate: null,
    bookingEndDate: null,
    daysBetween: null,
  };
  componentDidMount() {
    getItems().then(rooms => this.setState({ rooms, price }));
  }
  bookRoomEvent = ({ target: { attributes } }) => {
    this.setState(state => ({
      ...state,
      bookingRoomId: attributes.room.value,
      bookingStartDate: attributes.date.value,
      showBookingForm: true,
      showModal: false,
    }));
  };
  unbookRoomEvent = ({ target: { attributes } }) => {
    this.setState(state => ({
      ...state,
      showModal: true,
      unbookingRoomId: attributes.room.value,
      unbookingRoomDate: attributes.date.value,
    }));
  };
  confirmUnbook = () => {
    this.unbookRoom();
  };
  declineUnbook = () => {
    this.setState(state => ({ ...state, showModal: false }));
  };
  unbookRoom = () => {
    const unbookDate = this.state.unbookingRoomDate;
    const unbookRoom = +this.state.unbookingRoomId;
    const newBook = [
      ...this.state.rooms[unbookRoom].book.filter(date => date !== unbookDate),
    ];
    const newRooms = [
      ...this.state.rooms.slice(0, unbookRoom),
      {
        ...this.state.rooms[unbookRoom],
        book: newBook,
      },
      ...this.state.rooms.slice(unbookRoom + 1),
    ];

    this.setState(state => ({
      ...state,
      rooms: newRooms,
      unbookingRoomDate: null,
      unbookingRoomId: null,
      showModal: false,
    }));
  };
  bookRoom = event => {
    event.preventDefault();
    const compareDates = daysBetween(
      this.state.bookingEndDate,
      this.state.bookingStartDate,
    );
    if (compareDates < 0) {
      return;
    }
    const id = +this.state.bookingRoomId;

    const bookedDays = getWeekDaysFromString(
      this.state.bookingStartDate,
      this.state.bookingEndDate,
    );
    const currentBook = [...this.state.rooms[id].book, ...bookedDays];
    const newRooms = [
      ...this.state.rooms.slice(0, id),
      {
        ...this.state.rooms[id],
        book: currentBook,
      },
      ...this.state.rooms.slice(id + 1),
    ];
    addItems(newRooms).then(rooms =>
      this.setState(state => ({
        ...state,
        rooms: rooms,
        showBookingForm: false,
        bookingStartDate: null,
        bookingRoomId: null,
        bookingEndDate: null,
      })),
    );
  };
  setBookingRoomStartDate = ({ target: { value } }) => {
    const days = daysBetween(this.state.bookingEndDate, value);
    this.setState(state => ({
      ...state,
      bookingStartDate: value,
      daysBetween: days,
    }));
  };
  setBookingRoomEndDate = ({ target: { value } }) => {
    const days = daysBetween(value, this.state.bookingStartDate);
    this.setState(state => ({
      ...state,
      bookingEndDate: value,
      daysBetween: days,
    }));
  };
  render() {
    return (
      <div>
        {this.state.rooms ? (
          <Rooms
            rooms={this.state.rooms}
            bookEvent={this.bookRoomEvent}
            unbookEvent={this.unbookRoomEvent}
          />
        ) : null}
        {this.state.showBookingForm ? (
          <BookingForm
            rooms={this.state.rooms}
            price={this.state.price}
            daysBetween={this.state.daysBetween}
            bookingRoomId={this.state.bookingRoomId}
            startDate={this.state.bookingStartDate}
            endDate={this.state.bookingEndDate}
            setStart={this.setBookingRoomStartDate}
            setEnd={this.setBookingRoomEndDate}
            bookRoom={this.bookRoom}
          />
        ) : null}
        {this.state.showModal ? (
          <Modal
            room={this.state.unbookingRoomId}
            date={this.state.unbookingRoomDate}
            confirmUnbook={this.confirmUnbook}
            declineUnbook={this.declineUnbook}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
