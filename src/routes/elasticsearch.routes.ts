import { Router } from 'express';
import { ElasticClient } from '../databases/elasticsearch';
const elasticClient = new ElasticClient();

const router = Router();

//@route    GET /es?size=
//@desc     Get all data
router.get('/', async (req, res, next) => {
    const size = Number(req.query.size);
    let account;
    try {
        account = await elasticClient.getData(size);    
    } catch (error) {
        return next (error);
    }

    res.json(account);
});

//@route    GET /state/:state
//@desc     Get account by state
router.get('/state/:state', async (req, res, next) => {
    const state = req.params.state as string;
    let account;
    try{
        account = await elasticClient.getByState(state);
    } catch(error){
        return next(error);
    }

    res.json(account);
});

//@route    GET /employer/:employer
//@desc     Get account by employer
router.get('/employer/:employer', async (req, res, next) => {
    const {
        state, employer
    } = req.params;
    let account;
    try {
        account = await elasticClient.getByEmployer(state, employer);
    } catch (error) {
        return next (error);
    }

    res.json(account);
});

//@route    GET /account/:accNumber
//@desc     Get account by account number
router.get('/account/:accNumber', async (req, res, next) => {
    const accNumber = Number(req.params.accNumber);
    let account;
    try {
        account = await elasticClient.getByAccountNumber(accNumber);        
    } catch (error) {
        return next (error);
    }

    res.json(account);
});

//@route    GET /account/range/:acc1/:acc2
//@desc     Get account in account number range
router.get('/account/range/:acc1/:acc2', async (req, res, next) => {
    const {
        acc1, acc2
    } = req.params;
    let account
    try {
        account = await elasticClient.getByAccountNumberRange ({Number(acc1), Number(acc2)})
    } catch (error){
        return next (error);
    }

    res.json(account);
});

//@route    GET /age/:age
//@desc     Get account with maximum age
router.get('/age/:age', async (req, res, next) => {
    const age = Number(req.params.age);
    let account;
    try{
        account = await elasticClient.getByAge(age);
    } catch (error) {
        retutn next(error);
    }

    res.json(account);
});

export default router;