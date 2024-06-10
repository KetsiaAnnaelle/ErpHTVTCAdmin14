import { createContext, useContext, useState } from 'react';

const FactureContext = createContext();

export const FactureProvider = ({ children }) => {
    const [paye, setPaye] = useState(0);
    const [restant, setRestant] = useState(0);
    const [etudiant_id, setEtudiant_id] = useState(0);
    const [echeance, setEcheance] = useState('');

    const updateValues = (newPaye, newRestant, etudiant_id,echeance) => {
        setPaye(newPaye);
        setRestant(newRestant);
        setEtudiant_id(etudiant_id)
        setEcheance(echeance)
    };

    return (
        <FactureContext.Provider value={{ paye, restant,etudiant_id,echeance, updateValues }}>
            {children}
        </FactureContext.Provider>
    );
};

export default FactureProvider;

export const useFactureContext = () => {
    return useContext(FactureContext);
};

// import { createContext } from 'react';

// const FactureContext = createContext({
//     paye: 0,
//     restant: 0,
// });

// export default FactureContext;
