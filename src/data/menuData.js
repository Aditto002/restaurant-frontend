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
    duration: 7200,
    featuredImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Chicken Tikka Masala",
    featuredDesc: "Tender chicken in rich, creamy tomato spiced sauce",
    price: "£ 14.99",
    specialties: [
      "Chicken Tikka Masala", "Chicken Tandoori", "Lamb Biryani",
      "Lamb Madras", "Chana Masala", "Prawn Korma"
    ],
    timeDetails: {
      topTitle: "Mon - Sat",
      topSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ],
      bottomTitle: "Sunday",
      bottomSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ]
    }
  },
  {
    day: "Sunday menu",
    duration: 5400,
    featuredImage: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Lamb Biryani",
    featuredDesc: "Aromatic basmati rice layered with slow-cooked tender lamb",
    price: "£ 16.99",
    specialties: [
      "Chicken Tikka Masala", "Chicken Tandoori", "Chicken Biryani",
      "Lamb Dansak", "Chana Masala", "Prawn Curry"
    ],
    timeDetails: {
      topTitle: "Sunday",
      topSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ],
      bottomTitle: "Mon - Sat",
      bottomSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ]
    }
  },
  {
    day: "Monday menu",
    duration: 7200,
    featuredImage: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Lamb Rogan Josh",
    featuredDesc: "Bold Kashmiri braised lamb with whole warming spices",
    price: "£ 15.99",
    specialties: [
      "Chicken Tikka Masala", "Chicken Tandoori", "Lamb Rogan Josh",
      "Prawn Korma", "Vegetable Curry", "Chicken Biryani"
    ],
    timeDetails: {
      topTitle: "Mon - Sat",
      topSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ],
      bottomTitle: "Sunday",
      bottomSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ]
    }
  },
  {
    day: "Tuesday menu",
    duration: 9000,
    featuredImage: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Butter Chicken",
    featuredDesc: "Silky tomato-butter sauce with grilled chicken pieces",
    price: "£ 13.99",
    specialties: [
      "Butter Chicken", "Chicken Tandoori", "Lamb Saag",
      "Prawn Jalfrezi", "Vegetable Curry", "Lamb Biryani"
    ],
    timeDetails: {
      topTitle: "Mon - Sat",
      topSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ],
      bottomTitle: "Sunday",
      bottomSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ]
    }
  },
  {
    day: "Wednesday menu",
    duration: 7200,
    featuredImage: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Prawn Masala",
    featuredDesc: "Juicy king prawns in a fiery, tangy masala gravy",
    price: "£ 17.99",
    specialties: [
      "Chicken Karahi", "Chicken Tandoori", "Lamb Korma",
      "Prawn Masala", "Chana Masala", "Vegetable Biryani"
    ],
    timeDetails: {
      topTitle: "Mon - Sat",
      topSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ],
      bottomTitle: "Sunday",
      bottomSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ]
    }
  },
  {
    day: "Thursday menu",
    duration: 8000,
    featuredImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Chicken Tandoori",
    featuredDesc: "Charcoal-roasted marinated chicken with mint chutney",
    price: "£ 13.49",
    specialties: [
      "Chicken Saag", "Chicken Tandoori", "Lamb Dansak",
      "Prawn Saag", "Chana Masala", "Prawn Biryani"
    ],
    timeDetails: {
      topTitle: "Mon - Sat",
      topSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ],
      bottomTitle: "Sunday",
      bottomSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ]
    }
  },
  {
    day: "Friday menu",
    duration: 7200,
    featuredImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600",
    featuredTitle: "Chicken Biryani",
    featuredDesc: "Fragrant layered rice with succulent spiced chicken",
    price: "£ 14.49",
    specialties: [
      "Butter Chicken", "Chicken Tandoori", "Lamb Korma",
      "Prawn Masala", "Chana Masala", "Chicken Biryani"
    ],
    timeDetails: {
      topTitle: "Mon - Sat",
      topSchedules: [
        { label: "Buffet:", time: "11:00 AM – 2:00 PM" },
        { label: "Dinner:", time: "4:30 PM – 9:00 PM" }
      ],
      bottomTitle: "Sunday",
      bottomSchedules: [
        { label: "", time: "11:30 AM – 8:30 PM" }
      ]
    }
  }
];

export const COMPANION_MENUS = [
  {
    title: "Drinks",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800", // using a more transparent-friendly drink picture or just an appealing drink
    description: "Explore our top-rated beverage categories, crafted to refresh and satisfy! From delicious lassis to spiced teas.",
    price: "$. 12/-",
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
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=800", // using a nice appetizer/starter image
    description: "Explore our top-rated food categories, crafted to satisfy every craving! From delicious starters and snacks.",
    price: "$. 24/-",
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