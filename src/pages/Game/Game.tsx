import { IonContent, IonHeader, IonPage } from '@ionic/react';

export const Game: React.FC = () => {
  return (
    <IonPage className="bg-background-black">
      <IonHeader className="ion-no-border container my-4">
        <h1 className="text-3xl text-white font-bold">Game</h1>
      </IonHeader>
      <IonContent>
        <div className="container">
          <p>This is the content of the page</p>
        </div>
      </IonContent>
    </IonPage>
  )
}
