import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Business_Person } from "../models/Business_Person";
import { Person } from "../models/Person";

/* ----- Person Controller ----- */

export const getPersons = async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response.status(200).json(await getRepository(Person).find());
};

export const getPerson = async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response
    .status(200)
    .json(await getRepository(Person).findOne(request.params.id));
};

export const createPerson = async (
  request: Request,
  response: Response
): Promise<Response> => {
  if (!request.body.name)
    return response
      .status(400)
      .json({ message: "No se ingresó el nombre de la persona" });
  if (!request.body.lastname)
    return response
      .status(400)
      .json({ message: "No se ingresó el apellido de la persona" });
  if (!request.body.email)
    return response
      .status(400)
      .json({ message: "No se ingresó el email de la persona" });
  if (!request.body.phone)
    return response
      .status(400)
      .json({ message: "No se ingresó el telefono de la persona" });

  if (
    await getRepository(Person).findOne({
      where: { email: request.body.email },
    })
  )
    return response
      .status(400)
      .json({ message: "Ya existe una persona con ese email" });
  if (
    await getRepository(Person).findOne({
      where: { phone: request.body.phone },
    })
  )
    return response
      .status(400)
      .json({ message: "Ya existe una persona con ese telefono" });

  let { name, lastname, email, phone } = request.body;

  let newPerson = getRepository(Person).create({
    name,
    lastname,
    email,
    phone,
  });
  let savedPerson = await getRepository(Person).save(newPerson);

  return response.status(201).json(savedPerson);
};

export const updatePerson = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let person = await getRepository(Person).findOne(request.params.id);

  if (!person)
    return response
      .status(400)
      .json({ message: "No existe ninguna persona con ese id" });

  if (request.body.name) person.name = request.body.name;
  if (request.body.lastname) person.lastname = request.body.lastname;
  if (request.body.email && request.body.email != person.email) {
    if (
      await getRepository(Person).findOne({
        where: { email: request.body.email },
      })
    )
      return response
        .status(400)
        .json({ message: "Ya existe una persona con ese email" });
    person.email = request.body.email;
  }
  if (request.body.phone && request.body.phone != person.phone) {
    if (
      await getRepository(Person).findOne({
        where: { phone: request.body.phone },
      })
    )
      return response
        .status(400)
        .json({ message: "Ya existe una persona con ese telefono" });
    person.phone = request.body.phone;
  }

  let updatedPerson = await getRepository(Person).save(person);

  return response.status(200).json(updatedPerson);
};

export const deletePerson = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let person = await getRepository(Person).findOne(request.params.id);
  if (!person)
    return response
      .status(400)
      .json({ message: "No existe ninguna persona con ese id" });

  await getRepository(Business_Person).delete({ person });

  return response
    .status(200)
    .json(await getRepository(Person).delete(request.params.id));
};
