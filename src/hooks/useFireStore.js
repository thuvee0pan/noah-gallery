import {useEffect, useState} from "react";
import {projectFirestore} from "../firebase/config";

export const useFireStore = (collection) => {
    const [docs, setDocs] = useState([])
    useEffect(() => {
        const unSup = projectFirestore.collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                const documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                });
                setDocs(documents);
            });
        return () => unSup();
    }, [collection])
    return {docs}
}
