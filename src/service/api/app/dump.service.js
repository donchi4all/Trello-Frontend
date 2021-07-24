import HTTP from "./../http";

export default {
    dupmpDB: () => HTTP.get("/dumpDb"),
};
