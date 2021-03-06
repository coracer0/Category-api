import { Router } from "express";
import { categoryController } from "../controllers/categoryController";
import { checkJwt } from "../middleware/jwt";

class CategoryRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt],categoryController.lista);
        this.router.put('/',[checkJwt],categoryController.insert);        
        this.router.post('/',[checkJwt],categoryController.update);        
        this.router.delete('/:cveCategoria',[checkJwt],categoryController.delete);        
    }

}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.router;