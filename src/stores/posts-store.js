import { defineStore } from 'pinia';
import db from 'src/boot/firebase';
import {
    collection,
    query,
    onSnapshot,
    getDocs,
    getDoc,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    orderBy,
    limit,
} from 'firebase/firestore';

export const usePostsStore = defineStore('posts', {
    state: () => ({
        postsList: [],
    }),
    getters: {
        // doubleCount: (state) => state.counter * 2,
    },
    actions: {
        async addPost(post) {
            //prop это {title:'', text:''} TS
            post.date = Date.now();
            try {
                const postsCol = collection(db, 'posts');
                await addDoc(postsCol, post);
            } catch (e) {
                console.error('Error adding post: ', e);
            }
        },

        async updatePost(id, newValues) {
            // newValues - object. TS
            try {
                await updateDoc(doc(db, 'posts', id), newValues);
            } catch (e) {
                console.error('Error remove post: ', e);
            }
        },

        async deletePost(id) {
            try {
                await deleteDoc(doc(db, 'posts', id));
            } catch (e) {
                console.error('Error remove post: ', e);
            }
        },

        // получить коллекцию без подписки на обновление данных
        // async getPostsCollection() {
        //     try {
        //         const postsCol = collection(db, 'posts');
        //         const postSnapshot = await getDocs(postsCol);
        //         this.postsList = postSnapshot.docs.map((doc) => doc.data());
        //     } catch (e) {
        //         console.error('Error getting collection: ', e);
        //     }
        // },

        async getPostId(id) {
            try {
                const postsCol = doc(db, 'posts', id);
                const post = await getDoc(postsCol);
                return post.data();
            } catch (e) {
                console.error('Error getting post: ', e);
            }
        },

        getPostsChanges() {
            const q = query(collection(db, 'posts'), orderBy('date'));
            onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const post = change.doc.data();
                    post.id = change.doc.id;

                    if (change.type === 'added') {
                        // console.log('New post: ', post);
                        this.postsList.unshift(post);
                    }
                    if (change.type === 'modified') {
                        // console.log('Modified post: ', post);
                        let index = this.postsList.findIndex(
                            (item) => item.id === post.id
                        );
                        Object.assign(this.postsList[index], post);
                    }
                    if (change.type === 'removed') {
                        // console.log('Removed post: ', post);
                        let index = this.postsList.findIndex(
                            (item) => item.id === post.id
                        );
                        this.postsList.splice(index, 1);
                    }
                });
            });
        },
    },
});
