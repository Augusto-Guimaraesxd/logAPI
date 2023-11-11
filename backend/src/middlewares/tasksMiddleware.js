const validateBody = (request , response , next)=>{
    const{body} = request;
    if(body.linha == undefined){
       return response.status(400).json({message:'Linha obrigatória' })
    }

    if(body.linha == ''){
      return response.status(400).json({message:'Linha obrigatória' })
    }
    if(body.solicitacao == undefined){
      return response.status(400).json({message:'Campo solicitaçao é obrigatório' })
   }

   if(body.solicitacao == ''){
     return response.status(400).json({message:'Campo solicitação não pode ser vazio' })
   }
    

    next();
};
const validateFieldStatus = (request , response , next)=>{
  const{body} = request;
  if(body.status == undefined){
     return response.status(400).json({message:'status obrigatório' })
  }

  if(body.status == ''){
    return response.status(400).json({message:'status obrigatório' })
  }
  

  next();
};



module.exports = {
    validateBody,
    validateFieldStatus
};