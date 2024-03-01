import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        let tabs = [
            { title: "Books and Literature", slug: "", image: "/booksimage.png" },
            { title: "DIY and Crafts", slug: "", image: "/diyimage.png" },
            { title: "Learning", slug: "", image: "/educationimage.png" },
            { title: "Entertainment", slug: "", image: "/entertainmentimage.png" },
            { title: "Pop Culture", slug: "", image: "/environmentimage.png" },
            { title: "Environmentalism", slug: "", image: "/environmentimage.png" },
            { title: "Fashion and Beauty", slug: "", image: "/fashionimage.png" },
            { title: "Finance", slug: "", image: "/financeimage.png" },
            { title: "Food and Cooking", slug: "", image: "/foodimage.png" },
            { title: "Health and Wellness", slug: "", image: "/healthimage.png" },
            { title: "Lifestyle", slug: "", image: "/lifestyleimage.png" },
            { title: "Parenting", slug: "", image: "/parentingimage.png" },
            { title: "Photography", slug: "", image: "/photographyimage.png" },
            { title: "Current Events", slug: "", image: "/politicsimage.png" },
            { title: "Relationships", slug: "", image: "/relationshipsimage.png" },
            { title: "Science and Technology", slug: "", image: "/scienceimage.png" },
            { title: "Sports and Fitness", slug: "", image: "/sportsimage.png" },
            { title: "Travel", slug: "", image: "/travelimage.png" }
        ];

        const allCategories = await prisma.category.findMany({
            select: {
                id: true,
                title: true
            }
        });

        if (allCategories.length === 0) {
            // If no categories exist, create them based on the tabs array
            for (const tab of tabs) {
                const catSlug = tab.title.trim().split(" ").join("-");
                await prisma.category.create({
                    data: {
                        title: tab.title,
                        slug: catSlug,
                        image: tab.image
                    }
                });
            }
            res.status(200).json({ message: 'Categories created successfully.' });
        } else {
            // Update existing categories if they already exist
            for (const tab of tabs) {
                const catSlug = tab.title.trim().split(" ").join("-").toLocaleLowerCase();
                const existingCategory = allCategories.find(category => category.title === tab.title);
                if (existingCategory) {
                    await prisma.category.update({
                        where: { id: existingCategory.id },
                        data: {
                            slug: catSlug,
                            image: tab.image
                        }
                    });
                } else {
                    // If the category does not exist, create it
                    await prisma.category.create({
                        data: {
                            title: tab.title,
                            slug: catSlug,
                            image: tab.image
                        }
                    });
                }
            }
            res.status(200).json({ message: 'Categories updated successfully.' });
        }


    } catch (error) {
        console.error('Error creating or fetching categories:', error);
        res.status(500).json({ message: 'Error creating or fetching categories.' });
    }
}
