const { getModelByTenant } = require("./connection-controller");
const { mongodb } = require("./index");
const accountSchema = require("../../models/Account");

const schemas = [
    { modelName: "Account", schema: accountSchema },
];
/**
 * This function creates a database and register the schemas once ther user signs up for the first time
 */

const createTenantDB = async (tenantId, data) => {
    try {
        const AccountModel = await getAccountCollection(tenantId);
        const { email, password, name } = data;
        const newAccount = await AccountModel.create({
            email: email,
            tenantId: tenantId,
            password: password,
            name: name
        });
        if (mongodb) {
            const useDB = mongodb.useDb(tenantId, { useCache: true });
            schemas.forEach((schema) => {
                useDB.model(schema.modelName, schema.schema);
            });
        }
        return newAccount;
    } catch (error) {
        console.log(error);
    }
};
/**
 * these functions retireve collections based on tenantID and use them in our API'S
 */
const getAccountCollection = async (tenantId) => {
    const AccountModel = getModelByTenant(tenantId, "Account", accountSchema);
    return AccountModel;
};

module.exports = {
    createTenantDB,
    getAccountCollection,
};
