import { CogIcon } from "@heroicons/react/outline";
import { IonContent, IonList, IonPage, IonProgressBar, useIonViewWillEnter } from "@ionic/react";
import example from '../../assets/example.png';
import plus from '../../assets/icons/plus.svg';
import { Button } from "../../components/Buttons/Button";
import { SetItem } from "../../components/SetItem/SetItem";
import { useActions, useAppState } from "../../overmind";
import { Set } from "../../overmind/explore/state";
import { setSeoTitle } from "../../services/utilities/setSeoTitle";

export const Profile: React.FC = () => {
    const { currentUser, isLoadingSets, sets } = useAppState().profile
    const { getSetsByUser } = useActions().profile

    useIonViewWillEnter(() => {
        setSeoTitle('Profile')
        getSetsByUser()
    }, [])

    return (
        <IonPage className="bg-background-black">
            <IonContent>
                <div className="ion-no-border bg-cover mb-4" style={{ backgroundImage: `url(${example})` }}>
                    <div className="bg-gradient-to-t from-background-black w-full h-full">
                        <div className="container">
                            <div className="flex justify-between pt-14 pb-6 md:pb-10">
                                <div className="flex items-center">
                                    <div className="bg-cover rounded-full h-24" style={{ backgroundImage: `url(${example})`, minWidth: "100px" }}></div>
                                    <h1 className="text-2xl text-white font-bold break-all px-4 pb-4">{currentUser?.username}</h1>
                                </div>
                                <button>
                                    <CogIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex justify-around mb-12 md:mb-20">
                                <div className="text-center">
                                    <p className="font-semibold">{sets.truthCount}</p>
                                    <p>Truths</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">{sets.dareCount}</p>
                                    <p>Dares</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">{sets.setCount}</p>
                                    <p>Sets</p>
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold">{sets.playedCount}</p>
                                    <p>Total played</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">Your Sets</h2>
                                    <Button keepFocus={false} type="button" to="#" icon={plus} className="px-7">New</Button>
                                </div>
                                {isLoadingSets ? (<IonProgressBar type="indeterminate" className="mt-5" />) : (
                                    <div>
                                        <IonList>
                                            {sets.data?.length !== 0 && sets.data?.map((set: Set) => (
                                                <SetItem key={set._id} name={set.name} truthCount={set.truthCount} dareCount={set.dareCount} link="#" />
                                            ))}
                                        </IonList>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}