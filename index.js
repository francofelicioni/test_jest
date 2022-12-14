var Room = /** @class */ (function () {
    function Room(room) {
        this.name = room.name;
        this.bookings = room.bookings;
        this.rate = room.rate;
        this.discount = room.discount;
    }
    Room.prototype.dateRange = function (startDate, endDate) {
        var start = new Date(startDate);
        var end = new Date(endDate);
        var datesRange = [];
        end.setDate(end.getDate() - 1);
        while (end >= start) {
            datesRange.push(new Date(start).toISOString().slice(0, 10));
            start.setDate(start.getDate() + 1);
        }
        return datesRange;
    };
    Room.prototype.isOccupied = function (date) {
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var booking = _a[_i];
            if (date >= booking.check_in && date < booking.check_out) {
                return true;
            }
        }
        return false;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        var dates = this.dateRange(startDate, endDate);
        var occupiedDays = 0;
        var disOccupiedDays = 0;
        for (var _i = 0, dates_1 = dates; _i < dates_1.length; _i++) {
            var date = dates_1[_i];
            this.isOccupied(date) ? occupiedDays++ : disOccupiedDays++;
        }
        var totalDays = occupiedDays + disOccupiedDays;
        var occupancyPercentage = (occupiedDays * 100) / totalDays;
        return Math.round(occupancyPercentage);
    };
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var totalOccupancy = 0;
        for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
            var room = rooms_1[_i];
            totalOccupancy +=
                room.occupancyPercentage(startDate, endDate) / rooms.length;
        }
        return Math.round(totalOccupancy);
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        var availableRooms = [];
        for (var _i = 0, rooms_2 = rooms; _i < rooms_2.length; _i++) {
            var room = rooms_2[_i];
            room.occupancyPercentage(startDate, endDate) === 0
                ? availableRooms.push(room)
                : null;
        }
        return availableRooms;
    };
    return Room;
}());
var Booking = /** @class */ (function () {
    function Booking(booking) {
        this.name = booking.name;
        this.email = booking.email;
        this.check_in = booking.check_in;
        this.check_out = booking.check_out;
        this.discount = booking.discount;
        this.room = booking.room;
    }
    Booking.prototype.getFee = function () {
        var totalDiscount = this.room.discount + this.discount;
        var finalPrice = this.room.rate;
        if (totalDiscount < 100 && totalDiscount > 0) {
            finalPrice = this.room.rate - this.room.rate * (totalDiscount / 100);
        }
        return Math.round(finalPrice);
    };
    return Booking;
}());
