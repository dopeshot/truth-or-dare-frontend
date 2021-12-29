import { HomeIcon, PlayIcon, UserIcon, UsersIcon } from '@heroicons/react/outline';
import { IonApp, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import { Redirect, Route } from 'react-router-dom';
import { useAppState } from './overmind';
import { Account } from './pages/Account/Account';
import { Login } from './pages/Account/Login';
import { Register } from './pages/Account/Register';
import { Explore } from './pages/Explore/Explore';
import { Game } from './pages/Game/Game';
import { InGame } from './pages/Game/InGame';
import { Player } from './pages/Player/Player';
import { Editor } from './pages/Set/Editor';
import { SetDetails } from './pages/SetDetails/SetDetails';
import './tailwindcss.css';
import './theme/variables.css';

export const App: React.FC = () => {
    const hideTabBar = useAppState().game.hideTabBar

    return <IonApp className="font-rubik">
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/player" component={Player} />
                    <Route exact path="/game/ingame" component={InGame} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/explore/:setId" component={SetDetails} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/account/login" component={Login} />
                    <Route exact path="/account/register" component={Register} />
                    <Route exact path="/account/creative" component={Editor} />
                    <Route exact path="/">
                        <Redirect to="/explore" />
                    </Route>
                </IonRouterOutlet>
                <IonTabBar data-cy="app-tabbar" hidden={hideTabBar} slot="bottom" className="bg-black">
                    <IonTabButton data-cy="app-nav-explore" tab="explore" href="/explore" className="bg-black">
                        <HomeIcon className='h-6 w-6' />
                        <IonLabel>Explore</IonLabel>
                    </IonTabButton>
                    <IonTabButton data-cy="app-nav-game" tab="game" href="/game" className="bg-black">
                        <PlayIcon className='h-6 w-6' />
                        <IonLabel>Game</IonLabel>
                    </IonTabButton>
                    <IonTabButton data-cy="app-nav-player" tab="player" href="/player" className="bg-black">
                        <UsersIcon className='h-6 w-6' />
                        <IonLabel>Player</IonLabel>
                    </IonTabButton>
                    <IonTabButton data-cy="app-nav-player" tab="account" href="/account" className="bg-black">
                        <UserIcon className='h-6 w-6' />
                        <IonLabel>Profil</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
}
