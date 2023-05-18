migrate(
  (db) => {
    const collection = new Collection({
      id: "8v7zpgr2t3f085u",
      created: "2023-05-05 08:15:01.472Z",
      updated: "2023-05-05 08:15:01.472Z",
      name: "agent",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "esyypfiw",
          name: "nom_agent",
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
          id: "pkkft8yb",
          name: "prenom_agent",
          type: "text",
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
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
    const collection = dao.findCollectionByNameOrId("8v7zpgr2t3f085u");

    return dao.deleteCollection(collection);
  }
);
