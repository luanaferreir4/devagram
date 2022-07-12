import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarMongoDB } from '../../middlewares/conectaMongoDB';
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
const endpointLogin = (
    req : NextApiRequest,
    res : NextApiResponse<RespostaPadraoMsg>,
) => {
    if(req.method === 'POST') {
        const {login, senha} = req.body // desconstrução do corpo da nossa requisição.

        if(login === 'admin@admin.com' && senha === 'Admin@123') {
            res.status(200).json({msg : 'Usuário autenticado com sucesso'})
        }
        return res.status(405).json({erro : 'Usuário ou senha não encontrado'});
    }
    return res.status(405).json({erro : 'Método informado inválido!'});
}

export default conectarMongoDB(endpointLogin); // primeiro rodar banco de dados e após endppoint.