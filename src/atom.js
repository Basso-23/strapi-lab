import { atom } from "jotai";

//* Data original NO se manipula
export const originalAtom = atom([]);

//* Data
export const dataAtom = atom([]);

//* Create
export const createAtom = atom(false);

//* Edit
export const editAtom = atom(false);

//* Temp ID
export const tempAtom = atom();

//* Sending order to fetch data
export const readAtom = atom(false);
