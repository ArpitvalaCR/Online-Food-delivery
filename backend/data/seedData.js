const seedDishes = [
  {
    id: "dish-1",
    name: "Maharaja Special Thali",
    category: "Royal Thalis",
    price: 280,
    originalPrice: 340,
    badge: "👑 Grand Bestseller",
    badgeType: "primary",
    tag: "Includes 8 Items",
    rating: 4.9,
    reviewsCount: "4.8k",
    description: "Paneer Lababdar, Dal Makhani, 4 Butter Tawa Rotis, Jeera Basmati Rice, Gulab Jamun, Roasted Papad, Pickle & Fresh Kachumber Salad.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASD6TawcK-uwUN0LrS728UUUas_goEKbpm_nn9pAh3SsudJ6OCtQ2wtfDr03QpnzxXbxxmJ3Yr_XpfBXzJGj32kZSuQr1dwc-q8EIrqh8Sx6YWYya59DtXXbnq98uVfiTjWPIrjTTe_YSIVSk5BMk8yw86Yary7NLc2PXCB0snOBCEnJh5OhexvYO3BAn6EQpE5FSMGyNlbHkANvjEVl5LIcjVs__Di8Oq0g3Ht175",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha", "Extra Spicy"],
    addonOptions: [
      { id: "extra_ghee", name: "Extra Desi Ghee Drizzle", price: 25 },
      { id: "extra_sweet", name: "Extra Hot Gulab Jamun (1 pc)", price: 35 },
      { id: "extra_roti", name: "Extra 2 Butter Tawa Rotis", price: 30 }
    ]
  },
  {
    id: "dish-2",
    name: "Shahi Dal Tadka & Jeera Rice Combo",
    category: "Dal & Gravies",
    price: 190,
    originalPrice: 220,
    badge: "Desi Ghee Double Tadka",
    badgeType: "secondary",
    rating: 4.8,
    reviewsCount: "3.2k",
    description: "Yellow toor dal tempered with hing, golden garlic, whole Kashmiri chilies & pure Gir cow ghee, paired with aromatic jeera basmati rice.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMjqVf0UHLyukSQtfSZrUR6oOlFCPeSK9Q42gl5TlVUU7QHu-OuouCZk43SfRLxDhWvBdaf6SCAVwRdQQsV-xZnkr3fUdGkLMM5iEgeSFNfg_IArBFQyzKOKmnqTGlpkAiCG9W4SiK-AXvX6fYGv_4uTw9M-XgYOMz6lJIjZWzS3WCSgdt06v2xq-srUbHcVGkh6A76G9cW7XFSk2qrWYRzN7EZ_51MMmfFclGoTEb",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha"],
    addonOptions: [
      { id: "extra_tadka", name: "Extra Double Garlic-Hing Tadka", price: 20 },
      { id: "fried_chili", name: "Fried Salted Green Chilies (4 pcs)", price: 15 },
      { id: "curd", name: "Fresh Curd Sakora", price: 30 }
    ]
  },
  {
    id: "dish-3",
    name: "Paneer Tikka Butter Masala",
    category: "Paneer Delights",
    price: 240,
    originalPrice: 280,
    badge: "House Speciality",
    badgeType: "primary",
    rating: 4.9,
    reviewsCount: "5.1k",
    description: "Clay oven charcoal-charred cottage cheese cubes simmered in velvety makhani cashew-tomato gravy with organic kasuri methi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbYsT978z-afqGjUrynLw5PBAADAo9s5rD_A_dlGDbbejKwOGTtNnuJ8vVLZPTvKEJxvF0tqQJVG_1b8cwoZs39BA15GBQjNXOA4-ayfjqMUZmWMdKq-RO28rt3kpj5paYu-g2tF2PfP5P1Gfg4AUZz0qFjVtUNKjdsZzunySHNO9l96wNasll1u2SZLjuEqzLdY1LgBDdGKbVjYuHwBYYLC8Ob5iokSVjoqfQhPmJ",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha", "Kolhapuri Spicy"],
    addonOptions: [
      { id: "extra_cheese", name: "Extra Grated Amul Cheese", price: 40 },
      { id: "extra_butter", name: "Extra Melting Butter Dollop", price: 25 },
      { id: "jain", name: "100% Jain Preparation (No Onion / Garlic)", price: 0 }
    ]
  },
  {
    id: "dish-4",
    name: "Amritsari Kulcha with Chole",
    category: "Tandoori & Breads",
    price: 180,
    originalPrice: 210,
    badge: "Crispy Layered Tandoor",
    badgeType: "secondary",
    rating: 4.7,
    reviewsCount: "2.8k",
    description: "Potato-paneer stuffed flaky butter kulcha baked crisp in clay oven, served with dark spiced pindi chana & tangy imli pyaz chutney.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjeDm9f0WvLdH8y73350pDRWIV-MmcgX32zS8lpf5vIVB_ni6uMrMmIW6keZsweO4RUzi2CiJ_bnvbhoRdFNYBwKsPnsc0tsPo5LcOpn6mNkIbX0IkVuTSo7xUT7zSGQ46Ewb-R6zgtsIufTnPh9q8LUTliiuQKJcu5lO0yx2Zkvi0YaPG-14LacfRNHxcauvThPTS8fMvu3w_4lzQy8GILrMvZ0iiDTA9s6H63Gz0",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha"],
    addonOptions: [
      { id: "extra_kulcha", name: "Extra Stuffed Amritsari Kulcha (1 pc)", price: 50 },
      { id: "extra_chole", name: "Extra Pindi Chole Bowl", price: 45 },
      { id: "boondi_raita", name: "Chilled Boondi Raita", price: 35 }
    ]
  },
  {
    id: "dish-5",
    name: "Awadhi Subz Dum Biryani",
    category: "Dum Biryani",
    price: 220,
    originalPrice: 260,
    badge: "Handi Sealed Dum",
    badgeType: "primary",
    rating: 4.9,
    reviewsCount: "4.2k",
    description: "Long-grain basmati rice infused with Kashmiri saffron, garden vegetables and whole spices slow cooked in dough-sealed claypot with boondi raita.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4OCjTP9Z9sLqmSjUcmD-qykzhl7q5eLTr6gSM5fUMcUH5Mh41Oyz7itW0yqyT9vpm052vjsOBcK_fawvjUkhM8uB7kWqEwmNlab3pMXQk7Np3iWcw4GuhcGeGVDUV-Mkytg6TjVf9PRY92U0Oq9rTWepHBA4FwloBu2LLYbjCTEjtX5sazksR1izV_fXH-n3GZAPOoKjUubBdTkmlThZW_7crob2qSYpS2lVKCkz2",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha"],
    addonOptions: [
      { id: "extra_raita", name: "Extra Burani Garlic Raita", price: 30 },
      { id: "salan", name: "Hyderabadi Mirchi Ka Salan", price: 35 }
    ]
  },
  {
    id: "dish-6",
    name: "Kesari Phirni & Gulab Jamun Duo",
    category: "Desserts & Mithai",
    price: 110,
    originalPrice: 140,
    badge: "Royal Meetha",
    badgeType: "secondary",
    rating: 4.9,
    reviewsCount: "6.1k",
    description: "Chilled saffron ground rice pudding in traditional earthen sakora paired with 2 hot syrup-dipped mawa gulab jamuns.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKVdPDro8q5M1zpyh6J0cyPYoMC9zY0_S6NMAvH4ggvFNs3FawJgtlacztsMWuqoGYFmHZvNkdWtVaFvFxh0p6DPKPqkRX82CaJIunxU7axpIMO7PlAKcZQ9NybGVWBb1tYH1AwYdLfs1G-X1APjeVQMJKx48369VH0zokYgadS1zwvFdFdoNJxLHV1n2aC_hcMG6qlt7vKGgxSU9Zi5v6--DgNxlrKseXmD_naYCn",
    isVeg: true,
    customizable: false,
    addonOptions: [
      { id: "rabdi", name: "Rich Rabdi Topping", price: 30 },
      { id: "extra_pista", name: "Extra Roasted Pistachio & Almond Flakes", price: 20 }
    ]
  },
  {
    id: "dish-7",
    name: "Dal Baati Churma Royal Platter",
    category: "Royal Thalis",
    price: 290,
    originalPrice: 350,
    badge: "Rajasthani Authentic",
    badgeType: "primary",
    tag: "Dipped in Desi Ghee",
    rating: 4.9,
    reviewsCount: "5.4k",
    description: "4 Golden crisp baatis soaked in pure desi ghee, served with Panchmel spicy dal, aromatic sweet wheat churma, gatte ki subzi & lehsun chutney.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Lyfn7uAdJC5gm6PkqXmNYYxBcVb0r7vIn8fpe9Kmnd-ZmJs-EGchBAv3GMRAhG1KzP9F0FlP-pdSGStlpoNH1iHclxOMMaEiwJi8v9UU_FseGCan5g9zf_1ghPNVPlIQK9LW69oWR39nPq2OGcJkYjmGv-XeX1owuBLCAFq26LGSbpR2LCFzg6G_RMtqXaI3HMVwcRIVP0dCZIqxsCSWk4-b5awy2Ju1Thjc5M0-",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Medium", "Desi Teekha", "Rajasthani Teekha"],
    addonOptions: [
      { id: "extra_baati", name: "Extra Desi Ghee Baati (2 pcs)", price: 45 },
      { id: "extra_churma", name: "Extra Mawa Churma Bowl", price: 50 },
      { id: "lehsun_chutney", name: "Fiery Red Garlic Chutney", price: 20 }
    ]
  },
  {
    id: "dish-8",
    name: "Special Pav Bhaji Platter",
    category: "Snacks",
    price: 150,
    originalPrice: 180,
    badge: "Butter Toasted Special",
    badgeType: "secondary",
    rating: 4.8,
    reviewsCount: "3.7k",
    description: "Slow-mashed butter-rich mixed vegetable bhaji topped with fresh coriander & dollops of Amul butter, served with 2 pairs of golden toasted pav.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS8PjVSoYyQgJ3kT5jYQCbAZHECq3a0NrpS4sO_bGbQ6x1VoBQBM50Wy6_9wdAhTLmfUNvR--ctgEu0cILG_301OOvxUpKaEBjRlpb_OPssjeZ84Q4aY0VEsgWoel00jTlu6tQhP6-ipKIXBssNMpRVRkIkLlI8iJq_lwlhUZxXs5Usrxsp2bkybRKUEydSN9xMSUrw038fXHllxDZZsuAAQJSHT5jvMqaWa8N4NNXnyJZlE36EHkw4A",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Kolhapuri Teekha"],
    addonOptions: [
      { id: "extra_cheese", name: "Extra Melted Cheese Layer", price: 35 },
      { id: "extra_pav", name: "Extra Butter Pav Pair (2 pcs)", price: 30 },
      { id: "extra_butter", name: "Extra Amul Butter Block", price: 20 }
    ]
  },
  {
    id: "dish-9",
    name: "Chilled Masala Chaas Matka",
    category: "Beverages & Chaas",
    price: 50,
    originalPrice: 65,
    badge: "Digestive Cooler",
    badgeType: "tertiary",
    rating: 4.9,
    reviewsCount: "7.2k",
    description: "Traditional churned curd buttermilk seasoned with roasted jeera powder, black salt, fresh mint, coriander, and light ginger zest.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuApuEjj5uUa94MqaJIjOinzgSemFIj7RwXY4qakedwtGk4RmILoBX0sG5mu7IMSUxpa7Y8PqaVuTey6Hntp-NSqU53YohQ3Bs126k-VMjtdf4EkIZEFZ3haCU-VWP9IgvjPYG98Nr-Z3XHi_SRVPKgBxlH3bPX-UMApez8axYNlAANhZdYnNksAlLWNQyg1jfMKUoRbu5rlCXlD5Eh7Tzp_RgyD3ZVhKQ6zkw5ocG_1",
    isVeg: true,
    customizable: false,
    addonOptions: [
      { id: "boondi", name: "Crispy Boondi Garnish", price: 10 }
    ]
  },
  {
    id: "dish-10",
    name: "Tandoori Butter Roti Basket (4 pcs)",
    category: "Tandoori & Breads",
    price: 80,
    originalPrice: 100,
    badge: "Fresh Clay Oven",
    badgeType: "secondary",
    rating: 4.8,
    reviewsCount: "2.1k",
    description: "Whole wheat rotis puffed against blazing tandoori clay walls, brushed with pure Gir cow desi ghee.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFtLhPFA9oewmqof5iaQc4VQny2XUDFLyTyQ3wHhGszdE1J8cGyJ6RgEgEbf79ULakE6oRUonEaF7wxRoB18QfHN4Znt9TaIdFDl_K9YjjLDa5mbLpSFy6WxtlfCZALhIys685CuYLWvXCcRcDuAcvnbufKeMprqOXQohE896oCnlG_3H3Nkp7JbzDLbfTODAIsUx_SwNGcUbk098MTO7D9ZqugsIbWDWnA6cBx_W1",
    isVeg: true,
    customizable: false,
    addonOptions: [
      { id: "garlic_naan", name: "Upgrade 1 to Garlic Naan", price: 25 }
    ]
  },
  {
    id: "dish-11",
    name: "Dal Makhani Handi Special",
    category: "Dal & Gravies",
    price: 210,
    originalPrice: 250,
    badge: "16-Hr Slow Cooked",
    badgeType: "primary",
    rating: 4.9,
    reviewsCount: "4.5k",
    description: "Whole black urad lentils & rajma slow cooked overnight on charcoal embers with fresh cream, butter, and sun-ripened tomatoes.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeFFt5uOsasjc5HYqQJgSQhNc3mtlMYtllma5_SJhEGQj6D--a3E51wRGSmb50N50M6x2Z8vPDj7A0OjtR-V1mkwEhE_F0T1l2CzpDfNAvgLQhqOrmlBvQsKIve1IlocqudY5dem-rYKyj6CYkTKPD3v4VvbHaJc_fRL6sqauNfZc62dkPv4pxqFJMi6LVFRs9mL4uSLGCX-mwyJn398zXTjIjMaWbGhA0-OTyeuJQ",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha"],
    addonOptions: [
      { id: "extra_butter", name: "Extra White Butter Cube", price: 25 },
      { id: "cream", name: "Extra Fresh Malai Swirl", price: 20 }
    ]
  },
  {
    id: "dish-12",
    name: "Shahi Paneer Deluxe Thali",
    category: "Royal Thalis",
    price: 260,
    originalPrice: 310,
    badge: "Chef Recommended",
    badgeType: "primary",
    tag: "Includes 7 Items",
    rating: 4.8,
    reviewsCount: "3.9k",
    description: "Shahi Paneer in cashew gravy, Dal Fry, 3 Lachha Parathas, Matar Pulao, Boondi Raita, Roasted Papad, and Rasgulla.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw06LuivcwKRMAy1pv0hqGOwVI8Bb3flwxZvfMmLw8KAV_G_T4A0geOl_9PnUImJxChwiiofy3e4qBPDbtauafQqJq49hbLya8mLmLO10ZY5a-KtnOapDmGmAHE71QZgIWoEvLErzbCsL89R-Pj3jskgHeNAxLla8KT6Oh4rs2h1Md-o8K3kNrzpkWOZgc3-r-I5YSF3_HuJ0c8oTBlzDUhPTeJoK9OnwHAnGgboKF",
    isVeg: true,
    customizable: true,
    availableSpiceLevels: ["Mild", "Medium", "Desi Teekha"],
    addonOptions: [
      { id: "extra_ghee", name: "Pure Cow Desi Ghee Topping", price: 25 },
      { id: "extra_paratha", name: "Extra Crispy Lachha Paratha", price: 35 }
    ]
  }
];

module.exports = seedDishes;
