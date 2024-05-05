const { google } = require('googleapis');
import { NextResponse } from "next/server";
const fs = require('fs');
const apikeys = require('../../apikey.json');
import Invent from "@models/invent";
import Travel from "@models/travel";
import { connectToDB } from "@utils/database";

import { writeFile } from 'fs/promises';
import { join } from 'path';

var name;
var path;
var id;
var userid;
var email;
var from;

const fold = {
    "inventory": "1ZDa2mwGVZJSnQIcgXpHMX9hKuDrn8PoN",
    "travel": "1zBhPqpXRNhRacKvlrCLffW1iZRE2QJS9"        
}

const SCOPE = ["https://www.googleapis.com/auth/drive"]
async function auth(){
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

async function upload(authClient, userEmail) {
    return new Promise((resolve, rejected) => {
        const drive = google.drive({ version: 'v3', auth: authClient });

        var fileMetaData = {
            name: name,
            parents: [fold[from]],
        };

        drive.files.create({
            resource: fileMetaData,
            media: {
                body: fs.createReadStream(path),
            },
            fields: 'id'
        }, async function (err, file) {
            if (err) {
                return rejected(err);
            }

            const fileId = file.data.id;
            try {
                await drive.permissions.create({
                    fileId: fileId,
                    requestBody: {
                        role: 'writer',
                        type: 'user',
                        emailAddress: email
                    }
                });

                await drive.permissions.create({
                    fileId: fileId,
                    requestBody: {
                        role: 'reader',
                        type: 'user',
                        emailAddress: apikeys.client_email
                    }
                });
                console.log('File shared and permissions set successfully');
            } catch (error) {
                console.error('Error sharing file and setting permissions:', error);
            }

            // Delete the file after sharing and setting permissions
            try {
                await fs.promises.unlink(path);
                console.log('File deleted successfully');
            } catch (error) {
                console.error('Error deleting file:', error);
            }
            resolve(file);
        })
    })
}


function getName(head) {
    for(const [key, value] of head[Symbol.iterator]()){
        if(key == "name") {
            return value;
        }
    }

    return null;
}

function getId(head) {
    for(const [key, value] of head[Symbol.iterator]()){
        if(key == "id") {
            return value;
        }
    }

    return null;
}

function getUserId(head) {
    for(const [key, value] of head[Symbol.iterator]()){
        if(key == "userid") {
            return value;
        }
    }

    return null;
}

function getEmail(head) {
    for(const [key, value] of head[Symbol.iterator]()){
        if(key == "email") {
            return value;
        }
    }

    return null;
}

function getFrom(head) {
    for(const [key, value] of head[Symbol.iterator]()){
        if(key == "from") {
            return value;
        }
    }

    return null;
}

function getSize(head) {
    for(const [key, value] of head[Symbol.iterator]()){
        if(key == "content-length") {
            return Number(value);
        }
    }

    return null;
}

async function setLinkInvent(value){
    await connectToDB();
    const invent = await Invent.findOneAndUpdate({_id: id}, { link: value });
    console.log(invent);
}

async function setLinkTravel(value){
    await connectToDB();
    const travel = await Travel.findOneAndUpdate({_id: id}, { link: value });
    console.log(travel);
}

export async function POST(request) { 
  const blob = await request.blob();
  const buffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const head = request.headers;
  console.log(head);

  let size = getSize(head);
  if(size > 100000000){
    return NextResponse.json({ error: 'File too large.' }, { status: 500 });
  }

  name = getName(head);
  id = getId(head);
  userid = getUserId(head);
  email = getEmail(head);
  from = getFrom(head);

  path = join(process.cwd() + '/drive_server', id + name);
  console.log(path);

  try {
    await writeFile(path, uint8Array);
    console.log('File saved successfully');

    const oth = await auth();
    const data = await upload(oth);
    const value = data['data']['id'];

    if(from == "inventory"){
        await setLinkInvent(value);
    }
    if(from == "travel"){
        await setLinkTravel(value);
    }

  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file.' }, { status: 500 });
  }

  return NextResponse.json({ message: "File saved successfully!" }, { status: 200 }); 
};