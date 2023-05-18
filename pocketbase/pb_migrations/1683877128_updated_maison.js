migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("sidpkt9hmbfwoeb");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "713wanrt",
        name: "agent",
        type: "relation",
        required: false,
        unique: false,
        options: {
          collectionId: "7cf17hvkrvmpaoh",
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
    collection.schema.removeField("713wanrt");

    return dao.saveCollection(collection);
  }
);
