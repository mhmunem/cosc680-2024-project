const products = [
    "Organic Bananas", "Whole Milk", "Large Brown Eggs", "Wheat Bread", "Ground Coffee",
    "Red Apples", "Greek Yogurt", "Chicken Breast", "Baby Spinach", "Orange Juice",
    "Pasta Sauce", "Spaghetti", "Ground Beef", "White Rice", "Black Beans",
    "Cheddar Cheese", "Butter", "Carrots", "Onions", "Garlic",
    "Tomatoes", "Potatoes", "Sweet Potatoes", "Bell Peppers",
    "Salt", "Black Pepper", "Sugar", "Flour", "Baking Powder",
    "Vanilla Extract", "Honey", "Maple Syrup", "Peanut Butter", "Strawberry Jam",
    "Cereal", "Oatmeal", "Granola", "Almonds", "Walnuts",
    "Potato Chips", "Tortilla Chips", "Salsa", "Hummus", "Crackers",
    "Paper Towels", "Toilet Paper", "Dish Soap", "Laundry Detergent", "Trash Bags",
    "Salmon Fillet", "Tuna", "Shrimp", "Tilapia", "Cod",
    "Broccoli", "Cauliflower", "Asparagus", "Green Beans", "Peas",
    "Lettuce", "Kale", "Arugula", "Mixed Greens", "Cucumber",
    "Zucchini", "Eggplant", "Mushrooms", "Celery", "Corn",
    "Avocados", "Limes", "Lemons", "Oranges", "Grapefruit",
    "Strawberries", "Blueberries", "Raspberries", "Blackberries", "Grapes",
    "Watermelon", "Cantaloupe", "Honeydew", "Pineapple", "Mango",
    "Bacon", "Ham", "Turkey", "Salami", "Pepperoni",
    "Cream Cheese", "Mozzarella", "Swiss Cheese", "Parmesan", "Feta",
    "Sour Cream", "Heavy Cream", "Half & Half", "Almond Milk", "Soy Milk",
    "Brown Sugar", "Powdered Sugar", "Baking Soda", "Yeast", "Cornstarch",
    "Ketchup", "Mustard", "Mayonnaise", "BBQ Sauce", "Hot Sauce",
    "Soy Sauce", "Fish Sauce", "Worcestershire Sauce", "Vinegar", "Olive Oil",
    "Canola Oil", "Vegetable Oil", "Coconut Oil", "Sesame Oil", "Cooking Spray",
    "Rice Vinegar", "Apple Cider Vinegar", "Balsamic Vinegar", "Red Wine Vinegar", "White Vinegar",
    "Chicken Stock", "Beef Stock", "Vegetable Stock", "Tomato Paste", "Diced Tomatoes",
    "Coconut Milk", "Condensed Milk", "Evaporated Milk", "Almond Extract", "Mint Extract",
    "Cinnamon", "Nutmeg", "Ginger", "Cumin", "Paprika",
    "Oregano", "Basil", "Thyme", "Rosemary", "Bay Leaves",
    "Chili Powder", "Curry Powder", "Turmeric", "Cayenne Pepper", "Red Pepper Flakes",
    "Bagels", "English Muffins", "Tortillas", "Pita Bread", "Naan",
    "Croissants", "Dinner Rolls", "Hot Dog Buns", "Hamburger Buns", "Sandwich Bread",
    "Pasta Shells", "Penne", "Linguine", "Fettuccine", "Lasagna Noodles",
    "Rice Noodles", "Egg Noodles", "Ramen Noodles", "Udon Noodles", "Soba Noodles",
    "Quinoa", "Couscous", "Barley", "Lentils", "Split Peas",
    "Chickpeas", "Kidney Beans", "Pinto Beans", "Navy Beans", "Cannellini Beans",
    // "Pork Chops", "Lamb Chops", "Ribeye Steak", "Sirloin Steak", "Ground Turkey",
    // "Ground Pork", "Italian Sausage", "Bratwurst", "Hot Dogs", "Tofu",
    // "Tempeh", "Seitan", "Beyond Meat", "Impossible Burger", "Veggie Burgers",
    // "Ice Cream", "Frozen Yogurt", "Sorbet", "Popsicles", "Frozen Pizza", //
    // "Frozen Vegetables", "Frozen Fruit", "Frozen Waffles", "Frozen Pancakes", "TV Dinners",
    // "Chips Ahoy", "Oreos", "Animal Crackers", "Saltines",
    // "Ritz Crackers", "Wheat Thins", "Triscuits", "Goldfish", "Cheez-Its",
    // "M&Ms", "Snickers", "Twix", "KitKat", "Reese's Cups",
    // "Skittles", "Starburst", "Gummy Bears", "Jelly Beans", "Lifesavers",
    // "Cola", "Lemon-Lime Soda", "Root Beer", "Ginger Ale", "Club Soda",
    // "Tonic Water", "Energy Drinks", "Sports Drinks", "Sparkling Water", "Spring Water",
    // "Green Tea", "Black Tea", "Chamomile Tea", "Earl Grey Tea", "Herbal Tea",
    // "Coffee Beans", "Instant Coffee", "Coffee Filters", "Creamer", "Sugar Packets",
    // "Protein Powder", "Vitamin C", "Multivitamins", "Fish Oil", "Probiotics",
    // "Band-Aids", "Cotton Swabs", "Dental Floss", "Toothpaste", "Mouthwash",
    // "Shampoo", "Conditioner", "Body Wash", "Hand Soap", "Deodorant", //
    // "Aluminum Foil", "Plastic Wrap", "Sandwich Bags", "Storage Containers", "Paper Plates",
    // "Plastic Cups", "Napkins", "Dish Sponges", "All-Purpose Cleaner", "Glass Cleaner",
    // "Cat Food", "Dog Food", "Cat Litter", "Pet Treats", "Pet Toys",
    // "Baby Formula", "Baby Food", "Diapers", "Baby Wipes", "Baby Powder",
    // "Granola Bars", "Protein Bars", "Energy Bars", "Trail Mix", "Mixed Nuts",
    // "Popcorn", "Pretzels", "Rice Cakes", "Beef Jerky", "Dried Fruit",
    // "Pickles", "Olives", "Pepperoncini", "Jalapeños", "Banana Peppers",
    // "Artichoke Hearts", "Sun-Dried Tomatoes", "Roasted Red Peppers", "Capers", "Water Chestnuts",
    // "Bamboo Shoots", "Bean Sprouts", "Baby Corn", "Palm Hearts", "Sauerkraut",
    // "Kimchi", "Miso Paste", "Tahini", "Anchovy Paste", "Horseradish",
    // "Wasabi", "Sriracha", "Hoisin Sauce", "Oyster Sauce", "Sweet Chili Sauce",
    // "Teriyaki Sauce", "Alfredo Sauce", "Pesto", "Marinara Sauce", "Vodka Sauce",
    // "Ranch Dressing", "Italian Dressing", "Caesar Dressing", "Blue Cheese Dressing", "Thousand Island",
    // "Brownie Mix", "Cake Mix", "Pancake Mix", "Muffin Mix", "Cookie Mix",
    // "Pie Crust", "Whipped Cream", "Chocolate Chips", "Sprinkles", "Food Coloring",
    // "Marshmallows", "Graham Crackers", "Gelatin", "Pudding Mix", "Frosting",
    // "Nuts & Seeds Mix", "Sunflower Seeds", "Pumpkin Seeds", "Chia Seeds", "Flax Seeds",
    // "Dried Cranberries", "Dried Apricots", "Dried Mango", "Dried Pineapple", "Raisins",
    // "Dates", "Figs", "Prunes", "Coconut Flakes", "Goji Berries",
]

const dates = [
    '2024-01-01', '2024-01-02', '2024-01-03',
    '2024-01-04', '2024-01-05', '2024-01-06',
    '2024-01-07', '2024-01-08', '2024-01-09',
    '2024-01-10', '2024-01-11', '2024-01-12',
    '2024-01-13', '2024-01-14', '2024-01-15',
    '2024-01-16', '2024-01-17', '2024-01-18',
    '2024-01-19', '2024-01-20', '2024-01-21',
    '2024-01-22', '2024-01-23', '2024-01-24',
    '2024-01-25', '2024-01-26', '2024-01-27',
    '2024-01-28', '2024-01-29', '2024-01-30',
    '2024-01-31'
]


const stores = [
    "Woolworths Amberley", "Woolworths Andersons Bay", "Woolworths Aotea",
    "Woolworths Ashburton", "Woolworths Ashburton South", "Woolworths Auckland Airport",
    "Woolworths Auckland Quay Street", "Woolworths Auckland Victoria Street West", "Woolworths Avonhead",
    "Woolworths Awapuni", "New World Alexandra", "New World Aokautere",
    "New World Ashburton", "New World Balclutha", "New World Birkenhead",
    "New World Bishopdale", "New World Blenheim", "New World Botany",
    "PAK\'nSAVE Albany", "PAK\'nSAVE Alderman Dr Hen", "PAK\'nSAVE Blenheim",
    "PAK\'nSAVE Botany", "PAK\'nSAVE Cameron Road", "PAK\'nSAVE Clarence St",
    "PAK\'nSAVE Clendon", "PAK\'nSAVE Dunedin", "PAK\'nSAVE Glen Innes",
    "PAK\'nSAVE Hastings", "PAK\'nSAVE Hawera", "The Warehouse",
    "Fresh Choice Avondale", "Fresh Choice Flat Bush", "Fresh Choice Geraldine",
    "Fresh Choice Glen Eden", "Fresh Choice Green Island", "Fresh Choice Greerton",
    "Fresh Choice Greytown", "Fresh Choice Half Moon Bay", "Fresh Choice Huntly",
    "Fresh Choice Kelly Road", "Super Value Bell Block", "Super Value Milton",
    "Super Value Pauanui", "Super Value Plaza", "Super Value Reefton",
    "Super Value Tinwald", "Super Value Wanganuik",
]

const chains = [
    "New World",
    "Pak'n Save",
    "Wools Worth",
    "The Warehouse",
    "Fresh Choice",
    "Super Value",
]

const category = [
    "Fruit & Veg",
    "Meat",
    "Fish",
    "Deli",
    "Bakery",
    "Frozen",
    "Pantry",
    "Beer & Wine",
    "Drinks",
    "Household",
    "Baby & Child",
    "Health & Body",
]

const units = [
    "l",
    "kg",
    "ea",
]

// count needs to be equal or less than the number of values when `isUnique: true`
const seed_data_dev = (f: any) => ({
    products: {
        count: products.length,
        columns: {
            name: f.valuesFromArray({
                values: products,
                isUnique: true,
            }),
            brand: f.valuesFromArray({
                values: [
                    "Value", "Pams", "Maggi", "Pams Finest", "Copenhagen",
                    "Universal", "Bikano", "Trident", "Noodle Co", "Inaka Soba",
                    "Sizzlers", "Karikaas", "Doritos", "Rolling Meadow", "Black Beans",
                    "Heartland", "McCain", "Hellers", "Orion", "Littos"
                ],
            }),
            details: f.valuesFromArray({
                values: [
                    "description 1",
                    "description 2",
                    "description 3",
                    "description 4",
                    "description 5",
                ],
            }),
            amount: f.number({
                minValue: 1,
                precision: 100,
                maxValue: 10,
            }),
        },
        with: {
            price_history: 31,
        },
    },
    stores: {
        count: stores.length,
        columns: {
            name: f.valuesFromArray({
                values: stores,
                isUnique: true,
            }),
        },
    },
    chains: {
        count: chains.length,
        columns: {
            name: f.valuesFromArray({
                values: chains,
                isUnique: true,
            }),
        },
    },
    store_products: {
        // count: stores.length * chains.length * products.length,
        count: 100,
        columns: {
            price: f.number({
                minValue: 1,
                precision: 100,
                maxValue: 20,
            }),
        },
    },
    category: {
        count: category.length,
        columns: {
            name: f.valuesFromArray({
                values: category,
                isUnique: true,
            }),
        },
    },
    units: {
        count: units.length,
        columns: {
            name: f.valuesFromArray({
                values: units,
                isUnique: true,
            }),
        },
    },
    // price_history: {
    //     columns: {
    //         date: f.valuesFromArray({
    //             values: dates,
    //             isUnique: true
    //         }),
    //         price: f.number({
    //             minValue: 1,
    //             precision: 100,
    //             maxValue: 1000,
    //         }),
    //     },
    // },
    shopping_list: {
        count: 10,
        columns: {
            amount: f.int({
                minValue: 1,
                maxValue: 10,
            }),
        }
    },
})


export default seed_data_dev
