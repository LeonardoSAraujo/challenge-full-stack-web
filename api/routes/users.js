const express = require('express');
const router = express.Router();
const { PrismaClient,Prisma } = require('@prisma/client')


const prisma = new PrismaClient()
/* GET for list all users */


const createStudent = async(student)=> {
  try {
     await prisma.Students.create({
      data:{
        name: student.name,
        email: student.email,
        cpf: student.cpf,
        register: student.register
      },
    })
    return('Cadastro efetuado')
  }  catch (e) {
    let creationerror = 'Erro ao cadastrar, tente novamente'
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        `There is a unique constraint violation, a new user cannot be created with ${e.meta.target}`
      )
      
      if (e.code === 'P2002') {
        if((e.meta.target == 'Students_cpf_key') || (e.meta.target == 'Students_register_key')){
          creationerror = 'Estudante já cadastrado'
        }else if(e.meta.target == 'Students_email_key'){
          creationerror = 'Email já está em uso'
        }
      }
    }
    return(creationerror)
  }
}

const findStudents = async(value)=> {
  const userslist = await prisma.Students.findMany({
    where:{
      OR: [
        {
          name: {
            contains: value
          }
        },
        {
          email: {
            contains: value
          }
        },
        {
          cpf: {
            contains: value
          }
        },
        {
          register: {
            equals: isNaN(parseInt(value)) === true?undefined:parseInt(value)
          }
        }
        
      ]
      
    }
  })
  return userslist
}

const updateStudent = async(id,student)=> {
  try {
     await prisma.Students.update({
      where:{
        id: parseInt(id)
      },
      data:{
        name: student.name,
        email: student.email,
      },
    })
    return('Cadastro alterado com sucesso')
  }  catch (e) {
    console.log(e)
    let updateerror = 'Erro ao cadastrar, tente novamente'
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(
        `There is a unique constraint violation, ${e.meta.cause}`
      )
      
      if (e.code === 'P2025') {
        updateerror = 'Usuário não encontrado'
      }
    }
    return(updateerror)
  }
}



router.get('/',async function(req, res, next) {
  const datausers = await findStudents(req.query.search)
  res.json({
    students: datausers
  });
});
/* POST create a new user */
router.post('/', async function(req,res,next){
  const response = await createStudent(req.body)
  res.json({
    status: response
  }
    )
})
/* POST edit a user */
router.put('/', async function(req,res,next){
  const response = await updateStudent(req.query.id,req.body)
  console.log(response)
  res.send(response)
})

module.exports = router;