import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import Alert from './components/Alert';
import './App.css';

const useStyles = makeStyles(() => ({
    app: {
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh',
    },
}));

export default function App() {
    const classes = useStyles();
    return (
        <Router>
            <div className={classes.app}>
                <Header />
                <Route exact path='/' component={HomePage} />
                <Route exact path='/coins/:id' component={CoinPage} />
            </div>
            <Alert />
        </Router>
    );
};