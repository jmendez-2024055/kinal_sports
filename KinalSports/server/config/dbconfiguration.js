import mongoose from "mongoose";

export const dbConnection = async () => {
    try{
        mongoose.connection.on('error', () => {
            console.error('Mongo DB | Error de conexión');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.error('Mongo DB | Intentando conectar a mong DB');
        });
        mongoose.connection.on('connected', () => {
            console.error('Mongo DB | Conectando a mongo DB');
        });
        mongoose.connection.on('open', () => {
            console.error('Mongo DB | Conectado a la base de datos');
        });
        mongoose.connection.on('reconnected', () => {
            console.error('Mongo DB | Reconectado a mongo DB');
        });
        mongoose.connection.on('disconnected', () => {
            console.error('Mongo DB | Desconectado de mongo DB');
        });
        await mongoose.connect(process.env.URI_MONGODB,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
        });
    }catch(err){
        console.error(`Kinal Sport - Error al conectar la db: ${err.message}`)
        process.exit(1);
    }
}

const gracefulShutdown = async (signal) => {
    console.log(`Mongo DB | Recibida señal de ${signal}, cerrando conexión a mongo DB...`)
    try{
        await mongoose.disconnect();
        console.log(`Mongo DB | Conexión cerrada exitosamente`)
        process.exit(0);
    }catch(err){
        console.error(`Mongo DB | Error durante el cierre de la conexión: ${err.message}`);
    }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));