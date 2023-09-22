import { defineStore } from 'pinia';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage';

export const useFilesStore = defineStore('files', {
    state: () => ({}),
    getters: {},
    actions: {
        async sendFile(file) {
            const storage = getStorage();
            const storageRef = ref(storage, file.name);
            try {
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                return url;
            } catch (error) {
                console.error('Error adding post: ', error);
            }
        },

        async deleteFile(name) {
            const storage = getStorage();
            const storageRef = ref(storage, name);

            try {
                await deleteObject(storageRef);
                // console.log('file deleted successfully');
            } catch (error) {
                console.log('Error deleting file: ', error);
            }
        },
    },
});
