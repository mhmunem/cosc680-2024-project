
import { IonCard, IonCardContent, IonLabel, IonImg, IonCardTitle, IonButton } from '@ionic/react';
import { QuantityControls } from '../../components/SearchPage/QuantityControls';
import { Product } from '../../types/product';


interface SearchProductCard {
    decreaseQuantity: (product_id: string | number) => void
    increaseQuantity: (product_id: string | number) => void
    quantities: { [key: string]: number }
    product: Product
    productPrice: number
    productName: string
    productImage: string
    openProductDetails: (product: Product) => void
}

export function SearchProductCard(this: any, {
    decreaseQuantity,
    increaseQuantity,
    quantities,
    product,
    productPrice,
    productName,
    productImage,
    openProductDetails
}: SearchProductCard) {
    return (
        <IonCard className="listCard" onClick={() => {
            openProductDetails(product)

        }}>
            <IonImg
                src={productImage}
                className="productImage"
                alt={productName}
                onIonError={(e) => {
                    e.target.src = "https://a.fsimg.co.nz/product/retail/fan/image/200x200/529109";
                }}
            />

            <IonCardContent>
            <div>
                <IonCardTitle className="one-line-title" onClick={() => openProductDetails(product)}>
                    {productName}
                </IonCardTitle>
             </div>
                <div className="productDetails">

                    <div>
                        <IonLabel className="brandText">{product.products.brand.slice(0, 12)}</IonLabel>
                        <IonLabel className="sizeText">{product.products.amount} {product.units.name}</IonLabel>
                        <IonLabel className="sizeText">
                            {product.units.name === 'ea'
                                ? `` // Display price per item if unit is 'ea'
                                : `$${(product.store_products.price / product.products.amount).toFixed(2)}/${product.units.name}`}
                        </IonLabel>

                    </div>

                    <IonLabel className="priceLabel">${productPrice.toFixed(2)}</IonLabel>
                    {quantities[product.store_products.id] > 0 ? (
                        <div
                            onClick={(event) => event.stopPropagation()} // Prevents opening details when interacting with quantity controls
                        >
                            <QuantityControls
                                decreaseQuantity={decreaseQuantity}
                                increaseQuantity={increaseQuantity}
                                quantities={quantities}
                                product={product}
                            />
                        </div>
                    ) : (
                        <IonButton className='add-to-list-button'
                            onClick={(event) => {
                                event.stopPropagation(); // Prevents opening details when clicking "Add to List"
                                increaseQuantity(product.store_products.id);
                            }}

                        >
                            Add to List
                        </IonButton>

                    )}

                </div>
            </IonCardContent>
        </IonCard>
    );
}

