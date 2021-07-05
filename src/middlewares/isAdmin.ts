import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export const isAdmin = async (request: Request, response: Response, next: NextFunction) => {
    const user = await getRepository(User).findOne(request.body.id, {relations: ['roles']});

    if(!user) return response.status(403).json({ message: 'No existe el usuario' });

    if(!user.roles.find(elem => {
        return elem.name == 'Admin'
    })) return response.status(403).json({ message: 'No autorizado' });

    next();
}