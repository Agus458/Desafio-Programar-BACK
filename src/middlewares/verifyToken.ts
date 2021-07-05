import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { User } from "../models/User";

export const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    const bearerHeader = request.headers.authorization;

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // Verifay token
        let decoded;
        try {
            decoded = jwt.verify(bearerToken, process.env.JWT_TOKEN_SECRET as string);
        } catch (error) { }

        // Invalid token
        if (!decoded) return response.status(403).json({ message: 'Token Invalido' });

        // Validate user exists
        let { id } = decoded as any;
        const user = await getRepository(User).findOne(id, {relations: ['roles', 'business']});
        if (!user) return response.status(403).json({ message: 'No existe el usuario' });

        Object.assign(request.body, { id });
        Object.assign(request.body, { user });
        
        next();
    } else {
        // Forbidden
        return response.status(403).json({ message: 'Falta el token de autorizacion' });
    }
}