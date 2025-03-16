import { IonLabel, IonImg, IonRow, IonButton } from '@ionic/react';
import { QuantityControls } from '../../components/SearchPage/QuantityControls';
import { Product } from '../../types/product';

interface ProductDetails {
    decreaseQuantity: (product_id: string | number) => void
    increaseQuantity: (product_id: string | number) => void
    quantities: { [key: string]: number }
    product: Product
}

export function ProductDetails({ decreaseQuantity, increaseQuantity, quantities, product }: ProductDetails) {

    return (
        <IonRow>
            <IonImg src={product.products.image} />
            <div className="productDetails">
                <div>
                    <IonRow>
                        <IonLabel className="brandText">Brand: {product.products.brand}</IonLabel>
                    </IonRow>
                    <IonLabel className="sizeText">
                        {product.units.name === 'ea'
                            ? '' // If the unit is 'ea', no amount or unit type is displayed
                            : `Weight/Volume: ${product.products.amount}${product.units.name}`}
                    </IonLabel>
                    <IonLabel className="sizeText">Unit Price:
                        {product.units.name === 'ea'
                            ? `$${product.store_products.price.toFixed(2)} ea` // Display price per item if unit is 'ea'
                            : `$${(product.store_products.price / product.products.amount).toFixed(2)} per ${product.units.name}`}
                    </IonLabel>
                    <IonRow>
                        <IonLabel className="sizeText">Category: {product.category.name}</IonLabel>
                    </IonRow>
                    <IonRow>
                        <IonLabel className="priceLabel">${product.store_products.price}</IonLabel>
                    </IonRow>

                    {quantities[product.store_products.id] > 0 ? (
                        <QuantityControls
                            decreaseQuantity={decreaseQuantity}
                            increaseQuantity={increaseQuantity}
                            quantities={quantities}
                            product={product}
                        />
                    ) : (
                        <IonButton className='add-to-list-button' onClick={() => increaseQuantity(product.store_products.id)}>
                            Add to List
                        </IonButton>

                    )}
                </div>
            </div>
        </IonRow>
    );
}
