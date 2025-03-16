import { IonLabel, IonIcon } from '@ionic/react';
import { syncOutline } from 'ionicons/icons';

export function LoadingContainer() {
    return (
        <div className="loading-container">
            <IonIcon className="loading-spinner" icon={syncOutline} />
            <IonLabel className="loading-message">Fetching results...</IonLabel>
        </div>
    );
}
