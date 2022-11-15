class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name; // String
    this.bookings = bookings; // Array of booking objects
    this.rate = rate; // Int price in cents
    this.discount = discount; // Int percentage
  }

  dateRange(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let dateArray = [];

    while (start <= end) {
      dateArray.push(new Date(start).toISOString().slice(0, 10));
      start.setDate(start.getDate() + 1);
    }

    return dateArray;
  }

  isOccupied(date) {
    for (const booking of this.bookings) {
      if (date >= booking.checkIn && date < booking.checkOut) {
        return true;
      }
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
  
  }

  static availableRooms(rooms, startDate, endDate) {
   
  }
}

class Booking {
  constructor(name, email, check_in, check_out, discount, room) {
    this.name = name; // String
    this.email = email; // String
    this.check_in = check_in; // Date
    this.check_out = check_out; // Date
    this.discount = discount; // Int percentage
    this.room = room; //Room object
  }

  getFee() {
    const price = this.room.rate;
    const discountRoom = (price * this.room.discount) / 100;
    const discountBooking = (price * this.discount) / 100;

    if (discountBooking + discountRoom < price) {
      return Math.round(price - (discountBooking + discountRoom));
    } else {
      return 0;
    }
  }
}

module.exports = {
  Room,
  Booking,
};
