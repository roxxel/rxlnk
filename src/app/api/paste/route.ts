import { rxdb } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";


const PasteCreateSchema = z.object({
    paste: z.string().min(1).max(8000, "Paste length can't be more than 8000"),
    isPrivate: z.boolean(),
})


export async function POST(request: NextRequest) {
    const body = await request.json()
    try {
        const schema = PasteCreateSchema.parse(body)
        const db = await rxdb()
        const pastes = await db.collection('pastes')
        const doc = await pastes.insertOne({paste: schema.paste, isPrivate: schema.isPrivate})

        return NextResponse.json({id: doc.insertedId})

    } catch (err: unknown)  {
        const zodErr = err as ZodError
        const errors = zodErr.issues
        return NextResponse.json({errors}, {status: 400})
    }
}
