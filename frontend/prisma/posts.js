import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//TO SEED THE DB WITH THIS LIST, SCROLL DOWN TO COPY AND PASTE THE SEED FUNCTION TO PACKAGE.JSON

async function seed() {
    try {
        const uniqueCategories = [
            'Books and Literature',
            'DIY and Crafts',
            'Learning',
            'Pop Culture',
            'Environmentalism',
            'Fashion and Beauty',
            'Finance',
            'Health and Wellness',
            'Food and Cooking',
            'Lifestyle',
            'Parenting',
            'Photography',
            'Current Events',
            'Relationships',
            'Science and Technology',
            'Sports and Fitness',
            'Travel',
            'Entertainment',
            'Food Photography',
            'Healthy Eating',
            'LGBTQ',
            'Music',
            'Pets',
            'Religion and Spirituality',
            'Social Media',
            'Spirituality',
            'Style',
            'Television',
            'Veganism',
            'Wellness',
            'Writing',
            'American Culture',
            'European Culture',
            'Japanese Culture',
            'Middle Eastern Culture',
            'Mexican Culture',
            'Indian Culture',
            'Korean Culture',
            'Australian Culture',
            'Chinese Culture',
        ];

        async function seedCategories() {
            for (const categoryName of uniqueCategories) {
                const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
                try {
                    // Attempt to create the category if it doesn't already exist
                    const createdCategory = await prisma.category.upsert({
                        where: { slug },
                        update: {},
                        create: {
                            title: categoryName,
                            slug: slug,
                        }
                    });
                } catch (error) {
                    console.error(`Error creating category "${categoryName}":`, error);
                }
            }
        }
        async function dbSeed() {
            await seedCategories();
        }
        dbSeed();
        console.log("Categories seed data inserted successfully.");
    } catch (error) {
        console.error("Error seeding user data:", error);
    } finally {
        await prisma.$disconnect();
    }
}
seed();




// "type": "module",
// "prisma": {
//     "seed": "node prisma/posts.js"
//   },