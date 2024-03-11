import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    // try {

    //     const categoryMap = new Map();
    //     const allCategoriesFromDB = await prisma.category.findMany({
    //         select: {
    //             id: true,
    //             title: true,
    //             slug: true
    //         }
    //     });

    //     allCategoriesFromDB.forEach(post => {
    //         const { category, title, id } = post;
    //         const catSlug = category.trim().split(" ").join("-").toLocaleLowerCase();
    //         const postSlug = title.trim().split(" ").join("-").toLocaleLowerCase();

    //         if (!categoryMap.has(catSlug)) {
    //             categoryMap.set(catSlug, {
    //                 slug: catSlug,
    //                 category,
    //                 posts: []
    //             });
    //         }
    //         categoryMap.get(catSlug).posts.push({ ...post, slug: postSlug });
    //     });

    //     // Create a map of categories fetched from the database using slug as key
    //     const dbCategoryMap = new Map();
    //     allCategoriesFromDB.forEach(category => {
    //         dbCategoryMap.set(category.slug, {
    //             slug: category.slug,
    //             category: category.title,
    //             posts: []
    //         });
    //     });

    //     // Merge categories from local environment with categories from database
    //     for (const [slug, categoryData] of categoryMap.entries()) {
    //         if (dbCategoryMap.has(slug)) {
    //             dbCategoryMap.get(slug).posts = [...dbCategoryMap.get(slug).posts, ...categoryData.posts];
    //         } else {
    //             dbCategoryMap.set(slug, categoryData);
    //         }
    //     }

    //     // Convert the map back to an array of categories
    //     const combinedCategories = Array.from(dbCategoryMap.values());
    //     res.status(200).json({ message: 'Categories created successfully.', allCategories: combinedCategories });
    // } catch (error) {
    //     console.error('Error creating or fetching categories:', error);
    //     res.status(500).json({ message: 'Error creating or fetching categories.' });
    // }
}
