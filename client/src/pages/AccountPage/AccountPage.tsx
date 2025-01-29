import { IonButton, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonPopover, IonTitle, IonToggle, IonToolbar, } from '@ionic/react';
import { useEffect, useState } from 'react';
import './AccountPage.css';

function AccountPage() {
  const [showPopover, setShowPopover] = useState(false); 
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('disableDropdown');
    if (storedValue === null) {
      localStorage.setItem('disableDropdown', JSON.stringify(false));
    } else {
      setIsToggled(JSON.parse(storedValue));
    }
  }, []);

  const handleToggleChange = (event: CustomEvent) => {
    const newValue = event.detail.checked;
    setIsToggled(newValue);
    localStorage.setItem('disableDropdown', JSON.stringify(newValue));
    localStorage.setItem('searchHistory', JSON.stringify([]));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <div className="title-center">
            <IonImg
              src="680logocropped.png"
              alt="App Logo"
              className="headerLogo"
            />
          </div>
          <IonTitle>Account</IonTitle>

          
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="setting">
        <IonButton
            onClick={() => setShowPopover(true)} 
          >
            Settings
        </IonButton>
        </div>
        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)} 
        >
          <IonList>
            <IonItem>
              <IonLabel>Search History</IonLabel>
              <IonToggle
                slot="end" 
                checked={isToggled} 
                onIonChange={handleToggleChange} 
              />
            </IonItem>
          </IonList>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
}

export default AccountPage;
