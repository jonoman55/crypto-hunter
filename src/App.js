import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import "./App.css";

const useStyles = makeStyles(() => ({
    App: {
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.App}>
                <Header />
                <Route path="/" component={HomePage} exact />
                <Route path="/coins/:id" component={CoinPage} exact />
            </div>
        </Router>
    );
}

export default App;