const {
    Room,
    Booking, 
    totalOccupancyPercentage,
    availableRooms,
} = require ('./index');


// Test isOccupied
test ("room is occupied (true)" , ()=> {
    const suite = new Room ("Suite", [], 500, 25);

    const booking1 = new Booking ('Estefania','estefania@gmail.com','2022-03-15','2022-03-30', 30, suite);
    const booking2 = new Booking ('Maria','maria@gmail.com','2022-04-01','2022-04-10', 20, suite);

    suite.bookings = [booking1, booking2];

    expect (suite.isOccupied ('2022-04-05')).toBe(true);
})


test ("room is occupied (false)", ()=> {
    const suite = new Room ("Suite", [], 500, 25);

    const booking1 = new Booking ('Estefania','estefania@gmail.com','2022-03-15','2022-03-30', 30, suite);
    const booking2 = new Booking ('Maria','maria@gmail.com','2022-04-01','2022-04-10', 20, suite);

    suite.bookings = [booking1, booking2];

    expect (suite.isOccupied ('2022-05-01')).toBe(false);

});


// Test occupancyPercentage
test ("occupancyPercentage", ()=> {
    const single = new Room ("Single", [], 250, 10);

    const booking1 = new Booking ('Pablo','pablo@gmail.com','2022-06-04','2022-06-10', 20, single);
    const booking2 = new Booking ('Matias','matias@gmail.com','2022-07-01','2022-07-15', 10, single);

    single.bookins = [booking1, booking2];

    expect (single.occupancyPercentage('2022-06-03', '2022-06-10')).toBe(7);
});


test ("occupancyPercentage", ()=> {
    const single = new Room ("Single", [], 250, 10);

    const booking1 = new Booking ('Pablo','pablo@gmail.com','2022-06-04','2022-06-10', 20, single);
    const booking2 = new Booking ('Matias','matias@gmail.com','2022-07-01','2022-07-15', 10, single);

    single.bookins = [booking1, booking2];

    expect (single.occupancyPercentage('2022-07-01', '2022-07-15')).toBe(15);
});


// Test getFee
test ('getFee(), discount applied', ()=> {
    const single = new Room ("Single", [], 250, 10);

    const booking = new Booking ('Pablo','pablo@gmail.com','2022-06-04','2022-06-10', 20, single);

    single.bookings = [ booking ];

    expect (booking.getFee()).toBe(175)

});

test ('getFee(), no discount', ()=> {
    const single = new Room ("Single", [], 250, 0);

    const booking = new Booking ('Pablo','pablo@gmail.com','2022-06-04','2022-06-10', 0, single);

    single.bookings = [ booking ];

    expect (booking.getFee()).toBe(250)

});


test ('getFee(), discount bigger than 100%', ()=> {
    const single = new Room ("Single", [], 250, 60);

    const booking = new Booking ('Pablo','pablo@gmail.com','2022-06-04','2022-06-10', 50, single);

    single.bookings = [ booking ];

    expect (booking.getFee()).toBe(0)
});


// Test occupancyPercentage
test ('occupancyPercentage()', () => {
    const double1 = new Room ('Double', [], 400, 20);
    const double2 = new Room ('Double', [], 500, 10);
    const double3 = new Room ('Double', [], 600, 5);

    const booking1 = new Booking ('Manuela','manuela@gmail.com','2022-08-01','2022-08-10', 10, double);
    const booking2 = new Booking ('Sol','sol@gmail.com','2022-08-20','2022-08-30', 15, double);
    const booking3 = new Booking ('Carlos','carlos@gmail.com','2022-08-01','2022-08-15', 20, double);

    double1.bookings = [booking1];
    double2.bookings = [booking2];
    double3.bookings = [booking3];

    let startDate = "2022-01-05";
    let endDate = "2022-01-25";
})


// Test totalOccupancyPercentage



// Test availableRooms