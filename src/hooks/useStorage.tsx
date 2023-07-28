import {useEffect, useState} from 'react';
import { Storage } from '@ionic/storage';

export function useStorage(){
    const [store, setStore] = useState<Storage>();


    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name : 'AGdb',
            });
            const store = await newStore.create();
            setStore(store);

        }
    if (!store){
    initStorage();
    }
    }, []);
    return{
        store
    }
}

