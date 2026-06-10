export interface Voyage {
  id: string;
  operatorName: string;
  operatorLogo: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number[]; // e.g. [1, 2, 3, 5, 8, ...]
  rating: number;
  features: string[]; // e.g. ['Wi-Fi', 'AC', 'USB charging', 'Leather Seats']
  busType?: 'toyota' | 'hiace';
}

export interface Ticket {
  id: string;
  voyageId: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  seatNumber: string;
  passengerName: string;
  passengerPhone: string;
  passengerEmail: string;
  price: number;
  qrCodeData: string;
  status: 'active' | 'completed' | 'cancelled';
  operatorName: string;
  bookingTime: string;
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  travelHistoryCount: number;
}

export interface UserNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

export interface RouteOption {
  from: string;
  to: string;
  duration: string;
  price: number;
  image: string;
}
