// Seeding the database with food categories
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function seed() {
//     const categories = [
//         { name: 'Good for Dinner', slug: 'good-for-dinner', price: 0.00 },
//         { name: 'Italian Food', slug: 'italian-food', price: 0.00 },
//         { name: 'American Food', slug: 'american-food', price: 0.00 },
//         { name: 'Sea Food', slug: 'sea-food', price: 0.00 },
//         { name: 'Dessert', slug: 'dessert', price: 0.00 },
//         { name: 'All Salad Menu', slug: 'all-salad-food', price: 0.00 },
//         { name: 'Vegetarian', slug: 'vegetarian', price: 0.00 },
//         { name: 'Dinner Grub', slug: 'dinner-grub', price: 0.00 },
//         { name: 'Lunch Grub', slug: 'lunch-grub', price: 0.00 },
//         { name: 'Gluten Free', slug: 'gluten-free', price: 0.00 },
//         { name: 'Keto', slug: 'keto', price: 0.00 },
//         { name: 'Mediterranean', slug: 'mediterranean', price: 0.00 },
//         { name: 'African Food', slug: 'african-food', price: 0.00 },
//         { name: 'Vegan', slug: 'vegan', price: 0.00 },
//         { name: 'Chicken', slug: 'chicken', price: 0.00 },
//         { name: 'Beef', slug: 'beef', price: 0.00 },
//         { name: 'Low Calories', slug: 'low-calories', price: 0.00 },
//         { name: 'Low Carbs', slug: 'low-carbs', price: 0.00 },
//         { name: 'Diary Free', slug: 'diary-free', price: 0.00 },
//         { name: 'Asian Food', slug: 'asian-food', price: 0.00 },
//         { name: 'Latin American', slug: 'latin-american', price: 0.00 },
//     ];

//     for (const category of categories) {
//         await prisma.dish.upsert({
//             where: { slug: category.slug },
//             update: {},
//             create: {
//                 name: category.name,
//                 slug: category.slug,
//                 price: category.price,

//             },
//         });
//     }

//     console.log('Seeding finished.');
// }

// seed()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });


// Seeding the database with Categories

//TO SEED THE DB WITH THIS LIST, SCROLL DOWN TO COPY AND PASTE THE SEED FUNCTION TO PACKAGE.JSON

const Categories = [
    'Books and Literature', 'DIY and Crafts', 'Learning', 'Pop Culture',
    'Environmentalism', 'Fashion and Beauty', 'Finance', 'Health and Wellness',
    'Food and Cooking', 'Lifestyle', 'Parenting', 'Photography', 'Current Events',
    'Relationships', 'Science and Technology', 'Sports and Fitness', 'Travel',
    'Entertainment', 'Food Photography', 'Healthy Eating', 'LGBTQ', 'Music',
    'Pets', 'Religion and Spirituality', 'Social Media', 'Spirituality', 'Style',
    'Television', 'Veganism', 'Wellness', 'Writing', 'American Culture',
    'European Culture', 'Japanese Culture', 'Middle Eastern Culture',
    'Mexican Culture', 'Indian Culture', 'Korean Culture', 'Australian Culture',
    'Chinese Culture',
];

async function seedCategories() {
    for (const categoryName of Categories) {
        const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
        try {
            await prisma.category.upsert({
                where: { slug },
                update: {},
                create: {
                    title: categoryName,
                    slug: slug,
                }
            });
            console.log(`Category "${categoryName}" inserted successfully.`);
        } catch (error) {
            console.error(`Error creating category "${categoryName}":`, error);
        }
    }
}

async function seed() {
    try {
        await seedCategories();
        console.log("Categories seed data inserted successfully.");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();




// "type": "module",
// "prisma": {
//     "seed": "node prisma/posts.js"
//   },
// npm run seed