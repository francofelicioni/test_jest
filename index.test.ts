import { Room, Booking } from "./index.js";

// isOccupied Tests

const testRoom: Room = new Room({
  name: "Suite",
  bookings: [],
  rate: 500,
  discount: 10,
});

const testBooking1: Booking = new Booking({
  name: "Martina",
  email: "martina@gmail.com",
  check_in: "2022-01-01",
  check_out: "2022-01-15",
  discount: 20,
  room: testRoom,
});

const testBooking2: Booking = new Booking({
  name: "Josefina",
  email: "josefa@gmail.com",
  check_in: "2022-02-16",
  check_out: "2022-02-30",
  discount: 10,
  room: testRoom,
});

test("Room is occupied, true", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  const booking2: Booking = new Booking(testBooking2);

  room.bookings = [booking1, booking2];

  expect(room.isOccupied("2022-01-01")).toBe(true);
});

test("Room is occupied, true", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.isOccupied("2022-02-14")).toBe(true);
});

test("Room is occupied, false", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.isOccupied("2022-01-15")).toBe(false);
});

test("Room is occupied, false", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.isOccupied("2022-01-20")).toBe(false);
});

// occupancyPercentage Tests

test("occupancyPercentage, 100%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.occupancyPercentage("2022-05-01", "2022-05-10")).toEqual(100);
});

test("occupancyPercentage, 50%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.occupancyPercentage("2022-05-01", "2022-05-31")).toBe(50);
});

test("occupancyPercentage, 45%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(
    room.occupancyPercentage("2022-05-01", "2022-05-31")
  ).toBeLessThanOrEqual(47);
});

test("occupancyPercentage, 100%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.occupancyPercentage("2022-05-01", "2022-05-02")).toBe(100);
});

test("occupancyPercentage, 7%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(
    room.occupancyPercentage("2022-01-01", "2022-01-15")
  ).toBeGreaterThanOrEqual(7);
});

test("occupancyPercentage, 36%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.occupancyPercentage("2022-01-01", "2022-01-15")).toBe(36);
});

test("occupancyPercentage, 0%", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(room.occupancyPercentage("2022-01-01", "2022-01-15")).toBe(0);
});

// availableRooms Tests

test("availableRooms, room4, room5", () => {
  const room1 = new Room({
    ...testRoom,
    name: "Double Deluxe",
    rate: 300,
    discount: 10,
  });
  const room2 = new Room({
    ...testRoom,
    name: "Double Deluxe",
    rate: 200,
    discount: 10,
  });

  const booking1 = new Booking({
    ...testBooking1,
    check_in: "2022-01-01",
    check_out: "2022-01-03",
    discount: 10,
    room: room1,
  });
  const booking2 = new Booking({
    ...testBooking1,
    check_in: "2022-01-15",
    check_out: "2022-01-30",
    discount: 10,
    room: room1,
  });
  const booking3 = new Booking({
    ...testBooking1,
    check_in: "2022-02-01",
    check_out: "2022-02-20",
    discount: 10,
    room: room2,
  });
  const booking4 = new Booking({
    ...testBooking1,
    check_in: "2022-02-01",
    check_out: "2022-02-30",
    discount: 10,
    room: room2,
  });
  const booking5 = new Booking({
    ...testBooking1,
    check_in: "2022-03-01",
    check_out: "2022-01-07",
    discount: 10,
    room: room2,
  });

  room1.bookings = [booking1, booking2, booking3];
  room2.bookings = [booking4, booking5];

  const totalRooms = [room1, room2];

  expect(
    Room.availableRooms(totalRooms, "2022-01-01", "2022-01-15")
  ).toStrictEqual([room1]);
});

// getFee Tests
test("getFee, 20% discount", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(booking1.getFee()).toBe(240);
});

test("getFee, 0% discount", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(booking1.getFee()).toBe(300);
});

test("getFee, 10% discount", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(booking1.getFee()).toBe(270);
});

test("getFee, 10% discount", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(booking1.getFee()).toBe(270);
});

test("getFee, 99% discount", () => {
  const room: Room = new Room(testRoom);
  const booking1: Booking = new Booking(testBooking1);
  room.bookings = [booking1];

  expect(booking1.getFee()).toBe(3);
});
