import prisma from "../../lib/db";
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';


const deleteTeamMember = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const managerEmail = session.user.email;
    const { memberId } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: managerEmail,
            },
            select: {
                role: true,
                Team: true,
            },
        });

        const isValidTeamMember = user.Team.some(member => member.id === memberId);

        if (!isValidTeamMember) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'MANAGER' && user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        if (user && user.Team) {
            // Check if the memberId exists in the team
            const isMemberInTeam = user.Team.some(member => member.id === memberId);

            if (isMemberInTeam) {
                // Remove the member from the team
                await prisma.team.update({
                    where: { id: memberId },
                    data: { member: { disconnect: true } },
                });

                res.status(200).json({ message: 'Member removed from the team' });
            } else {
                res.status(404).json({ message: 'Team not found for the manager' });
            }
        } else {
            res.status(404).json({ message: 'Team not found for the manager' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `There is an error: ${error.message}` });
    }
};

export default deleteTeamMember;
