import { rxdb } from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest, {params: {id}}: {params: {id: string}}) {
    const db = await rxdb();
    const pastes = await db.collection("pastes");
    const paste = await pastes.findOne({ _id: new ObjectId(id) });
    if (!paste) {
        return new NextResponse('NOT_FOUND', {status: 404})
    }
    return new NextResponse(paste.paste, {status: 200, headers: {'Content-Type': 'text/plain'}})
}