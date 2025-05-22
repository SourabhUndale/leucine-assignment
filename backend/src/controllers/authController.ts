import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db';
import { User } from '../entities/User';


const userRepo = AppDataSource.getRepository(User);

const JWT_SECRET = process.env.JWT_SECRET || 'assignment121';

export const signup = async (req: Request, res: Response): Promise<any>  => {
  const { username, password, role } = req.body;
//Promise<any>
  try {
    const existingUser = await userRepo.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepo.create({ username, password: hashedPassword, role: role   || 'Employee' });
    // console.log(newUser);
    
    await userRepo.save(newUser);


    return res.status(201).json({ message: 'Signup successful' });
    // console.log();
  } catch (err) {
    // console.error('Signup error:', err);
    return res.status(500).json({ error: 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await userRepo.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role, username: user.username  }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};