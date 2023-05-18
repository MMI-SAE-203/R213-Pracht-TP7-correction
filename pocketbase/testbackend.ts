import { allHousesByAgentId } from "./backend.js";

const maisons = await allHousesByAgentId("g4lct2kno5rn769");

//console.log(JSON.stringify(maisons, null, 2));
console.table(maisons);
