import React, { Component } from 'react';
import { price } from '../data/rooms';

class BookingForm extends Component {
  state = {};
  componentDidMount() {
    this.setState({ price });
  }
  getPrice() {
    const vipCheck = () => {
      return this.props.rooms[this.props.bookingRoomId].isVip;
    };
    if (vipCheck()) {
      return this.props.price.vip * this.getDays();
    } else return this.props.price.normal * this.getDays();
  }
  getDays() {
    if (this.props.daysBetween < 0) {
      return null;
    }
    if (this.props.daysBetween === 0) {
      return 1;
    }
    if (this.props.daysBetween > 0) {
      return +this.props.daysBetween + 1;
    }
  }
  render() {
    return (
      <form action="">
        <input
          type="date"
          name="startDate"
          id="startDate"
          ref={this.startDate}
          defaultValue={this.props.startDate}
          onChange={this.props.setStart}
        />
        <input
          type="date"
          name="endDate"
          id="endDate"
          ref={this.endDate}
          onChange={this.props.setEnd}
        />
        {this.getDays() ? (
          <div>
            <p>{this.getDays()} days</p>
            <p>Price: {this.getPrice()}</p>
            <button type="submit" onClick={this.props.bookRoom}>
              Book room
            </button>
          </div>
        ) : null}
      </form>
    );
  }
}
export default BookingForm;
