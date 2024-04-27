const express = require('express');
const router = express.Router();


const PacientesController = require('./controllers/PacientesController');
const Areas_MedicasController = require('./controllers/Areas_MedicasController');
const consultaController = require('./controllers/consultaController');
const UbsController = require ('./controllers/UbsController');
const RecepcionistaController = require('./controllers/RecepcionistaController');
const HorarioController = require('./controllers/HorarioController');


//----------------------------CONSULTA-----------------------------------//
router.get('/Consulta/:paci_id', consultaController.umaconsul);
router.get('/consultas/:dia', consultaController.buscarConsultasPorData);
router.post('/Consulta', consultaController.criarConsulta);


//----------------------------RECEPCIONISTA-----------------------------------//
router.get('/Recep', RecepcionistaController.buscarTodos);
router.post('/Recep', RecepcionistaController.inserir);
router.post('/login', RecepcionistaController.login);
router.put('/consultaEstato/:consul_id', RecepcionistaController.alterarEstadoConsulta);
router.post('/horario/:area_id', RecepcionistaController.adicionarHorarioEArea);




//----------------------------UBS-----------------------------------//
router.get('/Ubs', UbsController.buscarTodos);



//----------------------------PACIENTE-----------------------------------//
router.get('/Pacientes', PacientesController.buscarTodos);
router.get('/Paciente/:paci_id', PacientesController.buscarUm);
router.post('/Paciente', PacientesController.inserir);
router.put('/paciente/:paci_id', PacientesController.alterarDadosPaciente);
router.delete('/Paciente/:paci_id', PacientesController.excluir);
router.post('/loguin', PacientesController.login);


//----------------------------HORARIOS-----------------------------------//
router.get('/Horario/:area_id', HorarioController.buscarUm);
router.get('/Horarios/:area_id', HorarioController.buscarHorariosdoDia);
router.get('/horari/:area_id/:dia', HorarioController.buscarHorariosPorDia);



//----------------------------AREAS MEDICAS-----------------------------------//
router.get('/areas/:ubs_id', Areas_MedicasController.buscarAreasPorUBS);


module.exports = router;

