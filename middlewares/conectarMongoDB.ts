import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';

export const conectarMongoDB = (handler : NextApiHandler) => 

 async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {
    // async está dizendo que minha função é assíncrona.

    // verifica se o banco já está conectado, se estiver, seguir para o endpoint ou pro próximo middleware
    if(mongoose.connections[0].readyState) {
        return handler(res, req);
    } // chamo o mongoose e pergunto se há ao menos uma conexão com estado de pronta.

    // ja que não está conectado vamos conectar 
    // obter a variavel de ambiente preenchida do env
    const { DB_CONEXAO_STRING } = process.env;

    // se a env estiver vazia aborta o uso do sistema e avisa o programador
    if(!DB_CONEXAO_STRING) { // exclamação vê se não há essa variável
        return res.status(500).json({ erro : '.env de configuração do banco não informado'});
    }
    

    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'))
    mongoose.connection.on('error', erro => console.log(`Ocorreu erro ao conectar no banco ${erro}`))
    // await significa que quero esperar isso terminar para passar para a proxima linha do código.
    await mongoose.connect(DB_CONEXAO_STRING);

    // Agora posso seguir para o meu endpoint, pois estou conectado no banco
    return handler(req, res)
    
    
}

// Um middleware recebe um handler que recebe uma função com um request e um response.
// 500 = culpa do sistema.
// 1:09

