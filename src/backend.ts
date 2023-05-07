import PocketBase from 'pocketbase'
import type { MaisonResponse } from './pocketbase-types'
export const pb = new PocketBase('http://127.0.0.1:8090')

// 5) récupérer la liste de toutes les maison

export async function allMaisons() {
  const records = await pb.collection('maison').getFullList<MaisonResponse>()
  return records
}

// 11) récupérer une maison par id

export async function oneID(id: string) {
  const oneRecord = await pb.collection('maison').getOne<MaisonResponse>(id)
  return oneRecord
}

// 7) les maisons par ordre croissant de leur date de creation dans la base de donnees

export async function allMaisonsSorted() {
  const sortedRecords = await pb.collection('maison').getFullList<MaisonResponse>({
    sort: 'created'
  })
  return sortedRecords
}

// Maison Favori

export async function allMaisonsFavori() {
  const maisonF = await pb.collection('maison').getFullList<MaisonResponse>({
    filter: `favori=TRUE`
  })
  return maisonF
}

// prend en param`etre une surface et qui retourne la liste de toutes les maisons ayant une superficie sup ́erieur `a surface

export async function bySurface(s: number) {
  const maisonSurface = await pb.collection('maison').getFullList<MaisonResponse>({
    filter: `surface > ${s}`
  })
  return maisonSurface
}

export async function nthFirst(n: number) {
  const { items } = await pb.collection('maison').getList<MaisonResponse>(1, n, {})
  return items
}

//fonction pour retourner les données d'un agent par id
export async function oneIDagent(id: string) {
  const oneRecord = await pb.collection('agent').getOne(id)
  return oneRecord
}
