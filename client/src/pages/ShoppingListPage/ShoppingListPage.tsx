import React, { useEffect, useState, useCallback } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonButton, IonItem, IonSelect, IonImg,
    IonSelectOption, IonModal,
    IonButtons
} from '@ionic/react';
import { getSearch } from '../../services/InitialSetupService';
import { SearchProductCard } from '../../components/SearchPage/SearchProductCard';
import { ProductDetailsModal } from '../../components/ProductPage/ProductDetailsModal';
import './ShoppingListPage.css';
import { Product } from '../../types/product';
import { getStores } from '../../services/StoreService';

interface StoreInfo {
    id: number;
    chainID: number;
    name: string;
    image_logo?: string;
}

const ShoppingListPage: React.FC = () => {
    // State for shopping cart data: quantities, items added, etc.
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});

    const [products, setProducts] = useState<Product[]>([]);

    //For the product details modal usage
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [otherPrices, setOtherPrices] = useState<Product[]>([]);

    const [allStores, setAllStores] = useState<StoreInfo[]>([]);
    const [selectedStoreIds, setSelectedStoreIds] = useState<number[]>([]);
    //and an "activeStoreId" used to filter cart items by single store.
    const [activeStoreId, setActiveStoreId] = useState<number | null>(null);
    // Missing items modal: if some products are not in the chosen store
    const [showMissingModal, setShowMissingModal] = useState(false);
    const [missingProducts, setMissingProducts] = useState<string[]>([]);
    // allowedProductIds: used to allow items that are available
    // in the selected store, even if their storeID doesn't match directly
    // (a user-chosen extension of filtering).
    const [allowedProductIds, setAllowedProductIds] = useState<Set<number>>(new Set());

    // retrieve localStorage data for cart items (quantities, addedToCart) 
    // and the user-chosen store IDs (selectedStores).
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getSearch('', 'name', 'ASC');
                setProducts(result);
            } catch (err) {
                console.error('Error fetching products in ShoppingListPage:', err);
            }

            try {
                const resp = await getStores();
                const storeData = await resp.json();
                setAllStores(storeData);
            } catch (err) {
                console.error('Error fetching stores:', err);
            }
        };
        fetchData();

        // TODO: add products to session storage
        const savedQ = localStorage.getItem('quantities');
        const savedC = localStorage.getItem('addedToCart');
        if (savedQ && savedC) {
            setQuantities(JSON.parse(savedQ));
            setAddedToCart(JSON.parse(savedC));
        }

        const storedSelectedStores = localStorage.getItem('selectedStores');
        if (storedSelectedStores) {
            setSelectedStoreIds(JSON.parse(storedSelectedStores));
        }
    }, []);
    // Listen for cartUpdated and storesUpdated events
    // to keep local cart state and selected store IDs in sync with localStorage changes.
    useEffect(() => {
        const handleCartUpdate = () => {
            const savedQ = localStorage.getItem('quantities');
            const savedC = localStorage.getItem('addedToCart');
            if (savedQ && savedC) {
                setQuantities(JSON.parse(savedQ));
                setAddedToCart(JSON.parse(savedC));
            }
        };

        const handleStoresUpdated = () => {
            const updated = localStorage.getItem('selectedStores');
            setSelectedStoreIds(updated ? JSON.parse(updated) : []);
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('storesUpdated', handleStoresUpdated);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('storesUpdated', handleStoresUpdated);
        };
    }, []);
    // baseCartProducts: items that the user actually put in the cart
    const baseCartProducts = products.filter((item) => {
        const storeIdStr = item.store_products.id.toString();
        return addedToCart[storeIdStr] && (quantities[storeIdStr] || 0) > 0;
    });

    console.log('Base Cart Products =>', baseCartProducts);
    // filteredCartProducts: If a store is selected, only show items
    // whose storeID matches or are allowed via allowedProductIds.
    // Otherwise show all baseCartProducts.
    const filteredCartProducts = activeStoreId
        ? baseCartProducts.filter(
            (p) =>
                p.store_products.storeID === activeStoreId ||
                allowedProductIds.has(p.products.id)
        )
        : baseCartProducts;

    console.log('Filtered Cart Products (activeStoreId =', activeStoreId, ') =>', filteredCartProducts);

    const getOtherPrices = (product: Product | null): Product[] => {
        if (!product) return [];
        // If no store was selected in StorePage, show all possible store records
        if (selectedStoreIds.length === 0) {
            return products.filter(
              (prod) =>
                 prod.store_products.productID === product.store_products.productID
            );
        }
        // Otherwise only show records from the user-chosen storeIDs
        return products.filter(
            (prod) =>
                prod.store_products.productID === product.store_products.productID &&
                selectedStoreIds.includes(prod.store_products.storeID)
        );
    };

    const totalPrice = filteredCartProducts.reduce((acc, item) => {
        const storeIdStr = item.store_products.id.toString();
        const q = quantities[storeIdStr] || 0;
        // if no specific store is selected => just use item.store_products.price
        // If activeStoreId is selected => find price matching storeID = activeStoreId
        let priceToUse = item.store_products.price;// Defaults to the lowest “own-it” price first.

        if (activeStoreId) {
            // Find the storeID === activeStoreId in getOtherPrices(item).
            const records = getOtherPrices(item);
            const matched = records.find(
                (r) => r.store_products.storeID === activeStoreId
            );

            if (matched) {
                priceToUse = matched.store_products.price;
            }

        }

        return acc + priceToUse * q;
    }, 0);

    const updateCart = (newQuantities: { [key: string]: number }, newAddedToCart: { [key: string]: boolean }) => {
        localStorage.setItem('quantities', JSON.stringify(newQuantities));
        localStorage.setItem('addedToCart', JSON.stringify(newAddedToCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };
    // increaseQuantity, decreaseQuantity, removeItem: typical cart ops
    // that update the local state + localStorage.
    const increaseQuantity = useCallback(
        (productId: string | number) => {
            const storeIdStr = productId.toString();
            const newQuantities = { ...quantities };
            newQuantities[storeIdStr] = (newQuantities[storeIdStr] || 0) + 1;

            const newAddedToCart = { ...addedToCart };
            newAddedToCart[storeIdStr] = true;

            setQuantities(newQuantities);
            setAddedToCart(newAddedToCart);
            updateCart(newQuantities, newAddedToCart);
        },
        [quantities, addedToCart]
    );

    const decreaseQuantity = useCallback(
        (productId: string | number) => {
            const storeIdStr = productId.toString();
            const currentQuantity = quantities[storeIdStr] || 0;
            const newQuantity = Math.max(currentQuantity - 1, 0);

            const newQuantities = { ...quantities };
            newQuantities[storeIdStr] = newQuantity;

            const newAddedToCart = { ...addedToCart };
            newAddedToCart[storeIdStr] = newQuantity > 0;

            setQuantities(newQuantities);
            setAddedToCart(newAddedToCart);
            updateCart(newQuantities, newAddedToCart);
        },
        [quantities, addedToCart]
    );

    const removeItem = useCallback(
        (productId: string | number) => {
            const storeIdStr = productId.toString();
            const newQuantities = { ...quantities };
            newQuantities[storeIdStr] = 0;

            const newAddedToCart = { ...addedToCart };
            newAddedToCart[storeIdStr] = false;

            setQuantities(newQuantities);
            setAddedToCart(newAddedToCart);
            updateCart(newQuantities, newAddedToCart);
        },
        [quantities, addedToCart]
    );
    // openProductDetails: show the product detail modal
    // by retrieving all relevant store records via getOtherPrices.
    const openProductDetails = (p: Product) => {
        setSelectedProduct(p);
        setOtherPrices(getOtherPrices(p));
        setShowProductDetails(true);
    };

    const closeProductDetails = () => {
        setShowProductDetails(false);
    };

    const handleSelectStore = (storeId: number | null) => {
        console.log('Selected storeId:', storeId);
        setActiveStoreId(storeId);

        if (storeId) {
            // Find all available product IDs first
            const newAllowedProductIds = new Set<number>();
            // Iterate over each item in the cart.
            baseCartProducts.forEach((item) => {
                const itemOtherPrices = getOtherPrices(item);
                const anyMatch = itemOtherPrices.some(
                    (p) => p.store_products.storeID === storeId
                );
                // If anyMatch =>, it means the item is also available at the current storeId.
                if (anyMatch) {
                    newAllowedProductIds.add(item.products.id);
                }
            });

            setAllowedProductIds(newAllowedProductIds);
            // Simultaneous calculation of missing
            const missing = baseCartProducts
                .filter((item) => {
                    const itemOtherPrices = getOtherPrices(item);
                    console.log('itemOtherPrices for item', item, itemOtherPrices);

                    const anyMatch = itemOtherPrices.some(
                        (p) => p.store_products.storeID === storeId
                    );

                    console.log(
                        `Comparing item ${item.products.name} with storeId ${storeId}`,
                        'anyMatch =',
                        anyMatch
                    );

                    return !anyMatch;
                })
                .map((item) => item.products.name);

            if (missing.length > 0) {
                setMissingProducts(missing);
                setShowMissingModal(true);
            } else {
                setMissingProducts([]);
                setShowMissingModal(false);
            }
        } else {
            setMissingProducts([]);
            setShowMissingModal(false);
        }
    };
    // Show only stores that have been checked by the user
    const userStores = allStores.filter((st) => selectedStoreIds.includes(st.id));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>My Shopping List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="shopping-list-content" style={{ '--padding-bottom': '200px' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
                    <IonItem lines="none">
                        <IonLabel>Filter By Store:</IonLabel>
                        <IonSelect
                            placeholder="All Stores"
                            value={activeStoreId}
                            onIonChange={(e) => handleSelectStore(e.detail.value)}
                        >
                            <IonSelectOption value={null}>All Stores</IonSelectOption>
                            {userStores.map((store) => (
                                <IonSelectOption key={store.id} value={store.id}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {store.image_logo && (
                                            <IonImg
                                                src={store.image_logo}
                                                alt={store.name}
                                                style={{ width: 20, height: 20, marginRight: 6 }}
                                            />
                                        )}
                                        {store.name}
                                    </div>
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                </div>

                {filteredCartProducts.length === 0 ? (
                    <div className="empty-cart-message">
                        <IonLabel>No products in current store selection.</IonLabel>
                    </div>
                ) : (
                    <IonGrid>
                        <IonRow>
                            {filteredCartProducts.map((product) => {
                                const storeIdStr = product.store_products.id.toString();
                                return (
                                    <IonCol
                                        size="6"
                                        size-sm="4"
                                        size-md="4"
                                        size-lg="3"
                                        key={product.store_products.id}
                                        className="ion-no-margin"
                                    >
                                        <SearchProductCard
                                            decreaseQuantity={decreaseQuantity}
                                            increaseQuantity={increaseQuantity}
                                            quantities={quantities}
                                            product={product}
                                            productName={product.products.name}
                                            productPrice={product.store_products.price}
                                            productImage={product.products.image}
                                            openProductDetails={openProductDetails}
                                        />
                                        <IonButton
                                            color="danger"
                                            onClick={() => removeItem(storeIdStr)}
                                            style={{ marginTop: '8px', width: '100%' }}
                                        >
                                            Remove
                                        </IonButton>
                                    </IonCol>
                                );
                            })}
                        </IonRow>
                    </IonGrid>
                )}

                <ProductDetailsModal
                    decreaseQuantity={decreaseQuantity}
                    increaseQuantity={increaseQuantity}
                    quantities={quantities}
                    selectedProduct={selectedProduct}
                    showProductDetails={showProductDetails}
                    closeProductDetails={closeProductDetails}
                    allPrices={otherPrices}
                />
            </IonContent>

            {filteredCartProducts.length > 0 && (
                <div className="total-price-container">
                    <IonItem lines="none" className="total-price-item">
                        <IonLabel>
                            <strong>Total:</strong> ${totalPrice.toFixed(2)}
                        </IonLabel>
                    </IonItem>
                </div>
            )}

            <IonModal
                isOpen={showMissingModal}
                onDidDismiss={() => setShowMissingModal(false)}
            >
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Missing Items</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setShowMissingModal(false)}>
                                Close
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {missingProducts.length > 0 ? (
                        <div style={{ padding: '16px' }}>
                            <p>The following items are not available in the selected store:</p>
                            <ul>
                                {missingProducts.map((mp) => (
                                    <li key={mp}>{mp}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div style={{ padding: '16px' }}>No missing products.</div>
                    )}
                </IonContent>
            </IonModal>
        </IonPage>
    );
};

export default ShoppingListPage;
