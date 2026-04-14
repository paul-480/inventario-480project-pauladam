import type { Status } from '../common';

export interface ClientContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  position?: string;
  note?: string;
}

export interface Client {
  id: string;
  name: string;
  sector: string;
  website?: string;
  mainContact: ClientContact;
  email: string;
  phone?: string;
  address?: string;
  notes?: string;
  status: Status;
  additionalContacts?: ClientContact[];
}