import { Request, Response } from "express";
import { request } from "http";
import { getRepository } from "typeorm";
import { Business } from "../models/Business";
import { Business_Person } from "../models/Business_Person";
import { Person } from "../models/Person";

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
    return response.status(200).json(await getRepository(Business).findOne({ where: { id: request.params.id } }));
}

//Arreglar un poquito pero anda
export const putBusiness = async (request: Request, response: Response): Promise<Response> => {
    let business = await getRepository(Business).findOne({ where: { id: request.params.id } })

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
    let business = await getRepository(Business).findOne({ where: { id: request.params.id } })
    if (!business) {
        return response.status(400).json({ message: 'No existe una empresa con ese id' });
    } else {
        return response.json(await getRepository(Business).delete(business));
    }
}

//Business_Person
export const addPerson = async (request: Request, response: Response): Promise<Response> => {

    if (!request.body.personId) return response.status(400).json({ message: 'No se ingresó una persona' });
    if (!request.body.businessId) return response.status(400).json({ message: 'No se ingresó una empresa' });
    if (!request.body.tipo) return response.status(400).json({ message: 'No se ingresó un tipo' });
    
    let business_person = await getRepository(Business_Person).findOne({where: {person: request.body.personId, bussiness: request.body.businessId}})

    if(business_person){
        return response.status(400).json({ message: 'Ya existe esta persona en la empresa' });
    }

    let business = await getRepository(Business).findOne({where: {id: request.body.businessId}, relations: ['persons']});
    let person = await getRepository(Person).findOne({where: {id: request.body.personId}, relations: ['bussinesses']});

    if(!business) return response.status(400).json({ message: 'No existe esa empresa' });
    if(!person) return response.status(400).json({ message: 'No existe esa persona' });

    let newBP = {
        person: person,
        bussiness: business,
        tipo: request.body.tipo
    };
    let createdBP = getRepository(Business_Person).create(newBP);

    business?.persons.push(createdBP);
    person?.bussinesses.push(createdBP);

    let result1;
    let result2;

    if(business){
        result1 = await getRepository(Business).save(business);
    };
    if(person){
        result2 = await getRepository(Person).save(person);
    };
    

    return response.status(201).json(result1);

}

export const putBP =  async (request: Request, response: Response): Promise<Response> => {
    let BP = await getRepository(Business_Person).findOne({ where: { id: request.params.id } })

    if (!BP) return response.status(404).json({ message: 'No existe esa relación de persona/empresa' });

    if (!request.body.tipo) return response.status(400).json({ message: 'No se ingresó el tipo de la relación' });

    BP.tipo = request.body.tipo;

    return response.status(200).json(await getRepository(Business_Person).save(BP));
}

export const deleteBP = async (request: Request, response: Response): Promise<Response> => {
    if (!await getRepository(Business_Person).findOne({ where: { id: request.params.id } })) return response.status(400).json({ message: 'No existe esa relación de persona/empresa' });

    return response.json(await getRepository(Business_Person).delete(request.params.id));
}