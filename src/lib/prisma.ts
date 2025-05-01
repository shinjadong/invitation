import { PrismaClient } from '@/generated/prisma';

// PrismaClient는 글로벌 변수로 설정하여 hot-reload 중에도 연결을 유지합니다.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma; 