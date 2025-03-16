import About from "../pages/About/About"
import Account from "../pages/AccountPage/AccountPage";
import Search from "../pages/SearchPage/SearchPage";
import ShoppingList from "../pages/ShoppingListPage/ShoppingListPage";
import Store from "../pages/StorePage/StorePage"
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";


const AppRoutes: React.FC = () => (
    <IonRouterOutlet>
        <Redirect exact path="/" to="/about" />
        <Route path="/stores" render={() => <Store />} exact={true} />
        <Route path="/search" render={() => <Search />} exact={true} />
        <Route path="/shoppinglist" render={() => <ShoppingList />} exact={true} />
        <Route path="/account" render={() => <Account />} exact={true} />
        <Route path="/about" render={() => <About />} exact={true} />
    </IonRouterOutlet>
);

export default AppRoutes;
