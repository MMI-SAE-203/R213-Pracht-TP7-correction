migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("sidpkt9hmbfwoeb");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "53iuoliv",
        name: "agent",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "8v7zpgr2t3f085u",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: [],
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("sidpkt9hmbfwoeb");

    // remove
    collection.schema.removeField("53iuoliv");

    return dao.saveCollection(collection);
  }
);
