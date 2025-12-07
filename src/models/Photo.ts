import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    fileType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    media: {
        data: Buffer,
        contentType: String
    }
});

export interface IPhoto extends Document {
    title: string;
    description: string;
    fileType: 'image' | 'video';
    media: {
        data: Buffer;
        contentType: string;
    };
}

export default model<IPhoto>('Photo', schema);