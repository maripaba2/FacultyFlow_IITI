const { google } = require('googleapis');
import { NextResponse } from "next/server";
const fs = require('fs');
const apikeys = require('../../apikey.json');

var name;
var path;

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

async function upload(authClient){
    return new Promise((resolve, rejected) => {
        const drive = google.drive({version: 'v3', auth: authClient});

        var fileMetaData = {
            name: name,
            parents: ["1lYwasSRIiFDrvKufXaFxOuDosvl3U8Xi"],
        }

        drive.files.create({
            resource: fileMetaData,
            media: {
                body: fs.createReadStream(path),
            },
            fields: 'id'
        }, function(err, file){
            if(err){
                return rejected(err);
            }
            resolve(file);
        })
    })
}

function getName(head){
    let prev = "";
    let name = "";

    head.forEach(head => {
        if(head.length > 6 && head.slice(0,4) == "http"){
            name = prev;
            return prev;
        }
            
        prev = head;
    });

    return name;
};

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) { 
  const blob = await request.blob();
  const buffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const head = request.headers;
  console.log(head);
  name = getName(head);

  path = join(process.cwd() + '/drive_server', name);

  try {
    await writeFile(path, uint8Array);
    console.log('File saved successfully');

    const oth = await auth();
    const data = await upload(oth);
    console.log(data['data']['id']);

  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }

  return NextResponse.json({ message: "File saved successfully" }, { status: 200 }); 
};