// seed-categories.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
    { title: 'Technology', slug: 'technology' },
    { title: 'Health', slug: 'health' },
    { title: 'Business', slug: 'business' },
    { title: 'Lifestyle', slug: 'lifestyle' },
    { title: 'Food', slug: 'food' },
    { title: 'Travel', slug: 'travel' },
    { title: 'Education', slug: 'education' },
    { title: 'Entertainment', slug: 'entertainment' },
    { title: 'Sports', slug: 'sports' },
    { title: 'Science', slug: 'science' }
];

async function seedCategories() {
    console.log('Seeding categories...');

    for (const category of categories) {
        // Check if category already exists to avoid duplicates
        const existingCategory = await prisma.category.findUnique({
            where: { slug: category.slug }
        });

        if (!existingCategory) {
            await prisma.category.create({
                data: category
            });
            console.log(`Created category: ${category.title}`);
        } else {
            console.log(`Category ${category.title} already exists, skipping...`);
        }
    }

    console.log('Categories seeding completed!');
}

async function main() {
    try {
        await seedCategories();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();