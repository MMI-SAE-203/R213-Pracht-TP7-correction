/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Agent = "agent",
  Maison = "maison",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AgentRecord = {
  nomAgent?: string;
  prenomAgent?: string;
  email?: string;
};

export type MaisonRecord = {
  nomMaison?: string;
  prix?: number;
  images?: string[];
  nbChambres?: number;
  nbSdb?: number;
  adresse?: string;
  surface?: number;
  favori?: boolean;
  agent?: RecordIdString;
};

export type UsersRecord = {
  name?: string;
  avatar?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type AgentResponse = Required<AgentRecord> & BaseSystemFields;
export type MaisonResponse<Texpand = unknown> = Required<MaisonRecord> &
  BaseSystemFields<Texpand>;
export type UsersResponse = Required<UsersRecord> & AuthSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  agent: AgentRecord;
  maison: MaisonRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  agent: AgentResponse;
  maison: MaisonResponse;
  users: UsersResponse;
};
