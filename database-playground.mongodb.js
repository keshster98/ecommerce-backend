// /* Create/Use database */
use("ecommerce");

// /* Create collection */
db.createCollection("products");

// /* Add products to database */
db.products.insertMany([
  {
    name: "PlayStation 5",
    description: "Next-gen console featuring high-speed SSD and ray tracing.",
    price: 499.99,
    category: "678ca0f792a18bac4e08d907", // Consoles
  },
  {
    name: "Xbox Series X",
    description: "Microsoft's latest gaming console with 4K gaming.",
    price: 499.99,
    category: "678ca0f792a18bac4e08d907", // Consoles
  },
  {
    name: "Nintendo Switch OLED",
    description: "Portable gaming console with OLED display.",
    price: 349.99,
    category: "678ca0f792a18bac4e08d907", // Consoles
  },
  {
    name: "The Legend of Zelda: Breath of the Wild",
    description: "Open-world action-adventure game for the Nintendo Switch.",
    price: 59.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "God of War",
    description: "PlayStation exclusive action-adventure game.",
    price: 19.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "Halo Infinite",
    description: "First-person shooter game for Xbox and PC.",
    price: 59.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "DualSense Wireless Controller",
    description: "Next-gen controller for PlayStation 5.",
    price: 69.99,
    category: "678ca0fc92a18bac4e08d90b", // Accessories
  },
  {
    name: "Xbox Wireless Controller",
    description: "Wireless controller compatible with Xbox Series X|S.",
    price: 59.99,
    category: "678ca0fc92a18bac4e08d90b", // Accessories
  },
  {
    name: "Animal Crossing: New Horizons",
    description: "Life simulation video game for Nintendo Switch.",
    price: 59.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "PlayStation Plus Membership - 12 Months",
    description:
      "Subscription service for online multiplayer and monthly game releases.",
    price: 59.99,
    category: "678ca10292a18bac4e08d90f", // Subscriptions
  },
  {
    name: "Xbox Game Pass Ultimate - 3 Months",
    description: "Subscription service offering a large library of games.",
    price: 44.99,
    category: "678ca10292a18bac4e08d90f", // Subscriptions
  },
  {
    name: "Cyberpunk 2077",
    description: "Open-world, action-adventure game with RPG elements.",
    price: 29.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "Astro's Playroom",
    description: "3D platformer for the PlayStation 5.",
    price: 19.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "Ratchet & Clank: Rift Apart",
    description: "Action-adventure game exclusive for PlayStation 5.",
    price: 69.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "Mario Kart 8 Deluxe",
    description: "Racing game for the Nintendo Switch.",
    price: 59.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "Resident Evil Village",
    description: "Survival horror game available on multiple platforms.",
    price: 59.99,
    category: "678ca0f392a18bac4e08d903", // Games
  },
  {
    name: "PlayStation VR",
    description: "Virtual reality headset for PlayStation 4 and 5.",
    price: 299.99,
    category: "678ca0fc92a18bac4e08d90b", // Accessories
  },
  {
    name: "Oculus Quest 2",
    description: "All-in-one virtual reality headset.",
    price: 299.99,
    category: "678ca0fc92a18bac4e08d90b", // Accessories
  },
  {
    name: "Gaming Headset",
    description: "High-quality headset compatible with multiple platforms.",
    price: 99.99,
    category: "678ca0fc92a18bac4e08d90b", // Accessories
  },
  {
    name: "SSD Expansion for Xbox Series X",
    description: "1TB storage expansion specifically for Xbox Series X|S.",
    price: 219.99,
    category: "678ca0fc92a18bac4e08d90b", // Accessories
  },
]);
