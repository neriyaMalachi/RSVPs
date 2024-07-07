// pages/api/add.js
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';


export default async function POST(req:NextRequest, res:NextResponse) {
    console.log(req.body);
    

}
