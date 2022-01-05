import './App.css';
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import HowItWorks from './components/HowItWorks';
import CreateYourOwn from './components/CreateYourOwn';
import CommunityLexicons from "./components/CommunityLexicons";
import { useEffect, useState } from 'react';


function App() {
    const [ lexicons, setLexicons ] = useState([{ name: "example" }]);
    const [ selections, setSelections ] = useState({
        lexicon: { name: "example" },
        length: "auto",
    });

    useEffect(() => {
        fetch("https://word-generator-app.herokuapp.com/lexicons")
            .then((r) => r.json())
            .then((data) => {
                const allLexicons = data.sort((a, b) => a.name - b.name);
                setSelections(() => ({
                    ...selections,
                    lexicon: allLexicons.find(l => l.name === "example"),
                }));
                setLexicons(() => allLexicons);
            })
            .catch((error) =>
                console.error("Fetching all Lexicon names failed... ==>", error)
            );
    }, [])
    
    return (
        <div className="App">

                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/how-it-works" element={<HowItWorks />}/>
                    <Route path="/create-your-own" element={<CreateYourOwn
                        lexiconsState={[ lexicons, setLexicons ]}
                    />}/>
                    <Route path="/community-lexicons" element={<CommunityLexicons
                        lexicons={lexicons}
                        selectionsState={[selections, setSelections]}
                    />}/>
                    <Route path="/for-developers" element={<p>dev</p>}/>
                </Routes>

        </div>
    );
}

export default App;
