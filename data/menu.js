// Circle menu data.
//
// Section shape:
//   { id, name, label, blurb, layout, groups: [{ name, items: [...] }] }
//   `layout` picks how the section is composed (see components/menu/*).
//   `id` values are page anchors, keep them stable.
//
// Item shape:
//   { id, name, price?, desc, image?, options?, signature? }
//   price    number in naira. Omit when the item has `options`, the card shows "from" the lowest.
//   options  [{ name, price }] for bottles or variants, listed inside the item.
//   signature true puts the item in the "Signatures" rail near the top of the page.

const img = (path) => `https://res.cloudinary.com/dmpulmnb9/image/upload/${path}`

const NEW = {
  tacos: img('v1790594440/circle-menu/tacos.jpg'),
  linguine: img('v1790594445/circle-menu/seafood-linguine.jpg'),
  mojito: img('v1790594448/circle-menu/mojito.jpg'),
  negroni: img('v1790594452/circle-menu/negroni.jpg'),
  longIsland: img('v1790594460/circle-menu/long-island-ice-tea.jpg'),
  daiquiri: img('v1790594471/circle-menu/daiquiri.jpg'),
}

export const menuData = [
  {
    id: 'starters',
    name: 'Starters & Garden',
    label: 'Starters',
    blurb: 'Small plates to share while the table settles in.',
    layout: 'bento',
    groups: [
      {
        name: 'Starters',
        items: [
          { id: 's-butter-yam', name: 'Butter Yam', price: 10000, desc: 'Golden yam, cooked in butter and served hot with a creamy dip.', image: img('v1782012577/butter-yam_os7clp.jpg') },
          { id: 's-shrimp-tempura', name: 'Shrimp Tempura', price: 15000, desc: 'Shrimps in a light, crispy tempura batter, with fries and dipping sauces.', image: img('v1782012812/Shrimps_Temporal_kfikix.jpg') },
          { id: 's1', name: 'Chicken Quesadilla', price: 15000, desc: 'Char-grilled chicken, cheddar cheese and caramelized onion, served with guacamole.', image: img('v1779826038/chicken-quesadilla_f6t0na.jpg') },
          { id: 's2', name: 'Tacos (Chicken or Seafood)', price: 15000, desc: 'Caramelized spicy chicken or seafood, topped with guacamole, pico de gallo and lime.', image: NEW.tacos, signature: true },
          { id: 's6', name: 'Seafood Tapas', price: 15000, desc: 'Sautéed spicy calamari and shrimps, served with garlic bread.', image: img('v1779655032/seafoodtapas_f8ewuo.jpg'), signature: true },
          { id: 's3', name: 'Spicy Snail', price: 15000, desc: 'Sautéed snails with pepper mix and provençal sauce, onion and tomato.' },
          { id: 's4', name: 'Spicy Wings', price: 15000, desc: 'Chicken wings tossed in spicy tomato sauce.' },
          { id: 's5', name: 'Butterfly Shrimps', price: 15000, desc: 'Deep fried shrimps coated in spicy sauce, finished with herbs.' },
        ],
      },
      {
        name: 'Circle Garden',
        items: [
          { id: 'cg1', name: 'Fruit Fusion', price: 15000, desc: 'A mix of fresh fruits, served with milk.' },
          { id: 'cg2', name: 'Chicken Salad', price: 15000, desc: 'Shredded chicken over mixed vegetables with a sweet and sour creamy dressing.' },
        ],
      },
    ],
  },
  {
    id: 'mains',
    name: 'Main Course',
    label: 'Mains',
    blurb: 'House signatures, poultry and seafood from the Circle kitchen.',
    layout: 'plates',
    groups: [
      {
        name: 'Circle Signatures',
        items: [
          { id: 'm2', name: 'Asun Jollof Rice', price: 25000, desc: 'Smoky jollof rice with spicy peppered goat meat.', image: img('v1779655030/asun-rice_mrn1ni.jpg'), signature: true },
          { id: 'm1', name: 'Signature Rice', price: 25000, desc: 'Signature rice with fajita sauce, sautéed chicken breast, bell pepper and sweet chilli.' },
          { id: 'm4', name: 'Circle Platter', price: 70000, desc: 'Yam fries, plantain fries, rice, chicken wings, snail, prawns, puff puff, samosa and spring rolls.' },
        ],
      },
      {
        name: 'Poultry',
        items: [
          { id: 'p2', name: 'Half Grilled Chicken', price: 30000, desc: 'Oven roasted half chicken tossed in tomato sauce, served with jollof rice.', image: img('v1779825981/half-grilled-chicken_gg7iji.jpg'), signature: true },
          { id: 'p1', name: 'Crispy Chicken', price: 20000, desc: 'Deep fried chicken served with French fries and coleslaw.', image: img('v1779826357/crispy-chicken_jzbdux.jpg') },
          { id: 'p3', name: 'Turkey Jollof', price: 20000, desc: 'Fried turkey tossed in spicy tomato sauce, served with Circle special fried rice.' },
        ],
      },
      {
        name: 'Seafood',
        items: [
          { id: 'sf1', name: 'Grilled Croaker', price: 30000, desc: 'Whole grilled croaker with our signature pepper sauce, served with yam fries.', image: img('v1779826297/grilled-croaker_z7gnti.jpg') },
          { id: 'sf3', name: 'King Prawns', price: 30000, desc: 'Grilled jumbo prawns with creamy sauce, vegetables and French fries.' },
        ],
      },
    ],
  },
  {
    id: 'pasta_steak',
    name: 'Pasta & Steak',
    label: 'Pasta & Steak',
    blurb: 'Slow sauces, fresh pasta and Australian cuts off the grill.',
    layout: 'preview',
    groups: [
      {
        name: 'Pasta',
        items: [
          { id: 'pa2', name: 'Seafood Linguine', price: 25000, desc: 'Linguine tossed in red wine with calamari and shrimps, in spicy tomato or creamy sauce.', image: NEW.linguine, signature: true },
          { id: 'pa1', name: 'Spaghetti Bolognaise', price: 25000, desc: 'Spaghetti in spicy tomato sauce with minced beef or chicken.', image: img('v1779825958/spaghetti-bolon_sd3mip.jpg') },
          { id: 'pa3', name: 'Chicken Alfredo Pasta', price: 25000, desc: 'Spaghetti tossed in white wine and a creamy Alfredo sauce.' },
        ],
      },
      {
        name: 'Steak',
        items: [
          { id: 'st2', name: 'T-Bone Steak', price: 50000, desc: 'Grilled Australian T-bone with steak sauce, mashed potato and steamed vegetables.', image: img('v1782012751/t-bone_steak_t8bzq3.jpg'), signature: true },
          { id: 'st1', name: 'Lamb Chops', price: 50000, desc: 'Grilled Australian lamb chops with creamy mashed potato, steak sauce and steamed vegetables.' },
        ],
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts & Sides',
    label: 'Desserts',
    blurb: 'Something sweet to finish, and sides for the table.',
    layout: 'card',
    groups: [
      {
        name: 'Desserts',
        items: [
          { id: 'd1', name: 'Oreo Madness', price: 15000, desc: 'A rich Oreo dessert for serious sweet cravings.' },
          { id: 'd2', name: 'Cheesecake', price: 15000, desc: 'Classic creamy cheesecake.' },
          { id: 'd3', name: 'Ice Cream', price: 5000, desc: 'Premium ice cream scoops.' },
        ],
      },
      {
        name: 'Sides',
        items: [
          { id: 'sd1', name: 'Sides', desc: 'Add any of these to your plate.', sides: ['Jollof Rice', 'Fried Rice', 'French Fries', 'Yam Fries', 'Mashed Potato', 'Sautéed Veg', 'Plantain Fries'] },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    label: 'Drinks',
    blurb: 'Cocktails, mocktails and milkshakes, made at the bar.',
    layout: 'bar',
    groups: [
      {
        name: 'Cocktails',
        items: [
          { id: 'dr-skull', name: 'Skull Signature Cocktail', price: 15000, desc: 'Our signature, served in a skull glass. What is inside stays a surprise until it lands on your table.', image: img('v1779829956/skull_dhtfwo.jpg'), signature: true },
          { id: 'dr-martyr', name: 'Martyr', price: 10000, desc: 'A Circle house cocktail. Ask the bar what goes into it.', image: img('v1787172297/image_ge1fmr.png') },
          { id: 'c1', name: 'Mojito', price: 10000, desc: 'White rum, fresh mint, lime and soda over crushed ice.', image: NEW.mojito },
          { id: 'c2', name: 'Negroni', price: 10000, desc: 'Gin, Campari and sweet vermouth.', image: NEW.negroni },
          { id: 'dr-rainbow', name: 'Rainbow Cocktail', price: 10000, desc: 'Layered, colourful and sweet.', image: img('v1779890041/Rainbow_Cocktail_vfhgqb.jpg') },
          { id: 'c3', name: 'Long Island Iced Tea', price: 10000, desc: 'Vodka, gin, rum, tequila and triple sec with lemon and cola.', image: NEW.longIsland },
          { id: 'dr-blue-lady', name: 'Blue Lady', price: 10000, desc: 'Bright blue, smooth and refreshing.', image: img('v1779889654/Blue_Lady_hkesyl.jpg') },
          { id: 'c9', name: 'Daiquiri', price: 10000, desc: 'White rum, fresh lime and sugar, served up.', image: NEW.daiquiri },
          { id: 'dr-pina', name: 'Piña Colada', price: 10000, desc: 'Rum, coconut cream and pineapple juice.', image: img('v1779826932/Pinnacollada_xakgxm.jpg') },
          { id: 'dr-pornstar', name: 'Pornstar Martini', price: 10000, desc: 'Vanilla vodka, Passoã, passion fruit and lime.', image: img('v1779826971/pornstarmartin_msjn5c.jpg') },
          { id: 'c6', name: 'Sex on the Beach', price: 10000, desc: 'Vodka, peach schnapps, orange and cranberry.', image: img('v1787168056/image_copy_w5a2oh.png') },
          { id: 'c7', name: 'Tequila Sunrise', price: 10000, desc: 'Tequila, orange juice and grenadine.', image: img('v1787168050/image_he0q3u.png') },
          { id: 'c12', name: 'Mimosa', price: 10000, desc: 'Sparkling wine and fresh orange juice.', image: img('v1787168048/image_copy_2_f6ruyp.png') },
          { id: 'dr-circle-zombie', name: 'Circle Zombie', price: 15000, desc: 'Our signature take on the classic Zombie.' },
          { id: 'c4', name: 'Margarita', price: 10000, desc: 'Tequila, triple sec and lime.' },
          { id: 'c5', name: 'Screwdriver', price: 10000, desc: 'Vodka and orange juice.' },
          { id: 'c8', name: 'Moscow Mule', price: 10000, desc: 'Vodka, ginger beer and lime.' },
          { id: 'c10', name: 'Old Fashioned', price: 10000, desc: 'Whiskey, sugar and bitters.' },
          { id: 'c11', name: 'Cosmopolitan', price: 10000, desc: 'Vodka, triple sec, cranberry and lime.' },
          { id: 'c13', name: 'Mai Tai', price: 10000, desc: 'Rum, orange liqueur, lime and orgeat.' },
          { id: 'c14', name: 'Black Russian', price: 10000, desc: 'Vodka and coffee liqueur.' },
          { id: 'c15', name: 'Gimlet', price: 10000, desc: 'Gin and lime.' },
          { id: 'c16', name: 'Whiskey Sour', price: 10000, desc: 'Whiskey, lemon and sugar.' },
          { id: 'c17', name: 'Rum Punch', price: 10000, desc: 'Rum with tropical fruit juices.' },
          { id: 'c18', name: 'Discretion', price: 10000, desc: 'A Circle house cocktail.' },
        ],
      },
      {
        name: 'Mocktails',
        items: [
          { id: 'mk1', name: 'Frozen Strawberry Daiquiri', price: 8000, desc: 'Frozen strawberry and lime, alcohol free.', image: img('v1779830025/Frozen_Strawberry_daiquiri_le9kqw.jpg') },
          { id: 'mk4', name: 'Virgin Blue Lagoon', price: 8000, desc: 'Blue curaçao syrup, lemonade and lime.', image: img('v1787172347/image_copy_j2x3rm.png') },
          { id: 'mk2', name: 'Virgin Colada', price: 8000, desc: 'Coconut cream and pineapple juice.' },
          { id: 'mk3', name: 'Chapman', price: 8000, desc: 'The Nigerian classic, fruity and fizzy.' },
          { id: 'mk5', name: 'Virgin Mojito', price: 8000, desc: 'Mint, lime and soda.' },
          { id: 'mk6', name: 'Shirley Temple', price: 8000, desc: 'Ginger ale and grenadine.' },
          { id: 'mk7', name: 'Arnold Palmer', price: 8000, desc: 'Iced tea and lemonade.' },
          { id: 'mk8', name: 'Roy Rogers', price: 8000, desc: 'Cola and grenadine.' },
          { id: 'mk9', name: 'Blueberry Mojito', price: 8000, desc: 'Blueberry, mint, lime and soda.' },
          { id: 'mk10', name: 'Virgin Sangria', price: 8000, desc: 'Fruit juices and fresh fruit.' },
        ],
      },
      {
        name: 'Milkshakes',
        items: [
          { id: 'ms1', name: 'Creamy Banana', price: 10000, desc: 'Banana milkshake.' },
          { id: 'ms2', name: 'Chocolate', price: 10000, desc: 'Chocolate milkshake.' },
          { id: 'ms3', name: 'Vanilla', price: 10000, desc: 'Vanilla milkshake.' },
          { id: 'ms4', name: 'Strawberry', price: 10000, desc: 'Strawberry milkshake.' },
          { id: 'ms5', name: 'Banana Strawberry', price: 10000, desc: 'Banana and strawberry milkshake.' },
        ],
      },
      {
        name: 'Soft Drinks & Shisha',
        items: [
          { id: 'o4', name: 'Orange Juice', price: 10000, desc: 'Freshly squeezed.' },
          { id: 'o1', name: 'Coke', price: 1000, desc: 'Chilled.' },
          { id: 'o2', name: 'Power Horse', price: 3000, desc: 'Energy drink.' },
          { id: 'o3', name: 'Nestlé Water', price: 1000, desc: 'Still water.' },
          { id: 'o5', name: 'Shisha', price: 18000, desc: 'Premium shisha, prepared at your table.' },
          { id: 'o6', name: 'Extra Coal', price: 5000, desc: 'For your shisha.' },
        ],
      },
    ],
  },
  {
    id: 'spirits',
    name: 'Spirits & Wine',
    label: 'Spirits',
    blurb: 'Bottles for the table and shots for the moment.',
    layout: 'cellar',
    groups: [
      {
        name: 'Shots',
        items: [
          { id: 'sp-b52', name: 'B52', price: 5000, desc: 'Coffee liqueur, Irish cream and orange liqueur, layered.', image: img('v1779889721/B52_cmkt84.jpg') },
          { id: 'sp-alien-brain', name: 'Alien Brain', price: 5000, desc: 'A layered shot with a striking look.', image: img('v1779889561/Alien_Brain_ellgdc.jpg') },
          { id: 'sp-love-drop', name: 'Love Lemon Drop', price: 5000, desc: 'Sweet and sour, with a creamy top.', image: img('v1779889430/love-lemon-drop_lighqr.jpg') },
          {
            id: 'sp5', name: 'Classic Shots', desc: 'By the glass.',
            options: [
              { name: 'Tequila', price: 4000 },
              { name: 'Bacardi', price: 4000 },
              { name: 'Whiskey', price: 6000 },
            ],
          },
        ],
      },
      {
        name: 'Champagne',
        items: [
          {
            id: 'sp7', name: 'Champagne & Sparkling', desc: 'By the bottle.',
            options: [
              { name: 'Ace of Spades', price: 750000 },
              { name: 'Dom Pérignon', price: 700000 },
              { name: 'Moët Rosé', price: 225000 },
              { name: 'Veuve Clicquot', price: 225000 },
              { name: 'Belaire Rosé', price: 153000 },
              { name: 'Blue Nun', price: 54000 },
              { name: 'Martini Rosé', price: 45000 },
              { name: 'Martini Asti', price: 45000 },
              { name: 'Alita', price: 40000 },
              { name: 'Chamdor', price: 20000 },
            ],
          },
        ],
      },
      {
        name: 'Whiskey',
        items: [
          {
            id: 'sp1', name: 'Whiskey', desc: 'By the bottle.',
            options: [
              { name: 'Glen 21 Years', price: 600000 },
              { name: 'Glen 18 Years', price: 225000 },
              { name: 'Glen 15 Years', price: 153000 },
              { name: 'Johnnie Walker Gold Label', price: 135000 },
              { name: 'Jameson Black Barrel', price: 72000 },
              { name: 'The Observatory', price: 65000 },
              { name: 'Jameson Green', price: 59000 },
              { name: 'William Lawson', price: 59000 },
              { name: 'Jack Daniel’s', price: 54000 },
            ],
          },
        ],
      },
      {
        name: 'Cognac',
        items: [
          {
            id: 'sp8', name: 'Cognac', desc: 'By the bottle.',
            options: [
              { name: 'Hennessy VSOP', price: 225000 },
              { name: 'Martell Blue Swift', price: 171000 },
              { name: 'Deau VSOP', price: 160000 },
              { name: 'Hennessy VS', price: 108000 },
              { name: 'Martell VS', price: 108000 },
              { name: 'Deau VS', price: 100000 },
            ],
          },
        ],
      },
      {
        name: 'Tequila',
        items: [
          {
            id: 'sp6', name: 'Tequila & Rum', desc: 'By the bottle.',
            options: [
              { name: 'Don Julio', price: 600000 },
              { name: 'Clase Azul', price: 600000 },
              { name: 'Casamigos', price: 320000 },
              { name: 'Olmeca Gold', price: 55000 },
              { name: 'Olmeca Silver', price: 50000 },
              { name: 'Bacardi', price: 40000 },
            ],
          },
        ],
      },
      {
        name: 'Vodka & Liqueur',
        items: [
          {
            id: 'sp3', name: 'Vodka', desc: 'By the bottle.',
            options: [
              { name: 'Cîroc', price: 126000 },
              { name: 'Grey Goose', price: 100000 },
            ],
          },
          {
            id: 'sp4', name: 'Liqueur', desc: 'By the bottle.',
            options: [
              { name: 'Baileys', price: 45000 },
              { name: 'Jägermeister', price: 45000 },
            ],
          },
        ],
      },
      {
        name: 'Wine',
        items: [
          {
            id: 'sp2', name: 'Wine', desc: 'By the bottle.',
            options: [
              { name: 'Carlo Rossi', price: 30000 },
              { name: 'Don Alvaro', price: 30000 },
              { name: 'Declan', price: 30000 },
              { name: 'Friends & Family', price: 25000 },
            ],
          },
        ],
      },
    ],
  },
]

// Every item knows where it lives, so the dish sheet and search can label it.
for (const section of menuData) {
  for (const group of section.groups) {
    for (const item of group.items) {
      Object.assign(item, { sectionId: section.id, sectionName: section.name, groupName: group.name })
    }
  }
}

export const allItems = menuData.flatMap((section) => section.groups.flatMap((group) => group.items))

export const signatureItems = allItems.filter((item) => item.signature && item.image)

export const restaurant = {
  name: 'Circle Restaurant & Lounge',
  phone: '+234 811 000 0069',
  phoneHref: 'tel:+2348110000069',
  addressLines: ['Benin City Mall (Shoprite)', '18 Central Rd., Benin City'],
  mapsHref: 'https://maps.app.goo.gl/Xa7r6bzbPF4x84tU9',
  instagram: 'circle_benin',
  instagramHref: 'https://www.instagram.com/circle_benin/',
  hours: [
    { days: 'Mon - Thu', time: '12:00 - 23:00' },
    { days: 'Fri - Sat', time: '12:00 - 01:00' },
    { days: 'Sun', time: '13:00 - 22:00' },
  ],
}
