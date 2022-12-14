interface RoomInterface {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
}

interface BookingInterface {
  name: string;
  email: string;
  check_in: string;
  check_out: string;
  discount: number;
  room: Room;
}

class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(room: RoomInterface) {
    this.name = room.name;
    this.bookings = room.bookings;
    this.rate = room.rate;
    this.discount = room.discount;
  }

  dateRange(startDate: string, endDate: string) {
    const start: Date = new Date(startDate);
    const end: Date = new Date(endDate);
    const datesRange: string[] = [];

    end.setDate(end.getDate() - 1);

    while (end >= start) {
      datesRange.push(new Date(start).toISOString().slice(0, 10));
      start.setDate(start.getDate() + 1);
    }
    return datesRange;
  }

  isOccupied(date: string): boolean {
    for (const booking of this.bookings) {
      if (date >= booking.check_in && date < booking.check_out) {
        return true;
      }
    }
    return false;
  }

  occupancyPercentage(startDate: string, endDate: string): number {
    const dates: string[] = this.dateRange(startDate, endDate);

    let occupiedDays: number = 0;
    let disOccupiedDays: number = 0;

    for (const date of dates) {
      this.isOccupied(date) ? occupiedDays++ : disOccupiedDays++;
    }

    let totalDays: number = occupiedDays + disOccupiedDays;
    let occupancyPercentage: number = (occupiedDays * 100) / totalDays;

    return Math.round(occupancyPercentage);
  }

  static totalOccupancyPercentage(
    rooms: Room[],
    startDate: string,
    endDate: string
  ): number {
    let totalOccupancy: number = 0;

    for (const room of rooms) {
      totalOccupancy +=
        room.occupancyPercentage(startDate, endDate) / rooms.length;
    }
    return Math.round(totalOccupancy);
  }

  static availableRooms(
    rooms: Room[],
    startDate: string,
    endDate: string
  ): Room[] {
    const availableRooms: Room[] = [];
    for (const room of rooms) {
      room.occupancyPercentage(startDate, endDate) === 0
        ? availableRooms.push(room)
        : null;
    }
    return availableRooms;
  }
}

class Booking {
  name: string;
  email: string;
  check_in: string;
  check_out: string;
  discount: number;
  room: Room;

  constructor(booking: BookingInterface) {
    this.name = booking.name;
    this.email = booking.email;
    this.check_in = booking.check_in;
    this.check_out = booking.check_out;
    this.discount = booking.discount;
    this.room = booking.room;
  }

  getFee(): number {
    let totalDiscount: number = this.room.discount + this.discount;

    let finalPrice: number = this.room.rate;

    if (totalDiscount < 100 && totalDiscount > 0) {
      finalPrice = this.room.rate - this.room.rate * (totalDiscount / 100);
    }

    return Math.round(finalPrice);
  }
}


export {Room, Booking};