import { connect } from 'mongoose'

export async function startConnection() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/mean-gallery';

    await connect(mongoUri, {
        useNewUrlParser: true,
        useFindAndModify: false
    } as any);

    console.log('Database is connected');
}
