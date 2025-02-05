import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Vérifie les champs requis
  if (!email || !password) {
    res.status(400).json({ error: 'Un ou plusieurs champs requis sont vides.' });
  }

  // Vérifier si l'email est déjà utilisé
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.status(400).json({ error: 'L\'email est déjà utilisé.' });
  }

  // Crypter le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Vérifie les champs requis
    if (!email || !password) {
        res.status(400).send("Un ou plusieurs champs requis sont vides.");
        return;
    }

    // Vérifie si l'utilisateur existe
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        res.status(404).send("Utilisateur non trouvé.");
        return;
    }

    // Vérifie si le mot de passe est correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).send("Mot de passe invalide.");
        return;
    }

    // Génère le token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN as string }
    );

    res.status(201).json({ token });
}


// Faire les tests pour voir si user fonctionne, après passer a middleware