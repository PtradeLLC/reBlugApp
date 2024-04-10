import React from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";


const prisma = new PrismaClient();


export default function App() {

    const { data: session } = useSession();


    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <Accordion selectionMode="multiple">
            <AccordionItem
                key="1"
                aria-label="Chung Miller"
                startContent={
                    <Avatar
                        isBordered
                        color="primary"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                }
                subtitle="4 unread messages"
                title="Chung Miller"
            >
                {defaultContent}
            </AccordionItem>
            <AccordionItem
                key="2"
                aria-label="Janelle Lenard"
                startContent={
                    <Avatar
                        isBordered
                        color="success"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                }
                subtitle="3 incompleted steps"
                title="Janelle Lenard"
            >
                {defaultContent}
            </AccordionItem>
            <AccordionItem
                key="3"
                aria-label="Zoey Lang"
                startContent={
                    <Avatar
                        isBordered
                        color="warning"
                        radius="lg"
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    />
                }
                subtitle={
                    <p className="flex">
                        2 issues to<span className="text-primary ml-1">fix now</span>
                    </p>
                }
                title="Zoey Lang"
            >
                {defaultContent}
            </AccordionItem>
        </Accordion>
    );
}


// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await prisma.user.findUnique({
//         where: { email: session.user.email },

//         select: {
//             name: true,
//             email: true
//         }
//     });

//     console.log("USER_RESPONSE", repo);

//     // Pass data to the page via props
//     return { props: { repo } }
// }

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log("SESSION", session);
    // Fetch data from external API
    const res = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            name: true,
            email: true
        }
    });

    console.log("USER_RESPONSE", res);

    // Pass data to the page via props
    return { props: { repo: res } }
}


