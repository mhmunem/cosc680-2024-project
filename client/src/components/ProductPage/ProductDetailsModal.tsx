import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonModal,
    IonRow, IonButtons, IonButton
} from '@ionic/react';
import { ProductDetails } from '../../components/ProductPage/ProductDetails';
import { PriceHistory } from '../../components/ProductPage/PriceHistory';
import { Product } from '../../types/product';

interface ProductDetailsModal {
    decreaseQuantity: (product_id: string | number) => void
    increaseQuantity: (product_id: string | number) => void
    quantities: { [key: string]: number }
    selectedProduct: Product | null
    showProductDetails: boolean
    closeProductDetails: () => void
    allPrices: Product[] | null // TODO: remove null when the bug on the ShoppingListPage on line 191 is fixed
}

export function ProductDetailsModal({ decreaseQuantity, increaseQuantity, quantities, selectedProduct, showProductDetails, closeProductDetails, allPrices }: ProductDetailsModal) {

    if (!selectedProduct) {
        return null;
    }

    return (
        <IonModal isOpen={showProductDetails} onDidDismiss={closeProductDetails}>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonButton onClick={closeProductDetails}>Close</IonButton>
                    </IonButtons>
                    <IonTitle>Product Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {selectedProduct ? (
                    <div style={{ padding: '16px' }}>
                        {/* Product Name */}
                        <IonRow>
                            <h2>{selectedProduct.products.name}</h2>
                        </IonRow>

                        {/* Product Details Section */}
                        <div>
                            <ProductDetails
                                decreaseQuantity={decreaseQuantity}
                                increaseQuantity={increaseQuantity}
                                quantities={quantities}
                                product={selectedProduct}
                            />
                        </div>
                        <div style={{ marginTop: '30px', padding: "5px", width: "100%" }}>

                            {/* Price History Section */}
                            <PriceHistory
                                allPrices={allPrices!} // BUG: this is a bug waiting to happen. we need to remove the nullability here or deal with it earlier
                            />
                        </div>
                        {/* Additional Product Details */}
                        {/* <IonList>
                            <IonItem>
                                <IonLabel>
                                    <h2>Product Details</h2>
                                    <p>{selectedProduct.products.details}</p>
                                </IonLabel>
                            </IonItem> */}

                            {/* Product Ingredients Section */}
                            {/* <IonItem>
                                <IonLabel>
                                    <h2>Ingredients</h2>
                                    <p>Butter, sugar, water, olive oil, baking powder</p>
                                </IonLabel>
                            </IonItem> */}
                            {/* Nutritional Information Section */}
                            {/* <IonItem>
                                <IonLabel>
                                    <h2>Nutritional Information</h2>

                                    <IonLabel>
                                        <h3>Suggested Serving Size: 100g</h3>
                                    </IonLabel>

                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="4"><strong>Nutrient</strong></IonCol>
                                            <IonCol size="4"><strong>Per Serving</strong></IonCol>
                                            <IonCol size="4"><strong>Per 100g</strong></IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Energy</IonCol>
                                            <IonCol size="4">kJ</IonCol>
                                            <IonCol size="4"> kJ</IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Protein</IonCol>
                                            <IonCol size="4">g</IonCol>
                                            <IonCol size="4">g</IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Carbohydrate</IonCol>
                                            <IonCol size="4">g</IonCol>
                                            <IonCol size="4">g</IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Sugar</IonCol>
                                            <IonCol size="4">g</IonCol>
                                            <IonCol size="4">g</IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Fat</IonCol>
                                            <IonCol size="4">g</IonCol>
                                            <IonCol size="4">g</IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Saturated Fat</IonCol>
                                            <IonCol size="4">g</IonCol>
                                            <IonCol size="4">g</IonCol>
                                        </IonRow>

                                        <IonRow>
                                            <IonCol size="4">Salt</IonCol>
                                            <IonCol size="4">g</IonCol>
                                            <IonCol size="4">g</IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonLabel>
                            </IonItem>
                        </IonList> */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </IonContent>
        </IonModal>
    );
}
