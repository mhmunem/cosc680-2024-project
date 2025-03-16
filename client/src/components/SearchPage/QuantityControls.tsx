import { IonIcon, IonButton } from '@ionic/react';
import { add, remove } from 'ionicons/icons';
import { Product } from "../../types/product"

interface QuantityControls {
    decreaseQuantity: (product_id: string | number) => void
    increaseQuantity: (product_id: string | number) => void
    quantities: { [key: string]: number }
    product: Product
}

export function QuantityControls({ decreaseQuantity, increaseQuantity, quantities, product }: QuantityControls) {
    return (
        <div className="quantityControls">
            <IonButton
                shape="round"
                className="controlButton"
                aria-label="Decrease quantity"
                onClick={() => decreaseQuantity(product.store_products.id)}
            >
                <IonIcon slot="icon-only" icon={remove} />
            </IonButton>

            <p className="quantityText">{quantities[product.store_products.id]}</p>

            <IonButton
                shape="round"
                className="controlButton"
                aria-label="Increase quantity"
                onClick={() => increaseQuantity(product.store_products.id)}
            >
                <IonIcon slot="icon-only" icon={add} />
            </IonButton>
        </div>
    );
}
