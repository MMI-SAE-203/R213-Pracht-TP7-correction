import PocketBase, { BeforeSendResult } from 'pocketbase'
import { AgentResponse, Collections, type MaisonResponse } from './pocketbase-types.js'
export const pb = new PocketBase('http://127.0.0.1:8090')

// 5) récupérer la liste de toutes les maison

export async function allMaisons() {
  return await pb.collection(Collections.Maison).getFullList<MaisonResponse>()
}

// 11) récupérer une maison par id

export async function oneID(id) {
  return await pb.collection(Collections.Maison).getOne<MaisonResponse>(id)
}

export async function ajoutMaison(nvlMaison: MaisonResponse) {
  return await pb.collection(Collections.Maison).create<MaisonResponse>(processFiles(nvlMaison))
}

/**
 * process form data to append files
 * @param data form data to process
 * @returns FormData object with files
 */
function processFiles(data:Object) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value?.[0].file instanceof File) {
      value.forEach((file) => {
        formData.append(key, file.file)
      })  
    } else {
      formData.append(key, value as string)
    }
  })
  return formData
}

// 7) les maisons par ordre croissant de leur date de creation dans la base de donnees

export async function allMaisonsSorted() {
  return await pb.collection(Collections.Maison).getFullList<MaisonResponse>({
    sort: 'created'
  })
}

// Maison Favori

export async function allMaisonFavori() {
  return await pb.collection(Collections.Maison).getFullList<MaisonResponse>({
    filter: `favori=true`
  })
}

// prend en param`etre une surface et qui retourne la liste de toutes les maisons ayant une superficie sup ́erieur `a surface

export async function bySurface(s) {
  return await pb.collection(Collections.Maison).getFullList<MaisonResponse>({
    filter: `surface > ${s}`
  })
}

export async function surfaceORprice(s, p) {
  return await pb.collection(Collections.Maison).getFullList<MaisonResponse>({
    filter: `surface > ${s} || prix <  ${p}`
  })
}

//fonction pour retourner les données d'un agent par id
export async function oneIDagent(id) {
  return await pb.collection(Collections.Agent).getOne<AgentResponse>(id)
}

//fonction pour retourner tous les agents
export async function allAgents() {
  return await pb.collection(Collections.Agent).getFullList<AgentResponse>({
    sort: 'nomAgent'
  })
}

export async function allMaisonsAgents() {
  return await pb
    .collection(Collections.Maison)
    .getFullList<MaisonResponse<{ agent: AgentResponse }>>({
      expand: 'agent'
    })
}

export async function allMaisonsByAgentId(id) {
  const sortedRecordsAgent = await pb
    .collection(Collections.Maison)
    .getFullList<MaisonResponse<{ agent: AgentResponse }>>({
      filter: `agent.id = '${id}' `,
      expand: 'agent'
    })
  return sortedRecordsAgent
}

export async function allMaisonsByAgentName(nom) {
  return pb.collection(Collections.Maison).getFullList({
    filter: `agent.nomAgent = '${nom}' `,
    expand: 'agent'
  })
}

export async function allMaisonsSortedAgent() {
  return await pb
    .collection(Collections.Maison)
    .getFullList<MaisonResponse<{ agent: AgentResponse }>>({
      sort: 'agent.id',
      expand: 'agent'
    })
}

export async function bySurfaceAgent(s, id) {
  const maisonSurfaceAgent = await pb.collection(Collections.Maison).getFullList<MaisonResponse>({
    filter: `surface > ${s} && agent.id = '${id}'`
  })
  return maisonSurfaceAgent
}

export async function maisonFavoriAgent(id) {
  return await pb.collection(Collections.Maison).getFullList<MaisonResponse>({
    filter: `favori=TRUE && agent.id = '${id}'`
  })
}

export async function allHousesByAgentId(id) {
  return await pb.collection('agent').getOne<AgentResponse>(id, {
    expand: 'maison(agent)'
  })
}
