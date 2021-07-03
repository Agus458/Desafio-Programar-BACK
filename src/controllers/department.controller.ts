import { Request, Response } from "express";
import { request } from "http";
import { getRepository } from "typeorm";
import { Department } from "../models/Department";

/* ----- Department Controller ----- */

export const createDepartment = async (request: Request, response: Response): Promise<Response> => {

    if (!request.body.name) return response.status(400).json({ message: 'No se ingresó el nombre del departamento' });

    if (await getRepository(Department).findOne({ where: { name: request.body.name } })) return response.status(400).json({ message: 'Ya existe un departamento con ese nombre' });

    let newDepartment = getRepository(Department).create({ name: request.body.name });
    let savedDepartment = await getRepository(Department).save(newDepartment);

    return response.status(201).json(savedDepartment);

}

export const getDepartments = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Department).find());
}

export const getDepartment = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Department).findOne({ where: { id: request.params.id }, relations: ['locations'] }));
}

export const putDepartment = async (request: Request, response: Response): Promise<Response> => {
    let department = await getRepository(Department).findOne({ where: { id: request.params.id } })

    if (!department) return response.status(404).json({ message: 'No existe un departamento con ese nombre' });

    if (!request.body.name) return response.status(400).json({ message: 'No se ingresó el nombre del departamento' });

    if(await getRepository(Department).findOne({ where: { name: request.body.name } })) return response.status(400).json({ message: 'Ya existe un departamento con ese nombre' });

    department.name = request.body.name;

    return response.status(200).json(await getRepository(Department).save(department));
}

export const deleteDepartment = async (request: Request, response: Response): Promise<Response> => {
    if (!await getRepository(Department).findOne({ where: { id: request.params.id } })) return response.status(400).json({ message: 'No existe un departamento con ese nombre' });

    return response.json(await getRepository(Department).delete(request.params.id));
}