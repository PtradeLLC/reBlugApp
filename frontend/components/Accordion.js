import React from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";


const prisma = new PrismaClient();

export default function ChatPost({ posts }) {
    console.log("POSTS", posts);

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, consequat.";
    return (
        <Accordion selectionMode="multiple">
            <AccordionItem
                key="1"
                aria-label="Chung Miller"
                startContent={
                    <Avatar
                        isBordered
                        color="success"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                }
                subtitle="4 comments"
                title="Chung Miller"
            >
                {defaultContent}
            </AccordionItem>
        </Accordion>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    const res = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    console.log("RES from Accordion", res);
    if (res) {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                comments: {
                    select: {
                        id: true,
                        content: true,
                        aiResponse: true,
                    }
                }
            },
            where: {
                userId: res.id
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 5,
        });
        console.log("POSTS from Accordion", posts);
        return {
            props: {
                posts
            }
        };
    }

    return {
        props: {
            posts: []
        }
    };
}




