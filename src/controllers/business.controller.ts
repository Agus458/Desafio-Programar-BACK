import { Request, Response } from "express";
import { request } from "http";
import { getRepository } from "typeorm";
import { Business } from "../models/Business";

/* ----- Business Controller ----- */

export const createBusiness = async (request: Request, response: Response): Promise<Response> => {

    if (!request.body.rut) return response.status(400).json({ message: 'No se ingresó el RUT de la empresa' });

    if (await getRepository(Business).findOne({ where: { rut: request.body.rut } })) return response.status(400).json({ message: 'Ya existe un empresa con ese RUT' });

    let newBusiness = getRepository(Business).create(request.body);
    let savedBusiness = await getRepository(Business).save(newBusiness);

    return response.status(201).json(savedBusiness);

}

export const getBusinesses = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Business).find());
}

export const getBusiness = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Business).findOne({ where: { rut: request.params.rut } }));
}

//Arreglar un poquito pero anda
export const putBusiness = async (request: Request, response: Response): Promise<Response> => {
    let business = await getRepository(Business).findOne({ where: { rut: request.params.rut } })

    if (!business) return response.status(404).json({ message: 'No existe una empresa con ese nombre' });

    if (!request.body.rut) return response.status(400).json({ message: 'No se ingresó el RUT de la empresa' });

    if (await getRepository(Business).findOne({ where: { rut: request.body.rut } })) return response.status(400).json({ message: 'Ya existe una empresa con ese RUT' });

    business = request.body;
    if (business) {
        return response.status(200).json(await getRepository(Business).save(business));
    } else {
        return response.status(400).json({ message: 'Response vacio' });
    }
}

export const deleteBusiness = async (request: Request, response: Response): Promise<Response> => {
    let business = await getRepository(Business).findOne({ where: { rut: request.params.rut } })
    if (!business) {
        return response.status(400).json({ message: 'No existe una empresa con ese RUT' });
    } else {
        return response.json(await getRepository(Business).delete(business));
    }
}