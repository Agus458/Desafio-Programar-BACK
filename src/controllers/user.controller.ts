import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Business } from "../models/Business";
import { User } from "../models/User";

/* ----- Auth Controller ----- */

export const getProfile = async (request: Request, response: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(request.body.id, {relations: ['roles']});

    if (!user) return response.status(400).json({ message: 'No se encontro el usuario' });

    return response.status(200).json(user);
}

export const getBusiness = async (request: Request, response: Response): Promise<Response> => {
    let user: User = request.body.userLogged;

    return response.status(200).json(await getRepository(Business).find({ where: { id: user.business.id } }));
}

export const putBusiness = async (request: Request, response: Response): Promise<Response> => {
    let user: User = request.body.userLogged;

    let business = await getRepository(Business).findOne({ where: { id: user.business.id } });

    if (!business) return response.status(404).json({ message: 'No existe la empresa' });

    if (request.body.rut && request.body.rut != business.rut) {
        if (await getRepository(Business).findOne({ where: { rut: request.body.rut } })) return response.status(400).json({ message: 'Ya existe una empresa con ese RUT' });
    }

    if (request.body.email && request.body.email != business.email) {
        if (await getRepository(Business).findOne({ where: { email: request.body.email } })) return response.status(400).json({ message: 'Ya existe una empresa con ese email' });
        await getRepository(User).update(user.id, {email: request.body.email});
    }

    if (request.body.businessName && request.body.businessName != business.businessName) {
        if (await getRepository(Business).findOne({ where: { businessName: request.body.businessName } })) return response.status(400).json({ message: 'Ya existe una empresa con ese Nombre' });
        await getRepository(User).update(user.id, { userName: request.body.businessName });
    }
    let { rut, email, businessName, nameFantasy, address, cellphone, phone, BPS, occupation, initDate, observations, logo } = request.body;

    return response.status(200).json(await getRepository(Business).update(business.id, {
        rut, email, businessName, nameFantasy, address, cellphone, phone, BPS, occupation, initDate, observations, logo
    }));
}