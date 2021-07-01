import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { comparePassword, encryptPassword } from "../libs/encriptation";
import { User } from "../models/User";
import jwt from 'jsonwebtoken';
import { Role } from "../models/Role";

/* ----- Auth Controller ----- */

export const signin = async (request: Request, response: Response): Promise<Response> => {
    // Validate data
    if (!request.body.email) return response.status(400).json({ message: 'Falta el email del usuario' });
    if (!request.body.password) return response.status(400).json({ message: 'Falta la contraseña del usuario' });

    const { email, password } = request.body;

    let user = await getRepository(User).findOne({ where: { email }, select: ['password', 'id'] });
    if (!user) return response.status(400).json({ message: 'No existe un usuario con el email ingresado' });

    // Validate password
    if (! await comparePassword(user.password, password)) return response.status(401).json({ message: 'Contraseña incorrecta' });

    // Generate new auth token
    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN_SECRET as string, { expiresIn: '24h' });

    return response.json({ token });
}

export const signup = async (request: Request, response: Response): Promise<Response> => {
    // Validate data
    if (!request.body.userName) return response.status(400).json({ message: 'Falta el nombre de usuario del usuario' });
    if (!request.body.email) return response.status(400).json({ message: 'Falta el email del usuario' });
    if (!request.body.password) return response.status(400).json({ message: 'Falta la contraseña del usuario' });

    const { userName, email, password } = request.body;

    // Validate email
    let user = await getRepository(User).findOne({ where: { email } });
    if (user) return response.status(400).json({ message: 'Ya existe un usuario con el email ingresado' });

    // Validate userName
    user = await getRepository(User).findOne({ where: { userName } });
    if (user) return response.status(400).json({ message: 'Ya existe un usuario con el nombre de usuario ingresado' });

    let role = await getRepository(Role).findOne({ where: { name: 'Empresa' } });

    if (!role) return response.status(500).json({ message: 'Error al registrar el usuario' })

    // Create new user
    const newUser = getRepository(User).create({ email, password: await encryptPassword(password), userName, roles: [role] });

    const savedUser = await getRepository(User).save(newUser);

    // Generate new auth token
    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_CONFIRMATION_SECRET as string, { expiresIn: '15m' });

    return response.status(201).json({ token });
}