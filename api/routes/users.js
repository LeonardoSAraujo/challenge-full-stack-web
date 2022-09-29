const express = require('express');
const router = express.Router();
const { PrismaClient,Prisma } = require('@prisma/client')
const {findStudents,updateStudent,createStudent,deleteStudent} = require('../functions/students/studentsFunctions')

const prisma = new PrismaClient()
/* GET for list all users */
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
  res.json({
    status: response
  })
})
router.delete('/', async function(req,res,next){
  const response = await deleteStudent(req.query.id)
  res.json({
    status: response
  })
})

module.exports = router;