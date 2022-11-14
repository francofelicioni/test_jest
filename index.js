class Room {
    constructor (name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

   isOccupied (date) {
    return date ? true : false;
   }

   occupancyPercentage (startDate, endDate) {
    let rangeDays = startDate - endDate;

   }

   static totalOccupancyPercentage (rooms, startDate, endDate) {


   }

   static availableRooms(rooms, startDate, endDate) {


   }
}


class Booking {
    constructor (name, email, check_in, check_out, discount, room) {
        this.name = name;
        this.email = email;
        this.check_in = check_in;
        this.check_out = check_out;

        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

   get fee () {
    

   }
}

module.exports = {
    Room, Booking
}