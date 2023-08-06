import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();


export default async function handler(req, res) {
    // const baseUrl = "https://hkdk.events/Lsg8XzsTMn3S"
    const {data} = req.body;
    
   try {
    console.log(data);
    res.status(200).json({message:"created successfully"});
   } catch (error) {
    res.status(500).json({message:`Opps! there is an error: ${error}`})
   }
  }
  