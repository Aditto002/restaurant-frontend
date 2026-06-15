import menu1 from "../assets/menu1.jpeg";

export const initialMenus = [
  {
    id: "menu-1",
    img: menu1,
  },
  {
    id: "menu-2",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "menu-3",
    img: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800",
  },
];

// Daily specialties menu data covering all 7 days of the week
export const daysMenuData = [
  {
    day: "Saturday menu",
    duration: 7200, // 2 hours
    specialties: [
      "Chicken Tikka Masala",
      "Chicken Tandoori",
      "Lamb Biryani",
      "Lamb Madras",
      "Chana Masala",
      "Prawn Korma"
    ]
  },
  {
    day: "Sunday menu",
    duration: 5400, // 1.5 hours
    specialties: [
      "Chicken Tikka Masala",
      "Chicken Tandoori",
      "Chicken Biryani",
      "Lamb Dansak",
      "Chana Masala",
      "Prawn Curry"
    ]
  },
  {
    day: "Monday menu",
    duration: 7200, // 2 hours
    specialties: [
      "Chicken Tikka Masala",
      "Chicken Tandoori",
      "Lamb Rogan Josh",
      "Prawn Korma",
      "Vegetable Curry",
      "Chicken Biryani"
    ]
  },
  {
    day: "Tuesday menu",
    duration: 9000, // 2.5 hours
    specialties: [
      "Butter Chicken",
      "Chicken Tandoori",
      "Lamb Saag",
      "Prawn Jalfrezi",
      "Vegetable Curry",
      "Lamb Biryani"
    ]
  },
  {
    day: "Wednesday menu",
    duration: 7200, // 2 hours
    specialties: [
      "Chicken Karahi",
      "Chicken Tandoori",
      "Lamb Korma",
      "Prawn Masala",
      "Chana Masala",
      "Vegetable Biryani"
    ]
  },
  {
    day: "Thursday menu",
    duration: 8000, // ~2.2 hours
    specialties: [
      "Chicken Saag",
      "Chicken Tandoori",
      "Lamb Dansak",
      "Prawn Saag",
      "Chana Masala",
      "Prawn Biryani"
    ]
  },
  {
    day: "Friday menu",
    duration: 7200, // 2 hours
    specialties: [
      "Butter Chicken",
      "Chicken Tandoori",
      "Lamb Korma",
      "Prawn Masala",
      "Chana Masala",
      "Chicken Biryani"
    ]
  }
];

export const COMPANION_MENUS = [
  {
    title: "Drinks",
    image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&q=80&w=800",
    items: [
      "Mango Lassi",
      "Masala Chai",
      "Mint Mojito",
      "Rose Milk",
      "Jal Jeera",
      "Nimbu Pani",
      "Cardamom Tea",
      "Kashmiri Kahwa"
    ]
  },
  {
    title: "Appetizers",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    items: [
      "Vegetable Samosa",
      "Paneer Tikka",
      "Onion Bhaji",
      "Hara Bhara Kabab",
      "Chicken 65",
      "Seekh Kabab",
      "Fish Amritsari",
      "Crispy Pakoras"
    ]
  }
];