const menuNames = {
  // Menu items inside DeliciousMenu
  "Tandoori Lamb Chops": "Côtelettes d'Agneau Tandoori",
  "Butter Chicken Delhi Style": "Poulet au Beurre Style Delhi",
  "Paneer Tikka Masala": "Paneer Tikka Masala",
  "Awadhi Mutton Biryani": "Biryani de Mouton Awadhi",
  "Garlic Naan Basket": "Corbeille de Naan à l'Ail",
  "Amritsari Fish Tikka": "Poisson Tikka Amritsari",
  "Samosa Chaat Royal": "Samosa Chaat Royal",
  "Dal Bukhara Classic": "Dal Bukhara Classique",
  "Royal Malai Kofta": "Malai Kofta Royal",
  "Exotic Vegetable Korma": "Korma de Légumes Exotiques",
  "Goan Prawn Curry": "Curry de Crevettes de Goa",
  "Saffron Rasmalai": "Rasmalai au Safran",
  "Gulab Jamun Flambé": "Gulab Jamun Flambé",
  "Aromatic Saffron Rice": "Riz au Safran Aromatique",
  "Palak Patta Chaat": "Palak Patta Chaat",
  "Chicken Seekh Kebab": "Kebab Seekh au Poulet",
  "Mango Lassi Mousse": "Mousse de Mango Lassi",
  "Goan Fish Curry": "Curry de Poisson de Goa",
  "Imperial Keema Samosa": "Samossa Keema Impérial",
  "Kesar Pistachio Kulfi": "Kulfi Kesar Pistache",
  "Crispy Papadam Basket": "Corbeille de Papadams Croustillants",
  "Tandoori Chicken Classic": "Poulet Tandoori Classique",
  "Kashmiri Lamb Rogan Josh": "Agneau Rogan Josh du Cachemire",
  "Bhindi Masala Sauté": "Sauté de Bhindi Masala",
  "Hyderabadi Dum Biryani": "Dum Biryani d'Hyderabad",
  "Clay-Oven Butter Naan": "Naan au Beurre au Four d'Argile",
  "Spiced Cucumber Raita": "Raita au Concombre Épicé",

  // Carousel Specialties
  "Chicken Tikka Masala": "Poulet Tikka Masala",
  "Chicken Tandoori": "Poulet Tandoori",
  "Lamb Biryani": "Biryani d'Agneau",
  "Lamb Madras": "Agneau Madras",
  "Chana Masala": "Chana Masala",
  "Prawn Korma": "Korma de Crevettes",
  "Chicken Biryani": "Biryani de Poulet",
  "Lamb Dansak": "Agneau Dansak",
  "Prawn Curry": "Curry de Crevettes",
  "Lamb Rogan Josh": "Agneau Rogan Josh",
  "Vegetable Curry": "Curry de Légumes",
  "Butter Chicken": "Poulet au Beurre",
  "Lamb Saag": "Agneau aux Épinards",
  "Prawn Jalfrezi": "Crevettes Jalfrezi",
  "Chicken Karahi": "Poulet Karahi",
  "Lamb Korma": "Agneau Korma",
  "Prawn Masala": "Crevettes Masala",
  "Vegetable Biryani": "Biryani de Légumes",
  "Chicken Saag": "Poulet aux Épinards",
  "Prawn Saag": "Crevettes aux Épinards",
  "Prawn Biryani": "Biryani de Crevettes",

  // Companion Menus (Drinks & Appetizers)
  "Mango Lassi": "Mango Lassi",
  "Masala Chai": "Masala Chaï",
  "Mint Mojito": "Mojito à la Menthe",
  "Rose Milk": "Lait de Rose",
  "Jal Jeera": "Jal Jeera",
  "Nimbu Pani": "Nimbu Pani",
  "Cardamom Tea": "Thé à la Cardamome",
  "Kashmiri Kahwa": "Kahwa du Cachemire",
  "Vegetable Samosa": "Samossa aux Légumes",
  "Paneer Tikka": "Paneer Tikka",
  "Onion Bhaji": "Beignets d'Oignons",
  "Hara Bhara Kabab": "Kebab Hara Bhara",
  "Chicken 65": "Poulet 65",
  "Seekh Kabab": "Kebab Seekh",
  "Fish Amritsari": "Poisson Amritsari",
  "Crispy Pakoras": "Pakoras Croustillants"
};

const menuDescriptions = {
  // Description translations for DeliciousMenu items (27 items)
  "Succulent chops marinated in spices, yoghurt and garlic, roasted over hardwood charcoal.": "Succulentes côtelettes d'agneau marinées aux épices, yaourt et ail, rôties au charbon de bois.",
  "Tender chicken simmered in a velvety tomato, fresh butter, cream, and cashew nut sauce.": "Poulet tendre mijoté dans une sauce veloutée aux tomates, beurre frais, crème et noix de cajou.",
  "Charred paneer cubes in a rich, spiced bell pepper and tomato cream sauce.": "Cubes de paneer grillés dans une sauce riche et épicée aux poivrons et à la crème de tomate.",
  "Fragrant basmati rice layered with spiced mutton, saffron, and mint, cooked under seal.": "Riz basmati parfumé mijoté avec du mouton épicé, du safran et de la menthe, cuit à l'étouffée.",
  "Soft, leavened flatbread topped with minced garlic and butter, baked fresh in the clay oven.": "Pain plat levé et moelleux garni d'ail émincé et de beurre, cuit au four traditionnel en argile.",
  "Spiced carom-flavored fish chunks, grilled over charcoal and served with mint chutney.": "Morceaux de poisson épicés parfumés au carambole, grillés au charbon de bois et servis avec un chutney de menthe.",
  "Crushed potato samosas with chickpeas, sweetened yoghurt, tamarind, and mint chutney.": "Samoussas de pommes de terre écrasés avec pois chiches, yaourt sucré, tamarin et chutney de menthe.",
  "Black lentils slow-cooked overnight with tomatoes, butter, and cream for a smoky finish.": "Lentilles noires cuites lentement toute la nuit avec des tomates, du beurre et de la crème pour une touche fumée.",
  "Paneer and potato dumplings filled with raisins, served in a rich cardamom cashew gravy.": "Boulettes de paneer et pommes de terre fourrées aux raisins secs, servies dans une riche sauce cajou à la cardamome.",
  "Seasonal handpicked garden vegetables simmered in a mildly spiced coconut cashew milk.": "Légumes de saison cueillis à la main mijotés dans un lait de coco et de cajou doux aux épices.",
  "Juicy prawns cooked in a traditional spiced coconut and red chili paste broth.": "Crevettes juteuses cuites dans un bouillon de noix de coco épicé traditionnel et de pâte de piment rouge.",
  "Poached paneer dumplings soaked in sweet saffron milk, garnished with almond flakes.": "Boulettes de paneer pochées trempées dans un lait sucré au safran, garnies d'amandes effilées.",
  "Warm milk dumplings soaked in cardamom rose syrup, served with vanilla bean gelato.": "Beignets de lait chauds trempés dans un sirop de rose à la cardamome, servis avec un gelato à la gousse de vanille.",
  "Long-grain basmati rice steamed with saffron, green peas, and whole warm spices.": "Riz basmati à grains longs cuit à la vapeur avec du safran, des petits pois et des épices entières chaleureuses.",
  "Crispy batter-fried spinach leaves topped with spiced potatoes, sweet chutneys, and sev.": "Feuilles d'épinards croustillantes frites en pâte garnies de pommes de terre épicées, chutneys doux et sev.",
  "Spiced minced chicken skewers grilled over hot coals, served with a tangy onion salad.": "Brochettes de poulet haché épicé grillées sur des charbons ardents, servies avec une salade d'oignons acidulée.",
  "A velvety modern take on mango lassi, served chilled in a glass with crushed pistachios.": "Une version moderne et veloutée du mango lassi, servi frais dans un verre avec des pistaches concassées.",
  "Premium kingfish cutlets simmered in a sharp, sour-and-spicy coconut tamarind gravy.": "Côtelettes de thazard de première qualité mijotées dans une sauce piquante et acide de noix de coco et tamarin.",
  "Crisp triangular pastry pockets filled with minced spiced lamb and fresh cilantro.": "Chaussons de pâte triangulaires croustillants farcis d'agneau haché épicé et de coriandre fraîche.",
  "Traditional slow-reduced dense milk ice cream flavored with saffron threads and pistachios.": "Glace traditionnelle à base de lait concentré réduit lentement, parfumée au safran et aux pistaches.",
  "Thin, crispy spiced lentil wafers served with sweet mango chutney and fresh mint dip.": "Fines galettes de lentilles croustillantes et épicées servies avec un chutney de mangue doux et une sauce à la menthe fraîche.",
  "Half chicken on-the-bone marinated in yoghurt and fresh tandoori spices, roasted in clay oven.": "Demi-poulet avec os mariné dans du yaourt et des épices tandoori fraîches, rôti au four en argile.",
  "Tender lamb chunks slow-cooked in a rich, aromatic gravy flavored with Kashmiri red chilies.": "Morceaux d'agneau tendres cuits lentement dans une sauce riche et aromatique parfumée aux piments rouges du Cachemire.",
  "Fresh tender lady fingers (okra) dry cooked with onions, tomatoes, and tangy spice blend.": "Gombos frais et tendres cuits à sec avec des oignons, des tomates et un mélange d'épices acidulé.",
  "Aromatic basmati rice cooked on steam (dum) with saffron-marinated chicken, mint and fried onions.": "Riz basmati aromatique cuit à la vapeur (dum) avec du poulet mariné au safran, de la menthe et des oignons frits.",
  "Traditional soft and pillowy leavened flatbread brushed with premium quality melted butter.": "Pain plat levé traditionnel, doux et moelleux, badigeonné de beurre fondu de qualité supérieure.",
  "Cool whisked yoghurt with grated English cucumber, roasted cumin powder, and fresh mint.": "Yaourt frais battu avec du concombre râpé, du cumin grillé et de la menthe fraîche."
};

export function translateFood(text, lang) {
  if (lang !== "fr") return text;
  return menuNames[text] || text;
}

export function translateDesc(text, lang) {
  if (lang !== "fr") return text;
  return menuDescriptions[text] || text;
}
