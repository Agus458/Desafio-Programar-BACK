import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Department } from "../models/Department";
import { Location } from "../models/Location";

/* ----- Location Controller ----- */

export const createLocation = async (request: Request, response: Response): Promise<Response> => {

    if (!request.body.name) return response.status(400).json({ message: 'No se ingresó el nombre de la localidad' });

    if (!request.body.department) return response.status(400).json({ message: 'No se ingresó el departamento' });

    if (await getRepository(Location).findOne({ where: { name: request.body.name } })) return response.status(400).json({ message: 'Ya existe unn localidad con ese nombre' });

    let department = await getRepository(Department).findOne({ where: { name: request.body.department }, relations: ['locations'] });

    if (!department) return response.status(400).json({ message: 'No existe ese departamento' });

    let newLocation = getRepository(Location).create({ name: request.body.name });

    department.locations.push(newLocation);

    let result = await getRepository(Department).save(department);

    return response.status(201).json(result);

}

export const getLocations = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Location).find());
}

export const getLocation = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Location).findOne({ where: { name: request.params.name }, relations: ['department'] }));
}

export const putLocation = async (request: Request, response: Response): Promise<Response> => {

    let location = await getRepository(Location).findOne({ where: { name: request.params.name } })


    if (!location) return response.status(404).json({ message: 'No existe una localidad con ese nombre' });


    if (request.body.name) {
        if (await getRepository(Location).findOne({ where: { name: request.body.name } })) return response.status(400).json({ message: 'Ya existe una localidad con ese nombre' });
        location.name = request.body.name;
    }
    if (request.body.department) {
        let department = await getRepository(Department).findOne({ where: { name: request.body.department } })
        if (!department) return response.status(404).json({ message: 'No existe un departamento con ese nombre' });
        location.department = department;
    }

    return response.status(200).json(await getRepository(Location).save(location));
}

export const deleteLocation = async (request: Request, response: Response): Promise<Response> => {
    if (!await getRepository(Location).findOne({ where: { name: request.params.name } })) return response.status(400).json({ message: 'No existe una localidad con ese nombre' });

    return response.json(await getRepository(Location).delete({ name: request.params.name }));
}