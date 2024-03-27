import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
            'Healthy Eating'
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
                    console.log(`Category "${createdCategory.title}" created successfully.`);
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