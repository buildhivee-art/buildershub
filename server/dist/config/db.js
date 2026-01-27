import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient({
    log: ["query", "error", "warn"],
});
export default prisma;
