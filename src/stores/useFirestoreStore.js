import { defineStore } from "pinia";

import { collection, addDoc } from "firebase/firestore";

import { db } from "boot/database/conn";

export const useFirestoreStore = defineStore("useFirestoreStore", {
  actions: {
    async addDocument(nameCollection, document) {
      try {
        const docRef = await addDoc(collection(db, nameCollection), document);

        return docRef.id;
      } catch (error) {
        return error;
      }
    },
  },
});
