import { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { getChains } from '../../services/StoreService';
import './About.css'

function About() {
    const [chains, setChains] = useState([]);

    useEffect(() => {
        getChains()
            .then(response => response.json())
            .then(data => setChains(data))
            .catch(error => console.error('Error fetching chain data:', error));
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                        <IonTitle >About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className="d-flex mb-3 align-items-center">
                    <div className="flex-shrink-0">

                    </div>
                    <div className="flex-grow-1 ms-2">
                        <h1 className="fs-4 m-0 title">
                            Grocery Comparison App<br />
                            <small className="text-muted subtitle">A grocery price comparison app designed to help Kiwis find the best deals across multiple supermarkets.</small>
                        </h1>
                    </div>
                </div>

                <h2>How to Use </h2>
                <ol className="text-start">
                    <li>Select up to <a href="/stores">20 preferred stores.</a></li>
                    <li>Search for a product on a <a href="/search">search</a> page.</li>
                    <li>Filter products by categor and brand.</li>
                    <li>Sort results by name, price, and volume.</li>
                    <li>Add products to your <a href="/shoppinglist">shopping list</a> with selected stores.</li>
                    <li>View updated prices for each store.</li>
                    <li>See product details, price history, and the lowest price available that day.</li>
                </ol>

                <h2>Supported Stores</h2>
                <div className="list-unstyled store-list">
                    {chains.map((chain: any, index: any) => (
                        <div key={index}>
                            <div className="d-flex align-items-center">
                                <img src={chain.image_logo} style={{ width: '30px', height: '30px' }} />
                                <span className='store-name'>{chain.name}</span>
                            </div>
                        </div>
                    ))}
                </div>


                <h2>Development Team Members</h2>
                <div className="row">
                    <div className="col-3 mb-3">
                        <a href="mailto:aj.veendijk@pg.canterbury.ac.nz">Anne-Jan Veendijk</a>
                    </div>
                    <div className="col-3 mb-3">
                        <a href="mailto:haosheng.ye@pg.canterbury.ac.nz">Haosheng Ye</a>
                    </div>
                    <div className="col-3 mb-3">
                        <a href="mailto:mohammad.munem@pg.canterbury.ac.nz">Mohammad Munem</a>
                    </div>
                    <div className="col-3 mb-3">
                        <a href="mailto:nandhini.sambasivam@pg.canterbury.ac.nz">Nandhini Sambasivam</a>
                    </div>
                    <div className="col-3 mb-3">
                        <a href="mailto:sam.williams@pg.canterbury.ac.nz">Sam Williams</a>
                    </div>
                    <div className="col-3 mb-3">
                        <a href="mailto:yuchuan.jin@pg.canterbury.ac.nz">Yuchuan Jin</a>
                    </div>

                    <h4>Development Timeline: December 2, 2024 - February 3, 2025</h4>
                    <p>Please reach out via email for any inquiries by clicking on development team names</p>
                </div>
                <div>
                    <h3>Thanks to Our Supervisors</h3>
                    <ul>
                        <li> <a href="mailto:andrew.bainbridge-smith@canterbury.ac.nz">Andrew Bainbridge-Smith</a></li>
                        <li> <a href="mailto:marina.filipovic@canterbury.ac.nz">Marina Filipovic</a></li>
                        <li> <a href="mailto:richard.green@canterbury.ac.nz">Richard Green</a></li>
                    </ul></div>


                <div>
                    <p className="text-muted small">Data Information: During this stage, we only display products available on official <a href="/https://grocer.nz/search">grocer</a> websites.</p>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default About;
