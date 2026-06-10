import { Voyage, RouteOption, Ticket, UserNotification } from './types';

export const POPULAR_ROUTES: RouteOption[] = [
  {
    from: 'Hargeisa',
    to: 'Berbera',
    duration: '2h 45m',
    price: 15,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400'
  },
  {
    from: 'Hargeisa',
    to: 'Borama',
    duration: '2h 15m',
    price: 12,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=400'
  },
  {
    from: 'Berbera',
    to: 'Burco',
    duration: '2h 30m',
    price: 14,
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=400'
  },
  {
    from: 'Bosaso',
    to: 'Galkayo',
    duration: '8h 30m',
    price: 25,
    image: 'https://images.unsplash.com/photo-1562620619-91300965c719?auto=format&fit=crop&q=80&w=400'
  },
  {
    from: 'Garowe',
    to: 'Galkayo',
    duration: '3h 15m',
    price: 15,
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&q=80&w=400'
  },
  {
    from: 'Hargeisa',
    to: 'Garowe',
    duration: '10h 30m',
    price: 35,
    image: 'https://images.unsplash.com/photo-1494515426402-f1980ae7a41d?auto=format&fit=crop&q=80&w=400'
  }
];

export const MOCK_VOYAGES: Voyage[] = [
  {
    id: 'v1',
    operatorName: 'Somaliland Express',
    operatorLogo: '🚌',
    departureCity: 'Hargeisa',
    arrivalCity: 'Berbera',
    departureTime: '06:30 AM',
    arrivalTime: '09:15 AM',
    duration: '2h 45m',
    price: 15,
    availableSeats: [1, 2, 3, 5, 8, 9, 10, 11, 14, 15, 18, 19, 20, 24, 25, 29, 30],
    rating: 4.8,
    features: ['Wi-Fi', 'AC', 'USB charger', 'Free snack'],
    busType: 'toyota'
  },
  {
    id: 'v2',
    operatorName: 'Magaalo Gold Bus',
    operatorLogo: '⭐',
    departureCity: 'Hargeisa',
    arrivalCity: 'Berbera',
    departureTime: '08:00 AM',
    arrivalTime: '10:45 AM',
    duration: '2h 45m',
    price: 18,
    availableSeats: [4, 6, 7, 12, 13, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28],
    rating: 4.9,
    features: ['AC', 'Leather Seats', 'USB charger', 'Water bottle'],
    busType: 'toyota'
  },
  {
    id: 'v3',
    operatorName: 'Sahil Premium VIP',
    operatorLogo: '💎',
    departureCity: 'Hargeisa',
    arrivalCity: 'Berbera',
    departureTime: '01:30 PM',
    arrivalTime: '04:15 PM',
    duration: '2h 45m',
    price: 22,
    availableSeats: [2, 3, 5, 6, 9, 10, 15, 16, 17, 22, 23, 27, 28],
    rating: 5.0,
    features: ['Wi-Fi', 'AC', 'USB charger', 'Reclining seats', 'Buffet drink'],
    busType: 'toyota'
  },
  {
    id: 'v4',
    operatorName: 'Nasiye Transit',
    operatorLogo: '🚐',
    departureCity: 'Hargeisa',
    arrivalCity: 'Berbera',
    departureTime: '04:00 PM',
    arrivalTime: '06:45 PM',
    duration: '2h 45m',
    price: 14,
    availableSeats: [1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15],
    rating: 4.2,
    features: ['AC', 'USB charger'],
    busType: 'hiace'
  },
  // Bosaso to Galkayo
  {
    id: 'v5',
    operatorName: 'Puntland Express',
    operatorLogo: '🚍',
    departureCity: 'Bosaso',
    arrivalCity: 'Galkayo',
    departureTime: '06:00 AM',
    arrivalTime: '02:30 PM',
    duration: '8h 30m',
    price: 25,
    availableSeats: [5, 6, 12, 17, 18, 22, 25, 26, 27, 28, 29, 30],
    rating: 4.5,
    features: ['Wi-Fi', 'AC', 'Water bottle'],
    busType: 'toyota'
  },
  // Borama to Hargeisa
  {
    id: 'v6',
    operatorName: 'Awdal Express',
    operatorLogo: '🚌',
    departureCity: 'Hargeisa',
    arrivalCity: 'Borama',
    departureTime: '09:00 AM',
    arrivalTime: '11:15 AM',
    duration: '2h 15m',
    price: 12,
    availableSeats: [2, 4, 5, 7, 9, 11, 13, 15],
    rating: 4.4,
    features: ['AC', 'USB charger'],
    busType: 'hiace'
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TKT-983021',
    voyageId: 'v1',
    departureCity: 'Berbera',
    arrivalCity: 'Hargeisa',
    departureTime: '02:00 PM',
    arrivalTime: '04:45 PM',
    date: '12 May, 2026',
    seatNumber: '08',
    passengerName: 'Sakariye Hamud',
    passengerPhone: '+252 63 487234',
    passengerEmail: 'sakariyehamud@gmail.com',
    price: 15,
    qrCodeData: 'MATCH-MGO-BER-HAR-V1-SEAT08',
    status: 'completed',
    operatorName: 'Somaliland Express',
    bookingTime: '2026-05-10 11:34 AM',
    paymentMethod: 'Zaad Service'
  },
  {
    id: 'TKT-108239',
    voyageId: 'v2',
    departureCity: 'Hargeisa',
    arrivalCity: 'Borama',
    departureTime: '09:00 AM',
    arrivalTime: '11:15 AM',
    date: '28 Jul, 2026',
    seatNumber: '12',
    passengerName: 'Sakariye Hamud',
    passengerPhone: '+252 63 487234',
    passengerEmail: 'sakariyehamud@gmail.com',
    price: 12,
    qrCodeData: 'MATCH-MGO-HAR-BOR-V6-SEAT12',
    status: 'active',
    operatorName: 'Awdal Express',
    bookingTime: '2026-06-02 09:12 AM',
    paymentMethod: 'eDahab'
  }
];

export const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'n1',
    title: 'Booking Confirmed!',
    description: 'Your ticket to Borama for 28 Jul, 2026 is confirmed. Seat number: 12.',
    timestamp: '2 mins ago',
    read: false
  },
  {
    id: 'n2',
    title: 'Trip Accomplished',
    description: 'We hope you enjoyed your voyage from Berbera to Hargeisa on 12 May, 2026!',
    timestamp: '4 weeks ago',
    read: true
  }
];
