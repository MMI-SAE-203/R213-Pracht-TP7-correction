migrate(
  (db) => {
    const collection = new Collection({
      id: "7cf17hvkrvmpaoh",
      created: "2023-05-12 07:38:19.665Z",
      updated: "2023-05-12 07:38:19.665Z",
      name: "agent",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "tg2jdggj",
          name: "nomAgent",
          type: "text",
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "6qddxx3r",
          name: "prenomAgent",
          type: "text",
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "ufogvydg",
          name: "email",
          type: "email",
          required: false,
          unique: false,
          options: {
            exceptDomains: null,
            onlyDomains: null,
          },
        },
      ],
      indexes: [],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("7cf17hvkrvmpaoh");

    return dao.deleteCollection(collection);
  }
);
