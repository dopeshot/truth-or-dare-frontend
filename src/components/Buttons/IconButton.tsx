import { IonButton, IonIcon } from "@ionic/react";

type IconButtonProps = {
    icon: string,
    bgColor: string,
    onClick: (values: any) => void
}

export const IconButton: React.FC<IconButtonProps> = (props) => {
    return (
        <IonButton className={`${props.bgColor} border-4 border-background-black rounded-full no-ripple`} onClick={props.onClick} style={{ minWidth: "44px", minHeight: "44px" }}>
            <IonIcon icon={props.icon} className="text-background-black text-xl" />
        </IonButton>
    )
}