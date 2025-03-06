import { PrismaClient } from '@prisma/client';

// Declaração global do prisma (necessária para evitar múltiplas instâncias no ambiente de desenvolvimento)
declare global {
  var prisma: PrismaClient | undefined;
}


const prisma = global.prisma || new PrismaClient();

// Garantir que a instância seja compartilhada no ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
