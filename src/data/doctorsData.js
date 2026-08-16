export const SPECIALTIES = [
  {
    id: 'respiratory',
    title: 'Respiratory Issues',
    subtitle: 'Asthma, cough & breathing difficulty',
    iconName: 'Wind',
    color: '#0284c7',
    badge: 'Popular'
  },
  {
    id: 'piles',
    title: 'Piles',
    subtitle: 'Hemorrhoids & anal discomfort',
    iconName: 'Activity',
    color: '#0d9488'
  },
  {
    id: 'typhoid',
    title: 'Typhoid',
    subtitle: 'Bacterial infection needing urgent care',
    iconName: 'Thermometer',
    color: '#e11d48'
  },
  {
    id: 'dengue',
    title: 'Dengue Fever',
    subtitle: "Children's health, fever & dengue",
    iconName: 'Bug',
    color: '#ea580c'
  },
  {
    id: 'kidney',
    title: 'Kidney Problems',
    subtitle: 'Kidney stones & urinary tract care',
    iconName: 'Droplet',
    color: '#2563eb'
  },
  {
    id: 'stomach',
    title: 'Stomach Issues',
    subtitle: 'Acid reflux, gastritis & digestion',
    iconName: 'ShieldAlert',
    color: '#16a34a'
  },
  {
    id: 'heart',
    title: 'Heart Disease',
    subtitle: 'Chest pain, cardiac conditions & checkups',
    iconName: 'Heart',
    color: '#dc2626'
  }
];

export const DOCTORS = [
  {
    id: 'dr-ahmed-ali',
    name: 'Dr. Ahmed Ali',
    specialty: 'Cardiologist',
    specialtyId: 'heart',
    experience: '12 years of Experience',
    rating: 4.8,
    reviewsCount: 142,
    hospital: 'Shaukat Khanum Hospital, Lahore',
    hours: 'Mon-Fri: 9am-5pm',
    image: '/assets/doc_real_2.jpg',
    fee: 'Rs. 2,500',
    about: 'Senior Consultant Cardiologist specializing in preventive cardiology, echocardiography, and heart disease management.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: 'dr-sarah-khan',
    name: 'Dr. Sarah Khan',
    specialty: 'Dermatologist',
    specialtyId: 'stomach',
    experience: '8 years of Experience',
    rating: 4.9,
    reviewsCount: 198,
    hospital: 'Skin Care Clinic, Karachi',
    hours: 'Tue-Sat: 10am-4pm',
    image: '/assets/doc_real_1.jpg',
    fee: 'Rs. 2,000',
    about: 'Expert clinical and aesthetic dermatologist with specialized training in laser treatments and skin care.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'dr-muhammad-hassan',
    name: 'Dr. Muhammad Hassan',
    specialty: 'Neurologist',
    specialtyId: 'respiratory',
    experience: '15 years of Experience',
    rating: 4.7,
    reviewsCount: 89,
    hospital: 'JPMC Hospital, Karachi',
    hours: 'Mon-Thu: 10am-3pm',
    image: '/assets/doc_real_3.jpg',
    fee: 'Rs. 3,000',
    about: 'Renowned neurologist with extensive experience in brain disorders, stroke management, and nerve care.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday']
  },
  {
    id: 'dr-ayesha-malik',
    name: 'Dr. Ayesha Malik',
    specialty: 'Pediatrician',
    specialtyId: 'dengue',
    experience: '10 years of Experience',
    rating: 4.9,
    reviewsCount: 230,
    hospital: "Children's Hospital, Islamabad",
    hours: 'Mon-Sun: 8am-8pm',
    image: '/assets/doc_real_4.jpg',
    fee: 'Rs. 1,800',
    about: 'Compassionate pediatrician focusing on infant growth, childhood vaccinations, and general child healthcare.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  {
    id: 'dr-tariq-mahmood',
    name: 'Dr. Tariq Mahmood',
    specialty: 'Gastroenterologist',
    specialtyId: 'stomach',
    experience: '14 years of Experience',
    rating: 4.8,
    reviewsCount: 115,
    hospital: 'Aga Khan Hospital, Karachi',
    hours: 'Mon-Sat: 11am-6pm',
    image: '/assets/doctor_ahmed.png',
    fee: 'Rs. 2,800',
    about: 'Specialist in digestive health, liver care, and modern endoscopic procedures.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
];

export const TIME_SLOTS = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM'
];

export const WELLNESS_INSIGHT = {
  badge: 'DAILY WELLNESS INSIGHT',
  title: 'Maintain Optimal Hydration',
  description: 'Clinical guidelines recommend 6–8 glasses of water daily to support kidney function and metabolic balance.'
};
