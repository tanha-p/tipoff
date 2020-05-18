import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader';

export default async ( ) => {
    await mongooseLoader();
    return await expressLoader();
}