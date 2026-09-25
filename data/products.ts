// data/products.ts
export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Leather Backpack",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=60",
    description: "Durable and stylish everyday backpack crafted from genuine leather.",
    price: "$79.99",
  },
  {
    id: "2",
    name: "Wireless Noise-Canceling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    description: "Immersive sound experience with premium active noise cancellation.",
    price: "$199.99",
  },
  {
    id: "3",
    name: "Minimalist Mechanical Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    description: "Elegant timepiece with a genuine leather strap and sapphire crystal.",
    price: "$149.50",
  },
  {
    id: "4",
    name: "Smart Fitness Tracker",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60",
    description: "Track your steps, heart rate, and sleep quality 24/7 with ease.",
    price: "$49.99",
  },
  {
    id: "5",
    name: "Ergonomic Aluminium Laptop Stand",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
    description: "Improve your posture with an adjustable and portable desk mount.",
    price: "$35.00",
  },
  {
    id: "6",
    name: "Ceramic Coffee Mug Set",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60",
    description: "Handcrafted matte ceramic mugs perfect for your daily brew.",
    price: "$24.99",
  },
];