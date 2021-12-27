import { IonButton, IonButtons, IonIcon, IonInput, IonItem } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import divers from '../../assets/icons/divers.svg';
import female from '../../assets/icons/female.svg';
import male from '../../assets/icons/male.svg';
import { useActions } from '../../overmind';
import { Gender, Player, playerNameLength } from '../../overmind/players/state';
import { IconButton } from '../Buttons/IconButton';

export const PlayerInput: React.FC<{ player: Player, isAllowedToDelete: boolean }> = ({ player, isAllowedToDelete }) => {
    const { deletePlayer, updatePlayerName, setPlayerGender } = useActions().players

    return (
        <IonItem lines="none" className="bg-itemgrey rounded-lg mb-3 hover:bg-itemactivegrey focus-within:bg-itemactivegrey">
            <IonButtons className="ml-3 mr-2 py-2">
                {
                    player.gender === Gender.FEMALE && <IconButton icon={female} bgColor="bg-truth-yellow" onClick={() => { setPlayerGender({ id: player.id, gender: Gender.MALE }) }} /> ||
                    player.gender === Gender.MALE && <IconButton icon={male} bgColor="bg-dare-green" onClick={() => { setPlayerGender({ id: player.id, gender: Gender.DIVERS }) }} /> ||
                    player.gender === Gender.DIVERS && <IconButton icon={divers} bgColor="bg-white" onClick={() => { setPlayerGender({ id: player.id, gender: Gender.FEMALE }) }} />
                }
            </IonButtons>
            <IonInput placeholder="Enter a name" maxlength={playerNameLength} value={player.name} onIonChange={(event: CustomEvent) => {
                updatePlayerName({ id: player.id, name: event.detail.value })
            }}>

            </IonInput>
            {isAllowedToDelete && <IonButtons slot="end">
                <IonButton onClick={() => deletePlayer(player.id)}>
                    <IonIcon icon={closeOutline} slot="icon-only"></IonIcon>
                </IonButton>
            </IonButtons>}
        </IonItem>
    )
}