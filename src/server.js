import express from 'express';
import cors from 'cors';
import { prisma } from '../lib/prisma.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3333;

// Rotas para parceiros

app.post('/partner', async (req, res) => {
  const partner = req.body;
  let result;

  try {
    result = await prisma.partner.create({
      data: {
        razaoSocial: partner.razaoSocial,
        cnpj: partner.cnpj,
        nomeResponsavel: partner.nomeResponsavel,
        email: partner.email,
        telefone: partner.telefone,
        categoriaProduto: partner.categoriaProduto,
        aceitouTermos: Boolean(partner.aceitouTermos)
      }
    })
  } catch (error) {
    console.error('Error creating partner:', error);
    return res.status(500).json({ message: 'Erro ao criar parceiro, verifique os dados enviados.' });
  }

  if (!result) {
    return res.status(400).json({ message: 'Erro ao criar parceiro' });
  }

  return res.json({ message: 'Parceiro criado com sucesso', partner: result });
})

app.get('/partner', async (req, res) => {
  let result;

  try {
    result = await prisma.partner.findMany();
  } catch (error) {
    console.error('Error fetching partners:', error);
    return res.status(500).json({ message: 'Erro ao buscar parceiros' });
  }

  return res.json(result);
})

// rotas projetos

app.post('/project', async (req, res) => {
  const { nomeProjeto, descricao, menbrosProjeto } = req.body;
  let result;

  try {
    result = await prisma.projeto.create({
      data: { 
        nomeProjeto,
        descricaoProjeto: descricao,
        integrantes: {
          create: menbrosProjeto 
        }
      },
      include: {
        integrantes: true
      }
    })
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Erro ao criar projeto, verifique os dados enviados.' });
  }

  if (!result) {
    return res.status(400).json({ message: 'Erro ao criar projeto' });
  }

  return res.json({ message: 'Projeto criado com sucesso', project: result });
})

app.get('/project', async (req, res) => {
  let result;

  try {
    result = await prisma.projeto.findMany({
      include: {
        menbrosProjeto: true 
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Erro ao buscar projetos' });
  }

  return res.json(result);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});