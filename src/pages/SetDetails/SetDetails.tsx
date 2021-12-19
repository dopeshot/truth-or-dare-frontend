import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonPage, IonProgressBar, IonToolbar } from "@ionic/react"
import { ellipsisHorizontal } from "ionicons/icons"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import example from '../../assets/example.png'
import { PrimaryButton } from "../../components/Buttons/PrimaryButton"
import { InternalServerError } from "../../components/Errors/InternalServerError"
import { NotFoundError } from "../../components/Errors/NotFoundError"
import { RequestTimeoutError } from "../../components/Errors/RequestTimeoutError"
import { TaskListItem, TaskType } from "../../components/TaskListItem/TaskListItem"
import { HttpStatus } from "../../enums/http-status"
import { useActions, useAppState } from "../../overmind"
import { Task } from "../../overmind/explore/state"
import { replaceStringWithIcon } from "../../services/utilities"

type SetDetailsParams = {
    setId: string
}

export const SetDetails: React.FC = () => {
    const { setId } = useParams<SetDetailsParams>()

    const { isLoadingSetDetails, setDetails } = useAppState().explore
    const { loadSetDetails } = useActions().explore
    const componentMounted = useRef(true)

    const [errorStatusCode, setErrorStatusCode] = useState<HttpStatus>()

    useEffect(() => {
        loadSetDetails({ setId, componentMounted, setErrorStatusCode })
        {console.log(errorStatusCode, setId)}

        return () => {
            componentMounted.current = false
        }
    }, [loadSetDetails, setId])

    return (
        <>
            {(errorStatusCode === HttpStatus.NOT_FOUND || errorStatusCode == HttpStatus.BAD_REQUEST) && <NotFoundError link='explore' />}
            {errorStatusCode == HttpStatus.INTERNAL_SERVER_ERROR && <InternalServerError onClick={() => loadSetDetails({ setId, componentMounted, setErrorStatusCode })} />}
            {errorStatusCode == HttpStatus.REQUEST_TIMEOUT && <RequestTimeoutError onClick={() => loadSetDetails({ setId, componentMounted, setErrorStatusCode })} />}
            {!errorStatusCode &&
                <IonPage className="bg-center bg-no-repeat bg-background-black" style={{ backgroundImage: `url('${example}')`, backgroundSize: '100% 268px', backgroundPosition: 'top' }}> {/* MC TODO: Fix this with the actual background color */}
                    <IonHeader className="ion-no-border container">
                        <IonToolbar color="transparent">
                            <IonButtons>
                                <IonBackButton className="text-white" defaultHref="/explore" />
                            </IonButtons>
                            <IonButtons slot="end">
                                <IonButton onClick={() => console.log(`Clicked options button`)}>
                                    <IonIcon slot="icon-only" icon={ellipsisHorizontal} />
                                </IonButton>
                            </IonButtons>
                        </ IonToolbar>
                    </IonHeader>
                    <IonContent style={{ "--background": "transparent" }}>
                        <div className="fixed bottom-0 z-10 w-full">
                            <div className="h-32 bg-gradient-to-t from-black">
                                <div className="container h-full flex flex-col justify-center">
                                    <PrimaryButton type="button" className="bg-white" link="/game" icon={faPlay}>Spielen</PrimaryButton>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gradient-to-t from-background-black via-transparent">
                                <div className="container">
                                    <div className="flex flex-col justify-end h-48 pb-6" >
                                        <h1 className="text-3xl mb-2 font-bold">{setDetails?.name}</h1>
                                        <p className="text-lightgrey mb-5">{setDetails?.createdBy.username}</p>
                                        <div className="flex items-center">
                                            <p className="truth-label">W</p>
                                            <p className="text-lightgrey mr-4">{setDetails?.truthCount} Pflicht</p>
                                            <p className="dare-label">P</p>
                                            <p className="text-lightgrey">{setDetails?.daresCount} Wahrheit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-background-black pt-6">
                            <div className="container pb-32">
                                {isLoadingSetDetails ? (<IonProgressBar type="indeterminate"></IonProgressBar>) : (
                                    <div>
                                        <IonList lines="none">
                                            {setDetails?.tasks.map((task: Task, index) => (
                                                <TaskListItem key={index} type={task.type === 'truth' ? TaskType.TRUTH : TaskType.DARE} content={replaceStringWithIcon(task.message)} />
                                            ))}
                                        </IonList>
                                    </div>
                                )}
                            </div>
                        </div>
                    </IonContent>
                </IonPage>}
        </>
    )
}