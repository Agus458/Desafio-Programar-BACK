import { getRepository } from "typeorm";
import { Role } from "../models/Role";
import { User } from "../models/User";
import { encryptPassword } from "./encriptation";

export const createInitialData = async () => {
    if (await getRepository(Role).count() === 0) {
        let newRoles = [];
        newRoles.push(getRepository(Role).create({ name: 'Admin' }));
        newRoles.push(getRepository(Role).create({ name: 'Empresa' }));

        await getRepository(Role).save(newRoles);
    }

    if (!await getRepository(User).findOne({ where: { userName: "Admin" } })) {
        let adminRole = await getRepository(Role).findOne({ where: { name: "Admin" } });

        if (adminRole) {
            let admin = getRepository(User).create({ userName: "Admin", email: "admin@admin.com", password: await encryptPassword("admin"), roles: [adminRole] });
            await getRepository(User).save(admin);
        }
    }
}

