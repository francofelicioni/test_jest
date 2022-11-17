class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name; // String
    this.bookings = bookings; // Array of booking objects
    this.rate = rate; // Int price in cents
    this.discount = discount; // Int percentage
  }

  dateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const datesRange = [];

    end.setDate(end.getDate() - 1);

    while (end >= start) {
      datesRange.push(new Date(start).toISOString().slice(0, 10));
      start.setDate(start.getDate() + 1);
    }
    return datesRange;
  }

  isOccupied(date) {
    for (const booking of this.bookings) {
      if (date >= booking.check_in && date < booking.check_out) {
        return true;
      }
    }
    return false;
  }

  occupancyPercentage(startDate, endDate) {
    const dates = this.dateRange(startDate, endDate);

    let occupiedDays = 0;
    let disOccupiedDays = 0;

    for (const date of dates) {
      this.isOccupied(date) ? occupiedDays++ : disOccupiedDays++;
    }

    let totalDays = occupiedDays + disOccupiedDays;
    let occupancyPercentage = (occupiedDays * 100) / totalDays;

    return Math.round(occupancyPercentage);
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    let totalOccupancy = 0;

    for (const room of rooms) {
      totalOccupancy +=
        room.occupancyPercentage(startDate, endDate) / rooms.length;
    }
    return Math.round(totalOccupancy);
  }

  static availableRooms(rooms, startDate, endDate) {
    const availableRooms = [];
    for (const room of rooms) {
      room.occupancyPercentage(startDate, endDate) === 0
      ? availableRooms.push (room)
      : null;
    }
    return availableRooms;
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
    let totalDiscount = this.room.discount + this.discount;

    let finalPrice = this.room.rate;

    if (totalDiscount < 100 && totalDiscount > 0) {
     finalPrice = this.room.rate - (this.room.rate * (totalDiscount / 100));
    }

    return Math.round(finalPrice);
  }
}

module.exports = {
  Room,
  Booking,
};
