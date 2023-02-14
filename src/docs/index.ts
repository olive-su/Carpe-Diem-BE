import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import Swagger from '../loaders/swagger';
import card from './api/card';
import album from './api/album';

export default class ApiDocs {
    #apiDocOption;
    #swagger;

    constructor() {
        this.#apiDocOption = {
            ...card,
            ...album,
        };

        this.#swagger = new Swagger();
    }

    init() {
        this.#swagger.addAPI(this.#apiDocOption);
    }

    getSwaggerOption() {
        const { apiOption, setUpoption } = this.#swagger.getOption();

        const specs = swaggerJsDoc(apiOption);

        return {
            swaggerUI,
            specs,
            setUpoption,
        };
    }
}
