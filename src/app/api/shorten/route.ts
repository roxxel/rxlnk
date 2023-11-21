import { rxdb } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'

export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const link = searchParams.get('link')
    if (!link) {
        return NextResponse.json({message: 'No link was provided'}, {status: 400})
    }

    const db = await rxdb()
    const links = await db.collection('links')
    //Pregenerating 20 ids
    const ids = [...new Array(20)].map(x=>crypto.randomBytes(3).toString('hex'));
    // Looking for links that collide with generated ids, if any
    const existing = await (await links.find({ short : { $in : ids } } )).toArray()
    // Filtering generated ids (if already exists in db - remove)
    const suitableIds = ids.filter(x=>!existing.some(y=>y.short == x))
    // Return error if there's no suitables ids (which is highly unlikely, but just in case)
    if (suitableIds.length === 0) {
        return NextResponse.json({message: 'Oops... Something went wrong on our end. Try again'}, {status: 500})
    }
    const finalId = suitableIds[0]
    await links.insertOne({short: finalId, link})
    return NextResponse.json({id: finalId})
    
}