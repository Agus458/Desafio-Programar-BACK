import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

/* ----- Auth Controller ----- */

export const getProfile = async (request: Request, response: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(request.body.id);

    if (!user) return response.status(400).json({ message: 'No se encontro el usuario' });

    return response.status(200).json(user);
}