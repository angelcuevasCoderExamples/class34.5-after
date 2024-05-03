const { faker } = require('@faker-js/faker')

//faker.local = 'es' <---por si queremos ajustar los mocks al idioma
const generateItems = ()=>{ //A.K:A Products 
    return{
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.string.numeric(),
        category: faker.commerce.department(),
        //thumbnail: faker.image.business()
        //title: faker.commerce.productName(),
        //status: 'true',
        //code: faker.random.numeric(),
    }
}

module.exports = {
    generateItems
}; 