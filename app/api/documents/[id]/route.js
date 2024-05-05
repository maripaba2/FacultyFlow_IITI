import Document from "@models/document";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const document = await Document.findById(params.id).populate("creator")
        if (!document) return new Response("Document Not Found", { status: 404 });

        return new Response(JSON.stringify(document), { status: 200 })

    } catch (error) {
        return new Response
        ("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const {title,uploadLink,driveLink} = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingDocument = await Document.findById(params.id);

        if (!existingDocument) {
            return new Response("Document not found", { status: 404 });
        }
        existingDocument.title=title;
        existingDocument.uploadLink=uploadLink;
        existingDocument.driveLink=driveLink;
       

        await existingDocument.save();

        return new Response("Successfully updated the Document", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Document", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    
    try {
        await connectToDB();
        
        // Find the prompt by ID and remove it
        await Document.findByIdAndDelete(params.id);
        console.log(params.id);
        return new Response("Document deleted successfully", { status: 200 });
       
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};