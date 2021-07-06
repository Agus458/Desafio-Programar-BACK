import { Request, Response } from "express";
import { request } from "http";
import { getRepository } from "typeorm";
import { Business } from "../models/Business";
import { ILike } from "typeorm";
import moment from "moment";

export const countActives = async (request: Request, response: Response): Promise<Response> => {
    return response.status(200).json(await getRepository(Business).createQueryBuilder("business")
        .select("COUNT(business.id)", "COUNT")
        .where("business.state = true")
        .getRawOne());
}

export const businessesByActivity = async (request: Request, response: Response): Promise<Response> => {

    if (!request.params.activity) return response.status(400).json({ message: 'No se ingresó actividad' });

    return response.status(200).json(await getRepository(Business).find({ occupation: ILike("%" + request.params.activity + "%") }));
}

export const businessesByLocation = async (request: Request, response: Response): Promise<Response> => {

    if (!request.params.locationId) return response.status(400).json({ message: 'No se ingresó localidad' });

    return response.status(200).json(await getRepository(Business).createQueryBuilder("business")
        .select("COUNT(business.id)", "COUNT")
        .where("business.location.id = " + request.params.locationId)
        .getRawOne());
}

// export const UDbyMonth = async (request: Request, response: Response): Promise<Response> => {

//     if (!request.params.date) return response.status(400).json({ message: 'No se ingresó un mes' });

//     return response.status(200).json(await getRepository(Business).createQueryBuilder("business")
//         .select("COUNT(business.id)", "COUNT")
//         .where("business.affiliationDate >= " + request.params.date)
//         .andWhere("business.affiliationDate <= " + moment(request.params.date).add(31, 'd'))
//         .getRawOne());


// }

