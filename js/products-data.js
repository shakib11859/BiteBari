const INITIAL_PRODUCTS_DATA = {
    "cake10": {
        "name": "Vanilla With Light Chocolate Cake",
        "price": "850.00",
        "image": "img/product/10.png",
        "description": "A delightful blend of classic vanilla and light chocolate sponge, layered with creamy frosting. Perfect for any celebration.",
        "rating": 5,
        "inStock": true
    },
    "cake5": {
        "name": "Vanilla Cup Cake (with Cream)",
        "price": "20.00",
        "image": "img/product/5.png",
        "description": "Soft and fluffy vanilla cupcakes topped with a rich, velvety cream frosting. A bite-sized treat for everyone.",
        "rating": 5,
        "inStock": true
    },
    "cake8": {
        "name": "Vanilla With Light Chocolate Cake",
        "price": "850.00",
        "image": "img/product/8.png",
        "description": "Our signature vanilla cake with a touch of chocolate drizzle. Light, moist, and absolutely delicious.",
        "rating": 5,
        "inStock": true
    },
    "cake13": {
        "name": "Chocolate Cake (with Candle)",
        "price": "1000.00",
        "image": "img/product/13.png",
        "description": "Celebrate with our premium chocolate cake. Includes a celebratory candle. Rich cocoa flavor in every bite.",
        "rating": 5,
        "inStock": true
    },
    "cake6": {
        "name": "Birthday Doll Cake (3Pound)",
        "price": "2200.00",
        "image": "img/product/6.png",
        "description": "A beautiful doll-themed cake perfect for birthday celebrations. Handcrafted with precision and love.",
        "rating": 5,
        "inStock": true
    },
    "cake9": {
        "name": "Sweet Holud Story Cake (1.5 Pound)",
        "price": "1000.00",
        "image": "img/product/9.png",
        "description": "Perfect for Gaye Holud ceremonies. A traditional flavor with a modern twist for your special celebration.",
        "rating": 5,
        "inStock": true
    },
    "cake4": {
        "name": "Vanilla With Chocolate Cake (with Candle)",
        "price": "1000.00",
        "image": "img/product/4.png",
        "description": "The best of both worlds with vanilla and chocolate layers, complete with a candle for your special moment.",
        "rating": 5,
        "inStock": true
    },
    "scake2": {
        "name": "Slice Cake (1Pound)",
        "price": "250.00",
        "image": "img/product/3.png",
        "description": "A high-quality slice of our specialized pound cake. Rich texture and perfectly balanced sweetness.",
        "rating": 5,
        "inStock": false
    },
    "cake11": {
        "name": "Vanilla Cake (1Pound)",
        "price": "600.00",
        "image": "img/product/11.png",
        "description": "Simple yet elegant, our 1-pound vanilla cake is seasoned with the finest vanilla extract for a pure taste.",
        "rating": 5,
        "inStock": true
    },
    "Scake1": {
        "name": "Butterfly Bliss Cake",
        "price": "1800.00",
        "image": "img/product/1.png",
        "description": "Elegant butterfly-themed cake that brings bliss to every bite. Light and airy texture with premium decorations.",
        "rating": 5,
        "inStock": true
    },
    "cake12": {
        "name": "Chocolate Cake (1Pound)",
        "price": "800.00",
        "image": "img/product/12.png",
        "description": "Deep chocolate flavor with a smooth finish. Our 1-pound cake is a crowd favorite.",
        "rating": 5,
        "inStock": true
    },
    "Cupcake1": {
        "name": "Chocolate Cup Cake (with Cream)",
        "price": "25.00",
        "image": "img/product/7.png",
        "description": "Decadent chocolate cupcakes topped with a swirl of fresh cream. Elegance in a cup.",
        "rating": 5,
        "inStock": true
    },
    "Cupcake": {
        "name": "Vanilla Cup Cake (min-6pcs)",
        "price": "15.00",
        "image": "img/product/2.png",
        "description": "Delicious vanilla cupcakes available in minimum 6 piece packs. Perfect for parties.",
        "rating": 5,
        "inStock": true
    },
    "Cake14": {
        "name": "Chocolate Cake (1Pound)",
        "price": "800.00",
        "image": "img/product/14.jpg",
        "description": "Classic chocolate cake with a rustic touch. Made with high-quality cocoa powder.",
        "rating": 5,
        "inStock": true
    },
    "Cake15": {
        "name": "Cotton Candy Swirl Cake 2 Pounds",
        "price": "1200.00",
        "image": "img/product/15.png",
        "description": "Vibrant cotton candy flavors swirled into a moist sponge. A colorful and tasty favorite for kids and adults alike.",
        "rating": 5,
        "inStock": true
    },
    "Cake16": {
        "name": "Pink Heart Bliss Cake 1 Pound",
        "price": "600.00",
        "image": "img/product/16.png",
        "description": "Show your love with this heart-shaped cake. Delicate pink frosting and soft, delicious layers.",
        "rating": 5,
        "inStock": true
    },
    "Cake17": {
        "name": "Golden Cream Pastry Cake",
        "price": "50.00",
        "image": "img/product/17.png",
        "description": "Light, flaky pastry layers filled with our signature golden cream. A perfect quick snack for any time of day.",
        "rating": 5,
        "inStock": true
    },
    "Sweet": {
        "name": "Sweet (Upcoming)",
        "price": "00.00",
        "image": "img/product/19.png",
        "description": "Something sweet is coming soon! Stay tuned for our new range of traditional sweets.",
        "rating": 5,
        "inStock": false
    },
    "cake20": {
        "name": "Mini Jar Cake",
        "price": "50.00",
        "image": "img/product/20.png",
        "description": "Portable sweetness! Our signature cake layered with fresh cream in a convenient mini jar. Perfect on the go.",
        "rating": 5,
        "inStock": true
    }
};

// --- LocalStorage State Management ---
function initProducts() {
    const stored = localStorage.getItem('BITEBARI_PRODUCTS');
    if (stored) {
        window.PRODUCTS_DATA = JSON.parse(stored);
    } else {
        window.PRODUCTS_DATA = INITIAL_PRODUCTS_DATA;
        saveProducts();
    }
}

function saveProducts() {
    localStorage.setItem('BITEBARI_PRODUCTS', JSON.stringify(window.PRODUCTS_DATA));
}

// Initialize on load
initProducts();
