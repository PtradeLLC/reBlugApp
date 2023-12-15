import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        const { email } = session?.user;
        let first_name, last_name;

        try {
            // Directly create the user using the email from the session
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                select: {
                    firstName: true,
                    lastName: true,
                    provider: true,
                },
            });

            if (user.provider !== 'Email') {
                [first_name, last_name] = session.user.name.split(' ');

                // Log inside the block where variables are assigned
                console.log('log from fetchUser', first_name, last_name);

                res.status(200).json({ first_name, last_name });
                return; // Important: stop execution here to prevent further code execution
            }

            // Remove the console.log from here

            if (user.firstName === null && user.lastName === null) {
                const updatedUser = await prisma.user.upsert({
                    where: { email },
                    update: {
                        firstName: user.firstName || first_name,
                        lastName: user.lastName || last_name,
                    },
                    create: {
                        email,
                        firstName: user.firstName || first_name,
                        lastName: user.lastName || last_name,
                        provider: 'OAuth',
                    },
                    select: {
                        firstName: true,
                        lastName: true,
                        provider: true,
                    },
                });

                res.status(200).json(updatedUser);
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            res.status(500).json({ message: `There is an error: ${error.message || 'unknown'}`, error });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        console.log('Session not found on the server side');
        res.status(404).json({ message: 'Session not found on the server side' });
    }
}





// import { PrismaClient } from '@prisma/client';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from './auth/[...nextauth]';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     const session = await getServerSession(req, res, authOptions);

//     if (session) {
//         const { email } = session?.user;
//         const name = session.user.name;
//         let first_name, last_name;

//         try {
//             // Directly create the user using the email from the session
//             const user = await prisma.user.findUnique({
//                 where: {
//                     email: email,
//                 },
//                 select: {
//                     firstName: true,
//                     lastName: true,
//                     provider: true,
//                 },
//             });

//             if (user.provider !== 'Email') {
//                 const full_name = name.split(' ');
//                 first_name = full_name[0];
//                 last_name = full_name[1];

//                 return { first_name, last_name };
//             }

//             console.log('log from fetchUser', first_name, last_name);

//             if (user.firstName === null && user.lastName === null) {
//                 const updatedUser = await prisma.user.upsert({
//                     where: { email },
//                     update: {
//                         firstName: user.firstName || first_name,
//                         lastName: user.lastName || last_name,
//                     },
//                     create: {
//                         email,
//                         firstName: user.firstName || first_name,
//                         lastName: user.lastName || last_name,
//                         provider: 'OAuth',
//                     },
//                     select: {
//                         firstName: true,
//                         lastName: true,
//                         provider: true,
//                     },
//                 });

//                 console.log('Updated from fetchUser', updatedUser);

//                 res.status(200).json(updatedUser);
//             } else {
//                 res.status(200).json(user);
//             }

//             res.status(200).json(user);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             res.status(500).json({ message: `There is an error: ${error.message || 'unknown'}`, error });
//         } finally {
//             await prisma.$disconnect();
//         }
//     } else {
//         console.log('Session not found on the server side');
//         res.status(404).json({ message: 'Session not found on the server side' });
//     }
// }
