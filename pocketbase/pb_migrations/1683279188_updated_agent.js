migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("8v7zpgr2t3f085u");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "v46baphk",
        name: "email",
        type: "email",
        required: false,
        unique: false,
        options: {
          exceptDomains: null,
          onlyDomains: null,
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("8v7zpgr2t3f085u");

    // remove
    collection.schema.removeField("v46baphk");

    return dao.saveCollection(collection);
  }
);
