import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ITag } from '../models/ITag';
import { INote } from '../models/INote';

interface MyDB extends DBSchema {
    tags: {
        value: ITag
        key: string;
    }
    notes: {
        value: INote
        key: string;
    }
}



class DBService {
    async openDb() {
        const db = await openDB<MyDB>('store', 1, {
            upgrade(db, oldVersion) {
                if (oldVersion == 0) {
                    db.createObjectStore('tags', { keyPath: 'id' });
                    db.createObjectStore('notes', { keyPath: 'id' });
                }
            },
            blocking() {
                db.close();
                alert("База данных устарела, пожалуйста, перезагрузите страницу.")
            }
        });
        return db

    }
    async addNote(note: INote) {
        const DB: IDBPDatabase<MyDB> = await this.openDb();
        let transaction = DB.transaction('notes', 'readwrite');
        let notes = transaction.objectStore('notes');
        try {
            notes.put(note); //добавляем без await
        } catch (err: unknown) {
            if (err) {
                console.log('Ошибка ' + err);
            }
        } finally {
            DB.close();
        }
    }
    async deleteNote(id: string) {
        const DB: IDBPDatabase<MyDB> = await this.openDb();
        let transaction = DB.transaction('notes', 'readwrite');
        let notes = transaction.objectStore('notes');
        try {
            notes.delete(id); // удаляем без await
        } catch (err: unknown) {
            if (err) {
                console.log('Ошибка ' + err);
            }
        } finally {
            DB.close();
        }
    }
    async getAllNotes(): Promise<INote[] | undefined> {
        const DB: IDBPDatabase<MyDB> = await this.openDb();
        let transaction = DB.transaction('notes', 'readwrite');
        let notes = transaction.objectStore('notes');
        try {
            const allNotes = await notes.getAll()
            return allNotes;
        } catch (err: unknown) {
            if (err) {
                console.log('Ошибка ' + err);
            }
        } finally {
            DB.close();
        }
    }
    async addTag(tag: ITag) {
        const DB: IDBPDatabase<MyDB> = await this.openDb();
        let transaction = DB.transaction('tags', 'readwrite');
        let tags = transaction.objectStore('tags');
        try {
            tags.add(tag); // Добавляем без await
        } catch (err: unknown) {
            if (err) {
                console.log('Ошибка ' + err);
            }
        } finally {
            DB.close();
        }

    }
    async deleteTags(IDs: string[]) {
        const DB: IDBPDatabase<MyDB> = await this.openDb();
        let transaction = DB.transaction('tags', 'readwrite');
        let tags = transaction.objectStore('tags');
        try {
            IDs.forEach(id=>{
                tags.delete(id); // удаляем без await (в фоновом режиме)
            })
        } catch (err: unknown) {
            if (err) {
                console.log('Ошибка ' + err);
            }
        } finally {
            DB.close();
        }

    }
    async getAllTags() {
        const DB: IDBPDatabase<MyDB> = await this.openDb();
        let transaction = DB.transaction('tags', 'readwrite');
        let tags = transaction.objectStore('tags');
        try {
            const allTags = await tags.getAll();
            return allTags;
        } catch (err: unknown) {
            if (err) {
                console.log('Ошибка ' + err);
            }
        } finally {
            DB.close();
        }

    }

}
export const dbService = new DBService()

