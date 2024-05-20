import prisma from "../../../lib/db";

export default async function handle(req, res) {
    try {
        // Find posts where featureImage is true and delete them
        const deleteMan = await prisma.post.deleteMany({
            where: {
                featureImage: { not: null },
            }
        });


        res.json(deleteMan);
    } catch (error) {
        console.error("Error deleting posts:", error);
        res.status(500).json({ error: "An error occurred while deleting posts." });
    }
}

