import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const superUserEmail = process.env.SUPERUSER_EMAIL;

    if (!superUserEmail) {
        console.error("SUPERUSER_EMAIL is not defined in the environment variables.");
        process.exit(1);
    }

    const user = await prisma.user.findFirst({
        where: { email: superUserEmail, provider: "GOOGLE" },
    });

    if (user) {
        await prisma.user.updateMany({
            where: { role: "SUPERUSER" },
            data: { role: "USER" },
        });
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { role: "SUPERUSER", provider: "GOOGLE" },
        });
        console.log(`Updated ${updatedUser.email} to SUPERUSER.`);
    } else {
        console.log(`User with email ${superUserEmail} does not exist. No changes made.`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });