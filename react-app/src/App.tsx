// The library based stuff are imported here.
import React, {Component} from "react";
import {render} from "react-dom";
import {HashRouter as Router, Route, Routes, Link} from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
// The pages used are imported here.
import Header from "./components/common/Header";
import YouthSports from "./components/YouthSports/youthsports";
import YouthSportsDetails from "./components/YouthSports/youthSportsDetails";
import LocalSports from "./components/LocalSportsNews/localsports";
import NIL from "./components/NIL/nil";
import NILDetails from "./components/NIL/nilDetails";
import SportsTechnologyProducts from "./components/SportsTechProducts/sportstechnologyproducts";
import SportsTechnologyProductsDetails from "./components/SportsTechProducts/sportsTechnologyProductsDetails"
import SportsOwnership from "./components/SportsOwnership/sportsownership";
import SportsOwnershipDetails from "./components/SportsOwnership/sportsOwnershipDetails";
import SportsTechnologyStocks from "./components/SportsTechStocks/sportstechnologystocks";
import SportsTechnologyStocksDetails from "./components/SportsTechStocks/sportsTechStocksDetails";
import Appstore from "./components/appstore-login/appstore";
import HomePage from "./components/home/homepage";
import ContactPage from "./components/contact/contactpage";
import TeamStream from "./components/TeamStream/teamstream";


import {GoogleOAuthProvider} from '@react-oauth/google';


//user defined components are here

import "./style.css";
import newspaper from "./components/home/newspaper";

interface ArticleContextType {
  selectedArticle: any | null;
  setSelectedArticle: (article: any) => void;
}

interface AppProps {
  setSelectedArticle?: (article: any) => void;
}

interface AppState {
  name: string;
  selectedArticle: any | null //
}

export const ArticleContext = React.createContext<ArticleContextType>({
  selectedArticle: null,
  setSelectedArticle: () => {
  }
});

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      name: "React",
      selectedArticle: null // or provide some other initial value
    };
  }

  setSelectedArticle = (article: any) => {
    this.setState({name: "React", selectedArticle: article});
  }

  render() {

    return (
        <GoogleOAuthProvider clientId="179478627002-th39iebli3b17dg5mkj4vu32sneo8mt9.apps.googleusercontent.com">
          <div>
            <Router>
              <Header/>
              <ArticleContext.Provider value={{
                selectedArticle: this.state.selectedArticle,
                //@ts-ignore
                setSelectedArticle: this.setSelectedArticle
              }}>
                <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/app" element={<HomePage/>}/>
                  <Route path="/app/index.html" element={<HomePage/>}/>
                  <Route path="/app/sportsOwnership" element={<SportsOwnership/>}/>
                  <Route path="/app/sportsOwnershipDetails" element={<SportsOwnershipDetails/>}/>
                  <Route path="/app/sportsTechProducts" element={<SportsTechnologyProducts/>}/>
                  <Route path="/app/sportsTechProductsDetails" element={<SportsTechnologyProductsDetails/>}/>
                  <Route path="/app/NIL" element={<NIL/>}/>
                  <Route path="/app/nilDetails" element={<NILDetails/>}/>
                  <Route path="/app/sportsTechnologyStocks" element={<SportsTechnologyStocks/>}/>
                  <Route path="/app/sportsTechnologyStocksDetails"
                         element={<SportsTechnologyStocksDetails/>}/>
                  <Route path="/app/youthSports" element={<YouthSports/>}/>
                  <Route path="/app/youthSportsDetails" element={<YouthSportsDetails/>}/>
                  <Route path="/app/localSportsNews" element={<LocalSports/>}/>
                  <Route path="/app/AppStore" element={<Appstore/>}/>
                  <Route path="/app/contact" element={<ContactPage/>}/>
                  <Route path="/app/teamStream/:leagueName/:teamName"
                         element={<TeamStream accessToken={''} streamingPermission={''}/>}/>

                </Routes>
              </ArticleContext.Provider>
            </Router>
          </div>
        </GoogleOAuthProvider>
    );
  }
}

export default App
