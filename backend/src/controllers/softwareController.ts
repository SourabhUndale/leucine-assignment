import { Request, Response } from 'express';
import { AppDataSource } from '../db';
import { Software } from '../entities/Software';

export const createSoftware = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, accessLevels } = req.body;

    const softwareRepo = AppDataSource.getRepository(Software);

    const software = new Software();
    software.name = name;
    software.description = description;
    software.accessLevels = accessLevels;

    await softwareRepo.save(software);
    res.status(201).json({ message: "Software added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating software", error });
  }
};

export const getAllSoftware = async (req: Request, res: Response): Promise<any> => {
  try {
    const softwareRepo = AppDataSource.getRepository(Software);
    const softwareList = await softwareRepo.find();

    res.status(200).json(softwareList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching software", error });
  }
};