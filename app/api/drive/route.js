const { google } = require('googleapis');
import { NextResponse } from "next/server";
const fs = require('fs');
const apikeys = require('../../apikey.json');
import Funds from '../../../models/funds';
import User from '../../../models/user'

var name;
var path;
var id;
var userid;
var email;

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

// async function createFolder(authClient, id) {
//     const service = google.drive({version: 'v3', auth: authClient});
//     const fileMetadata = {
//       name: id,
//       parents: ["1x6OAt4GjE-Z3g6XA3JjNjj9NnYggpT_m"],
//       mimeType: 'application/vnd.google-apps.folder',
//     };
//     try {
//       const file = await service.files.create({
//         resource: fileMetadata,
//         fields: 'id',
//       });
//       console.log('Folder Id:', file.data.id);
//       return file.data.id;
//     } catch (err) {
//       // TODO(developer) - Handle error
//       throw err;
//     }
//   }
async function createFolder(authClient, id) {
    const service = google.drive({version: 'v3', auth: authClient});
    const fileMetadata = {
      name: id,
      parents: ["1x6OAt4GjE-Z3g6XA3JjNjj9NnYggpT_m"],
      mimeType: 'application/vnd.google-apps.folder',
    };
    try {
      const file = await service.files.create({
        resource: fileMetadata,
        fields: 'id',
      });
      console.log('Folder Id:', file.data.id);
      return file.data;
    } catch (err) {
      // TODO(developer) - Handle error
      throw err;
    }
}

async function shareFolder(authClient, folderId, email) {
    const service = google.drive({ version: 'v3', auth: authClient });
    const permission = {
        'type': 'user',
        'role': 'writer',
        'emailAddress': email
    };
    try {
        await service.permissions.create({
            resource: permission,
            fileId: folderId,
            fields: 'id'
        });
        console.log('Folder shared successfully with', email);
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
}

async function upload(authClient, folderId){
    return new Promise((resolve, rejected) => {
        const drive = google.drive({version: 'v3', auth: authClient});

        var fileMetaData = {
            name: name,
            parents: [folderId],
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

async function setLink(data) {
    const hash = data['data']['id'];

    try {
        const updatedFunds = await Funds.findOneAndUpdate(
            { _id: id },
            { link: hash },
        );

        await updatedFunds.save();
    } catch (error) {
        console.error('Error updating funds:', error);
    }
}

async function getFolder(auth, id) {
    try {
        const user = await User.findOne(
            { _id: id },
        );

        if (user && user['folder']) {
            return user['folder'];
        } 
        else if(user){
            const folderId = await createFolder(auth, id);
            const value = folderId['data']['id'];

            const updatedUser = await User.findOneAndUpdate(
                { _id: id },
                { folder: value },
            );

            return value;
        }
        else{
            console.log('Funds not found');
            return null;
        }
    } catch (error) {
        console.error('Error updating funds:', error);
    }

    return null;
}

import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) { 
  const blob = await request.blob();
  const buffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const head = request.headers;
  console.log(head);
  console.log('\n\n\n\n');

  name = getName(head);
  id = getId(head);
  userid = getUserId(head);
  console.log(userid);
  email = getEmail(head);
  console.log(email);

  path = join(process.cwd() + '/drive_server', name);

  try {
    await writeFile(path, uint8Array);
    console.log('File saved successfully');

    const oth = await auth();
    const folderId = await getFolder(oth, userid);
    const data = await upload(oth, folderId);

    console.log(data['data']['id']);

    setLink(data);    

  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
  }

  return NextResponse.json({ message: "File saved successfully" }, { status: 200 }); 
};