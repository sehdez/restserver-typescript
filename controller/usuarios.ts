import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios =  async( req: Request,  res: Response ) => {
    const usuarios = await Usuario.findAll({where:{estado:true}})
    res.json({ usuarios });
}

export const getUsuario = async ( req: Request,  res: Response ) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if( !usuario ){
        return res.status(404).json({
            msg: 'No se encontró el usuario'
        })
    }
    res.json({ 
        usuario
     });
}

export const postUsuario = async ( req: Request,  res: Response ) => {
    const { body } = req;
    try{
        const hayEmail = await Usuario.findOne({
            where: { email: body.email }
        })
        if( hayEmail ){
            return res.status(400).json({ msg: `Ya existe un usuario con el email ${ body.email }` })
        }
        // const usuario = new Usuario( body );
        // await usuario.save();
        const usuario = await Usuario.create(body)
        res.json(usuario);
    }catch( err ){
        console.log(err);
        return res.status(500).json({ msg:'Hable con el administrador' })
    }
}

export const putUsuario = async ( req: Request,  res: Response ) => {
    const { id } = req.params;
    const body  = req.body;
    const usuario = await Usuario.findByPk( id );
    if( !usuario ){
        return res.status(400).json({
            msg: 'No se encontró el usuario'
        })
    }
    await usuario?.update(body)

    res.json({ 
        usuario
     });
}

export const deletUsuario = async ( req: Request,  res: Response ) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk( id );
    if( !usuario ){
        return res.status(400).json({
            msg: 'No se encontró el usuario'
        })
    }
    // await usuario.destroy();
    await usuario?.update({ estado: false })

    res.json({ 
        usuario
     });
}