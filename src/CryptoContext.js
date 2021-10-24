import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { CoinList } from './config/api';
import { onAuthStateChanged } from '@firebase/auth';
import { doc, onSnapshot } from '@firebase/firestore';
import { auth, db } from './firebase';

const CryptoState = createContext();

const CryptoContext = ({ children }) => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const [symbol, setSymbol] = useState('$');
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        type: 'success',
    });

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, 'watchlist', user?.uid);
            var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins);
                } else {
                    console.log('No Items in Watchlist');
                }
            });
            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, [user]);

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        if (currency === 'INR') setSymbol('₹');
        else if (currency === 'USD') setSymbol('$');
        else if (currency === 'RUB') setSymbol('₽');
    }, [currency]);

    const value = {
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchlist
    };

    return (
        <CryptoState.Provider value={value}>
            {children}
        </CryptoState.Provider>
    );
};

export default CryptoContext;

export const useCryptoState = () => useContext(CryptoState);