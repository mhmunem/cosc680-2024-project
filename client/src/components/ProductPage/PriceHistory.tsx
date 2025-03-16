import { IonList, IonItem, IonCol, IonRow, IonButton, IonImg } from '@ionic/react';
import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { getPriceHistory } from '../../services/InitialSetupService';

type datePrice = {
    date: Date;
    price: number;
    storeName: string;
}

type PriceHistoryData = {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        tension: number;
    }>;
}

interface PriceHistory {
    allPrices: Product[]
}


export function PriceHistory({ allPrices }: PriceHistory) {
    const [dailyPriceHistory, setDailyPriceHistory] = useState<datePrice[]>([]);
    const [filteredPriceHistory, setFilteredPriceHistory] = useState<datePrice[]>([]);
    const [timeRange, setTimeRange] = useState('4W');
    const getInitialSelectedStores = () => {
        const storedSelectedStores = localStorage.getItem('selectedStores');
        return storedSelectedStores ? JSON.parse(storedSelectedStores) : []
    };

    const [selectedStores] = useState<number[]>(getInitialSelectedStores());

    useEffect(() => {
        if (selectedStores.length > 0) {
            console.log(selectedStores)
            const productId = allPrices[0].products.id;
            getPriceHistory(productId, selectedStores)
                .then(response => {
                    setDailyPriceHistory(response.map((item: { date: string | number | Date; price: any; storeName: string }) => ({
                        date: new Date(item.date),
                        price: item.price,
                        storeName: item.storeName
                    })));
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [selectedStores, allPrices]);

    useEffect(() => {
        const filterDataByRange = () => {
            const ranges: Record<string, number> = {
                '1W': 7,
                '4W': 28,
                '3M': 90,
                '6M': 180,
            };
            const days = ranges[timeRange] || 365;
            const filtered = dailyPriceHistory.slice(-days);
            setFilteredPriceHistory(filtered);
        };
        filterDataByRange();
    }, [timeRange, dailyPriceHistory]);

    const priceHistoryData: PriceHistoryData = {
        labels: filteredPriceHistory.map((entry) =>
            entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        ),
        datasets: [
            {
                label: 'Price History',
                data: filteredPriceHistory.map((entry) => entry.price),
                borderColor: '#7371FC',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.4,
            },
        ],
    };
    const options = {
        plugins: {
            tooltip: {
              callbacks: {
                label: function (context: { chart?: any; raw?: any; datasetIndex?: any; dataIndex?: any; }) {
                    const { dataIndex } = context;
                    const storeName = filteredPriceHistory[dataIndex]?.storeName;
                    const price = context.raw;
                    return `${storeName}: $${price}`;
                },
              },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date',
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price ($)',
                    },
                    ticks: {
                        beginAtZero: false, 
                        callback: function (value: number) {
                            return '$' + value.toFixed(2); 
                        }
                    },
                },
            }
          },
        };

    return (
        <div>
            <IonRow>
                <IonList style={{ width: '100%' }}>
                    <h4>Pricing Information</h4>
                    {allPrices
                        .sort((a: Product, b: Product) => a.store_products.price - b.store_products.price)
                        .map((store: Product, index: number) => (
                            <IonItem key={index}>
                                <IonCol size="1">
                                    <IonImg src={store.chains.image_logo} />
                                </IonCol>
                                <IonCol size="9">
                                    {store.stores.name}
                                </IonCol>
                                <IonCol size="2" className='priceLabel'>
                                    ${store.store_products.price.toFixed(2)}
                                </IonCol>
                            </IonItem>
                        ))}
                </IonList>
            </IonRow>
            {selectedStores.length > 0 ? (
                <>
                    <IonRow>
                        <Line data={priceHistoryData} options={options} />
                    </IonRow>
                    <IonRow style={{ justifyContent: 'center', marginBottom: '16px' }}>
                        {['1W', '4W', '3M', '6M'].map(range => (
                            <IonButton
                                key={range}
                                color={timeRange === range ? 'primary' : 'medium'}
                                onClick={() => setTimeRange(range)}>
                                {range}
                            </IonButton>
                        ))}
                    </IonRow>
                </>
            ) : (
                <IonRow>
                    <IonCol>
                        <p>Select stores to see the price history</p>
                    </IonCol>
                </IonRow>
            )}
        </div>
    )
}
