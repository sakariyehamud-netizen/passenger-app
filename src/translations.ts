export type Language = 'ENG' | 'SOM';

export interface TranslationDictionary {
  welcome: string;
  findBestVoyage: string;
  departureCity: string;
  arrivalCity: string;
  voyageDate: string;
  manifest: string;
  passengers: string;
  adult: string;
  adults: string;
  children: string;
  child: string;
  searchVoyages: string;
  searchResults: string;
  voyageCheckout: string;
  checkoutSubtitle: string;
  chooseSeat: string;
  frontDriverSide: string;
  occupancyNotif: string;
  myBoardingPasses: string;
  boardingPassesSubtitle: string;
  voyagerProfile: string;
  accountConsole: string;
  activePastTrips: string;
  amenities: string;
  busModelCapacity: string;
  allVehicles: string;
  toyotaText: string;
  hiaceText: string;
  directBus: string;
  successfulTransaction: string;
  bookingConfirmed: string;
  covidBannerTitle: string;
  covidBannerText: string;
  popularRoutes: string;
  exploreAll: string;
  bookAnother: string;
  viewDigitalPass: string;
  popularInquiries: string;
  tickets: string;
  search: string;
  profile: string;
  home: string;
  verifySafe: string;
  selectTravelDate: string;
  applyConfig: string;
  travellers: string;
  seatsMessage: string;
  backToHome: string;
  departure: string;
  arrival: string;
  price: string;
  ratingWord: string;
  noVoyagesFound: string;
  noVoyagesFilterSub: string;
  seatsLeft: string;
  paymentMethod: string;
  passengerDetails: string;
  fullName: string;
  phoneNumber: string;
  invalidEmail: string;
  invalidPhone: string;
  invalidName: string;
  seatRequired: string;
  confirmPay: string;
  bookingProcessing: string;
  smsReceiptInfo: string;
  scheduledFor: string;
  ticketIdLabel: string;
  operatorLabel: string;
  statusLabel: string;
  downloadPass: string;
  cancelReservation: string;
  backToResults: string;
  logoutButton: string;
  updateProfile: string;
  languageSelect: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  ENG: {
    welcome: 'Welcome to',
    findBestVoyage: 'Find Best Voyage',
    departureCity: 'Departure City',
    arrivalCity: 'Arrival City',
    voyageDate: 'Voyage Date',
    manifest: 'Manifest',
    passengers: 'Passengers',
    adult: 'Adult',
    adults: 'Adults',
    children: 'Children',
    child: 'Child',
    searchVoyages: 'Search Voyages',
    searchResults: 'Search Results',
    voyageCheckout: 'Voyage Checkout',
    checkoutSubtitle: 'Confirm Seat & Payment',
    chooseSeat: 'Choose Your Seat',
    frontDriverSide: 'Front / Driver Side',
    occupancyNotif: 'Tap an available seat to request reservation.',
    myBoardingPasses: 'My Boarding Passes',
    boardingPassesSubtitle: 'Active & Past Trips',
    voyagerProfile: 'Voyager Profile',
    accountConsole: 'Account Console',
    activePastTrips: 'Active & Past Trips',
    amenities: 'Amenities',
    busModelCapacity: 'Bus Model & Capacity',
    allVehicles: 'All Vehicles',
    toyotaText: 'Toyota (30 seats)',
    hiaceText: 'Hiace (15 seats)',
    directBus: 'Direct Bus',
    successfulTransaction: 'Successful Transaction!',
    bookingConfirmed: 'Voyage Booking Confirmed!',
    covidBannerTitle: 'COVID-Free Travel Clearances',
    covidBannerText: 'Free healthcare check-ups and hand sanitization masks are available inside all Somaliland Express and VIP buses. Safe journey!',
    popularRoutes: 'Popular Routes',
    exploreAll: 'Explore All',
    bookAnother: 'Book Another Voyage',
    viewDigitalPass: 'View Digital Boarding Pass',
    popularInquiries: 'Popular Inquiries',
    tickets: 'Tickets',
    search: 'Search',
    profile: 'Profile',
    home: 'Home',
    verifySafe: 'Verified Safe',
    selectTravelDate: 'Select Travel Date',
    applyConfig: 'Apply Config',
    travellers: 'Travellers',
    seatsMessage: 'Select designated seat identifier',
    backToHome: 'Back to Home',
    departure: 'Departure',
    arrival: 'Arrival',
    price: 'Price',
    ratingWord: 'Rating',
    noVoyagesFound: 'No available journeys found',
    noVoyagesFilterSub: 'Try loosening filter preferences or select a different date.',
    seatsLeft: 'seats left',
    paymentMethod: 'Payment Method',
    passengerDetails: 'Passenger Details',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    invalidEmail: 'Please type a valid email',
    invalidPhone: 'Please type a valid phone number (+252...)',
    invalidName: 'Please type your full name',
    seatRequired: 'Please select a seat to proceed with reservation',
    confirmPay: 'Confirm & Pay Voyage',
    bookingProcessing: 'Processing your ticket reservation...',
    smsReceiptInfo: 'Your road transit reservation is registered. An SMS invoice was sent to the passenger phone.',
    scheduledFor: 'Scheduled for',
    ticketIdLabel: 'Ticket ID',
    operatorLabel: 'Operator Company',
    statusLabel: 'Ticket Status',
    downloadPass: 'Download Pass Offline',
    cancelReservation: 'Cancel Reservation',
    backToResults: 'Back to Results',
    logoutButton: 'Logout Account',
    updateProfile: 'Update Account Information',
    languageSelect: 'Display Language'
  },
  SOM: {
    welcome: 'Ku soo dhowow',
    findBestVoyage: 'Raadi Safarka Ugu Fiican',
    departureCity: 'Magaalada Ka Bixitaanka',
    arrivalCity: 'Magaalada Imaatinka',
    voyageDate: 'Taariikhda Safarka',
    manifest: 'Qaabka Rakaabka',
    passengers: 'Rakaabka',
    adult: 'Qof Weyn',
    adults: 'Dad Weyn',
    children: 'Carruur',
    child: 'Ilmo',
    searchVoyages: 'Baadh Safaro',
    searchResults: 'Natiijada Baadhista',
    voyageCheckout: 'Hubinta Safarka',
    checkoutSubtitle: 'Xaqiiji Kursiga & Lacag bixinta',
    chooseSeat: 'Dooro Kursigaaga',
    frontDriverSide: 'Hore / Dhinaca Darawalka',
    occupancyNotif: 'Taabo kursi banaan si aad u boos-garaysato.',
    myBoardingPasses: 'Muuqaalka Tigidhadaada',
    boardingPassesSubtitle: 'Safarada Hadda & Kuwii Hore',
    voyagerProfile: 'Profile-ka Rakaabka',
    accountConsole: 'Maamulka Koontada',
    activePastTrips: 'Safarada Firfircoon & Kuwii Hore',
    amenities: 'Adeegyada',
    busModelCapacity: 'Nooca Gaadhiga & Kuraasta',
    allVehicles: 'Dhamaan Gawaadhida',
    toyotaText: 'Toyota (30 kursi)',
    hiaceText: 'Hiace (15 kursi)',
    directBus: 'Bas Toos ah',
    successfulTransaction: 'Lacag-bixintu Way Guulaysatay!',
    bookingConfirmed: 'Boos-garayntii Safarku Waa Xaqiiqoobay!',
    covidBannerTitle: 'Hubinta Badbaadada COVID-ka',
    covidBannerText: 'Baadhitaano caafimaad oo bilaash ah iyo maaskaro ayaa lagu diyaariyey dhamaan basaska Somaliland Express iyo VIP. Safar Salama!',
    popularRoutes: 'Safarada Ugu Caansan',
    exploreAll: 'Eeg Dhamaan',
    bookAnother: 'Boos-gareey Safar Kale',
    viewDigitalPass: 'Eeg Kaadhka Fuulista Dijitaalka ah',
    popularInquiries: 'Weydiimaha Safarka Caanka ah',
    tickets: 'Tigidhada',
    search: 'Baadh',
    profile: 'Profile',
    home: 'Hoyga',
    verifySafe: 'Badbaadadiisu Lahubay',
    selectTravelDate: 'Dooro Taariikhda Safarka',
    applyConfig: 'Isticmaal Isbedelka',
    travellers: 'Safarleyda',
    seatsMessage: 'Dooro aqoonsiga kursiga loo cayimay',
    backToHome: 'Ku Noqo Hoyga',
    departure: 'Bixidda',
    arrival: 'Imaatinka',
    price: 'Qiimaha',
    ratingWord: 'Qiimaynta',
    noVoyagesFound: 'Wax safaro ah oo la heli karo laguma helin',
    noVoyagesFilterSub: 'Isku day inaad bedesho miirayaasha ama dooro taariikh kale.',
    seatsLeft: 'kursi baaqi ah',
    paymentMethod: 'Habka Lacag-Bixinta',
    passengerDetails: 'Faahfaahinta Rakaabka',
    fullName: 'Magaca Full-ka ah',
    phoneNumber: 'Lambarka Talifoonka',
    invalidEmail: 'Fadhlan gali email sax ah',
    invalidPhone: 'Fadhlan gali nambarka telefoonka oo sax ah (+252...)',
    invalidName: 'Fadhlan qor magacaaga oo buuxa',
    seatRequired: 'Fadhlan dooro kursi si aad u dhamaystirto boos-garaynta',
    confirmPay: 'Xaqiiji & Bixi Qiimaha Safarka',
    bookingProcessing: 'Lagu jiro diiwaangelinta tigidhkaaga...',
    smsReceiptInfo: 'Diiwaangelinta safarkaaga dhulka waa la dhamaystiray. SMS xisaabeed ayaa loo diray talifoonka rakaabka.',
    scheduledFor: 'Loo qorsheeyay',
    ticketIdLabel: 'Aqoonsiga Tigidhka',
    operatorLabel: 'Shirkadda Baska',
    statusLabel: 'Heerka Tigidhka',
    downloadPass: 'La soo deg Tigidhka',
    cancelReservation: 'Jooji Boos-garaynta',
    backToResults: 'Ku noqo Natiijada Baadhista',
    logoutButton: 'Ka Bax Koontada',
    updateProfile: 'Cusboonaysii Macluumaadka Koontada',
    languageSelect: 'Luuqadda Shaashadda'
  }
};
