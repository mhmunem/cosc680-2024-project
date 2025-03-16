import { IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { ProductDetailsModal } from '../../components/ProductPage/ProductDetailsModal';
import { PaginationControls } from '../../components/SearchPage/PaginationControls';
import { SearchProductCard } from '../../components/SearchPage/SearchProductCard';
import { LoadingContainer } from '../../components/SharedComponents/loadingContainer';
import { getSearch } from "../../services/InitialSetupService";
import { Product } from '../../types/product';
import './SearchPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const SearchPage: React.FC = () => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

    const [disableDropdown, setdisableDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showProductDetails, setShowProductDetails] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [availableBrands, setAvailableBrands] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const [sortedAndFilteredProducts, setSortedAndFilteredProducts] = useState<Product[]>([]);
    const [sortValue, setSortValue] = useState('lowest-highest price');

    const [otherPrices, setOtherPrices] = useState<Product[]>([]);
    const [selectedStores, setSelectedStores] = useState<number[]>([]);

    const gridContainerRef = useRef<HTMLIonContentElement>(null);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const sortOptions = [
        { label: 'Alphabetical A-Z', value: 'az' },
        { label: 'Alphabetical Z-A', value: 'za' },
        { label: 'Price (Ascending)', value: 'lowest-highest price' },
        { label: 'Price (Descending)', value: 'highest-lowest price' },
        { label: 'Unit Price (Ascending)', value: 'lowest-highest unit price' },
        { label: 'Unit Price (Descending)', value: 'highest-lowest unit price' },
        { label: 'Volume (Ascending)', value: 'lowest-highest volume' },
        { label: 'Volume (Descending)', value: 'highest-lowest volume' },
    ];

    const default_search = 'the'

    // Fetches product data and initializes states on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let results: Product[] = (await getSearch(default_search, 'name', 'ASC')) || [];
                setProducts(results);

                const categories = Array.from(new Set(results.map(product => product.category.name)));
                setAvailableCategories(categories);


                const brands = Array.from(new Set(results.map(product => product.products.brand)));
                setAvailableBrands(brands);


                const savedQ = localStorage.getItem('quantities');
                const savedC = localStorage.getItem('addedToCart');

                if (savedQ && savedC) {
                    setQuantities(JSON.parse(savedQ));
                    setAddedToCart(JSON.parse(savedC));
                } else {
                    const initialQuantities = results.reduce(
                        (acc: { [key: string]: number }, product: Product) => {
                            const storeIdStr = product.store_products.id.toString();
                            acc[storeIdStr] = 0;
                            return acc;
                        },
                        {}
                    );
                    setQuantities(initialQuantities);
                    setAddedToCart({});
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    // Loads and sets dropdown state from localStorage
    useEffect(() => {
        const storedValue2 = localStorage.getItem('disableDropdown');
        if (storedValue2 !== null) {
            setdisableDropdown(JSON.parse(storedValue2));
        }
    }, []);


    // Loads and sets search history from localStorage
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchHistory(savedHistory);
    }, []);


    // Listens for cart updates and syncs state with localStorage
    useEffect(() => {
        const handleCartUpdate = () => {
            const savedQ = localStorage.getItem('quantities');
            const savedC = localStorage.getItem('addedToCart');
            if (savedQ && savedC) {
                setQuantities(JSON.parse(savedQ));
                setAddedToCart(JSON.parse(savedC));
            }
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);


    // Retrieves the previously selected stores from localStorage
    const getInitialSelectedStores = () => {
        const storedSelectedStores = localStorage.getItem('selectedStores');
        return storedSelectedStores ? JSON.parse(storedSelectedStores) : [];
    };


    // Listens for changes to 'selectedStores' in localStorage and updates state accordingly
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'selectedStores') {
                const updatedStores = event.newValue ? JSON.parse(event.newValue) : [];
                setSelectedStores(updatedStores);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    // Save updated quantities and cart state to localStorage
    const updateCart = (newQuantities: { [key: string]: number }, newAddedToCart: { [key: string]: boolean }) => {
        localStorage.setItem('quantities', JSON.stringify(newQuantities));
        localStorage.setItem('addedToCart', JSON.stringify(newAddedToCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };


    // Increase quantity of an item in cart / Trigger add to cart
    const increaseQuantity = (productId: string | number) => {
        const storeIdStr = productId.toString();
        const newQuantities = { ...quantities };
        newQuantities[storeIdStr] = (newQuantities[storeIdStr] || 0) + 1;

        const newAddedToCart = { ...addedToCart };
        newAddedToCart[storeIdStr] = true;

        setQuantities(newQuantities);
        setAddedToCart(newAddedToCart);
        updateCart(newQuantities, newAddedToCart);
    };


    // Decrease quantity of an item in car / Trigger remove from cart
    const decreaseQuantity = (productId: string | number) => {
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
    };


    const handleSearch = async () => {
        setSearchAttempted(true);
        if (query.length === 0) {
            try {
                let results: Product[] = await getSearch(default_search, 'name', 'ASC');
                setProducts(results);
                setError('');
            } catch (error) {
                console.error('Error searching products:', error);
                setError('Failed to search products. Please try again later.');
            }
        } else if (query.length < 3 || query.length > 50) {
            setError('Search query must be between 3 and 50 characters.');
            return;
        } else {
            try {
                let results = await getSearch(query, 'name', 'ASC');
                setProducts(results);
                setError('');
            } catch (error) {
                console.error('Error searching products:', error);
                setError('Failed to search products. Please try again later.');
            };
        }
    };


    // Hides the dropdown, updates the query state with the search bar's input value,
    // and updates search history when the Enter key is pressed.
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setShowDropdown(false);
            if (searchbarRef.current) {
                searchbarRef.current.getInputElement().then((input) => {
                    setQuery(input.value);
                    updateSearchHistory(query);
                });
            }
        }
    };


    // Hides the dropdown on blur and updates the search history with latest query
    const handleBlur = () => {
        setShowDropdown(false);
        if (searchbarRef.current) {
            searchbarRef.current.getInputElement().then((input) => {
                setQuery(input.value);
                updateSearchHistory(query);
            });
        }
    };


    // Retrieves search history and dropdown settings from local storage, then shows the dropdown if allowed
    const handleFocus = () => {
        const savedHistory = localStorage.getItem('searchHistory');
        setSearchHistory(savedHistory ? JSON.parse(savedHistory) : []);

        const storedValue1 = localStorage.getItem('disableDropdown');
        setdisableDropdown(storedValue1 === 'true');
        if (disableDropdown) {
            setTimeout(() => {
                setShowDropdown(true);
            }, 150);
        }
    };


    // Retrieves search history and dropdown settings from local storage, then displays dropdown
    const handleTextClick = () => {
        const savedHistory = localStorage.getItem('searchHistory');
        setSearchHistory(savedHistory ? JSON.parse(savedHistory) : []);

        const storedValue4 = localStorage.getItem('disableDropdown');
        setdisableDropdown(storedValue4 === 'true');
        setTimeout(() => {
            setShowDropdown(true);
        }, 150);
    };


    // Clears the search query, selected categories, brands, and resets sorting
    const handleClearSelection = () => {
        setQuery('');
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSortValue('lowest-highest price');
    };


    // Updates search history if query is between 3 and 50 characters and dropdown is enabled
    const updateSearchHistory = (newQuery: string) => {
        const storedValue3 = localStorage.getItem('disableDropdown');
        setdisableDropdown(storedValue3 === 'true');

        const savedHistory = localStorage.getItem('searchHistory');
        setSearchHistory(savedHistory ? JSON.parse(savedHistory) : []);

        if (!disableDropdown) return;
        if (!newQuery.trim() || newQuery.trim().length < 3 || newQuery.trim().length > 50) return;

        let updatedHistory: string[] = [];
        if (searchHistory.includes(newQuery)) {
            updatedHistory = [newQuery, ...searchHistory.filter(item => item !== newQuery)];
        } else {
            updatedHistory = [newQuery, ...searchHistory].slice(0, 5);
        }
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };


    // Selects a history item, sets it as the search query, and places cursor at the end
    const handleSelectHistoryItem = async (item: string) => {
        setTimeout(() => {
            if (searchbarRef.current) {
                searchbarRef.current.setFocus();
                const searchInput = searchbarRef.current.querySelector('input');
                if (searchInput) {
                    searchInput.value = item;
                    const length = item.length;
                    searchInput.setSelectionRange(length, length);
                }
            }
        }, 0);
        setShowDropdown(false);
    };


    // Retrieves other prices for a product, filtered by selected stores there are any
    const getOtherPrices = (product: Product) => {
        if (selectedStores.length <= 0) {
            return product && products
                .filter(
                    (prod) =>
                        prod.store_products.productID === product.store_products.productID
                );
        }
        return product && products
            .filter(
                (prod) =>
                    prod.store_products.productID === product.store_products.productID &&
                    selectedStores.includes(prod.store_products.storeID)
            );
    };


    // Opens product details modal and fetches other store prices for the selected product
    const openProductDetails = (product: Product) => {
        setSelectedProduct(product);
        setOtherPrices(getOtherPrices(product));
        setShowProductDetails(true);
    };


    // Closes product details modal
    const closeProductDetails = () => {
        setShowProductDetails(false);
    };


    // Ensures the current page is within valid bounds (not over total) when the product list changes
    useEffect(() => {
        const total = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);
        if (currentPage > total && total > 0) {
            setCurrentPage(total);
        } else if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [sortedAndFilteredProducts, currentPage, itemsPerPage]);


    // Automatically scroll up to the top of the results (used after page change)
    const productScrollUp = () => {
        return gridContainerRef.current?.scrollToTop(500);
    };


    // Proceed to next page of results
    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(sortedAndFilteredProducts.length / itemsPerPage)));
        productScrollUp();
    };


    // Revert to previous page of results
    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        productScrollUp();
    };


    // Go to a particular page of results
    const goToPage = (page: number) => {
        const total = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);
        if (page >= 1 && page <= total) {
            setCurrentPage(page);
            productScrollUp();
        }
    };


    // Filters, sorts, and updates the product list based on user selections and query
    useEffect(() => {
        setCurrentPage(1);

        let updatedProducts = [...products];

        // Filter products based on search query
        if (query) {
            updatedProducts = updatedProducts.filter((p) =>
                p.products.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Filter products based on selected categories
        if (selectedCategories.length > 0) {
            updatedProducts = updatedProducts.filter(product =>
                selectedCategories.includes(product.category.name)
            );
        }

        // Filter products based on selected brands
        if (selectedBrands.length > 0) {
            updatedProducts = updatedProducts.filter(product =>
                selectedBrands.includes(product.products.brand)
            );
        }
        // Filter products based on selected stores
        if (selectedStores.length > 0) {
            updatedProducts = updatedProducts.filter(product =>
                selectedStores.includes(product.store_products.storeID)
            );
        }

        // Keep only unique products with the lowest price
        const uniqueProductsMap = new Map<string, Product>();
        updatedProducts.forEach(product => {
            const productName = product.products.name;
            const existingProduct = uniqueProductsMap.get(productName);

            if (!existingProduct || product.store_products.price < existingProduct.store_products.price) {
                uniqueProductsMap.set(productName, product);
            }
        });

        updatedProducts = Array.from(uniqueProductsMap.values());


        // Sort products based on selected sorting option
        updatedProducts.sort((a, b) => {
            switch (sortValue) {
                case 'lowest-highest price':
                    return a.store_products.price - b.store_products.price;
                case 'highest-lowest price':
                    return b.store_products.price - a.store_products.price;
                case 'az':
                    return a.products.name.localeCompare(b.products.name);
                case 'za':
                    return b.products.name.localeCompare(a.products.name);
                case 'lowest-highest volume':
                    return a.products.amount - b.products.amount;
                case 'highest-lowest volume':
                    return b.products.amount - a.products.amount;
                case 'lowest-highest unit price':
                    return (b.products.amount / b.store_products.price) - (a.products.amount / a.store_products.price);
                case 'highest-lowest unit price':
                    return (a.products.amount / a.store_products.price) - (b.products.amount / b.store_products.price);

                default:
                    return 0;
            }
        });

        setSortedAndFilteredProducts(updatedProducts);
    }, [products, sortValue, selectedCategories, selectedBrands, selectedStores, itemsPerPage]);


    // Handles search updates and updates search history when query changes
    useEffect(() => {
        handleSearch();
        updateSearchHistory(query);
    }, [query]);


    // Reloads products by resetting selected stores to initial values
    const reloadProducts = () => {
        setSelectedStores(getInitialSelectedStores);

    };


    // Reloads products whenever the page enters
    useIonViewWillEnter(() => {
        reloadProducts();
    });


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="toolbar" color="primary">
                    <IonSearchbar
                        ref={searchbarRef}
                        value={query}
                        onIonChange={(e) => setQuery(e.detail.value!)}
                        onKeyUp={handleKeyDown}
                        onIonBlur={handleBlur}
                        onIonFocus={handleFocus}
                        onClick={handleTextClick}
                        placeholder="Search for products..."
                        debounce={300}
                        disabled={false}
                        className="searchbar"
                        onIonClear={() => {
                            setShowDropdown(false);
                            setQuery('');
                            //window.location.reload();
                        }}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent ref={gridContainerRef}>
                <div className="toolbar-container" >
                    <div className="searchHistory-container" >
                        {disableDropdown && showDropdown && (<IonList>
                            {searchHistory.map((item, index) => (
                                <IonItem
                                    key={index}
                                    button
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Stop bubbling
                                        handleSelectHistoryItem(item);
                                    }}
                                >
                                    {item}
                                </IonItem>
                            ))}
                        </IonList>)}
                    </div>
                    <div className="categoryDropdown-container">
                        <IonItem>
                            <IonSelect
                                multiple={true}
                                value={selectedCategories}
                                onIonChange={(e) => setSelectedCategories(e.detail.value)}
                                label="Category    "
                                labelPlacement="stacked"
                                className="dropdown"
                            >
                                {availableCategories.map((category, index) => (
                                    <IonSelectOption key={index} value={category}>
                                        {category}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>

                        </IonItem>
                        <IonItem>
                            <IonSelect
                                multiple={true}
                                value={selectedBrands}
                                onIonChange={(e) => setSelectedBrands(e.detail.value)}
                                label="Brand      "
                                labelPlacement="stacked"
                                className="dropdown"
                            >

                                {availableBrands.map((brand, index) => (
                                    <IonSelectOption key={index} value={brand}>
                                        {brand}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>

                        <IonItem>
                            <IonSelect
                                multiple={false}
                                value={sortValue}
                                onIonChange={(e) => setSortValue(e.detail.value)}
                                label="Sort by      "
                                labelPlacement="floating"
                                className="dropdown"
                            >
                                {sortOptions.map((option) => (
                                    <IonSelectOption key={option.value} value={option.value}>
                                        {option.label}
                                    </IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                        <button type="button" onClick={handleClearSelection} className="categories-clear-button">
                            Clear All
                        </button>
                    </div>
                </div>
                {searchAttempted && error && (
                    <div className="error-container">
                        <IonLabel className="error-message">{error}</IonLabel>
                    </div>
                )}
                {loading ? (<LoadingContainer />) : sortedAndFilteredProducts.length === 0 ? (
                    // Show "No results found" message if no products are returned
                    <div className="no-results-container">
                        <IonLabel>No results found</IonLabel>
                    </div>
                ) : (
                    // Display the grid of products if results exist
                    <div className="grid-container" >
                        <IonGrid>
                            <IonRow>
                                {sortedAndFilteredProducts.slice(startIndex, startIndex + itemsPerPage).map((product, index) => {
                                    return (
                                        <IonCol
                                            size="6"
                                            size-sm="4"
                                            size-md="4"
                                            size-lg="3"
                                            size-xl='3'
                                            key={index}
                                            class="ion-no-margin"
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
                                        </IonCol>
                                    );
                                })}
                            </IonRow>
                        </IonGrid>
                    </div>
                )}
                {!loading && sortedAndFilteredProducts.length > 0 && (<PaginationControls
                    currentPage={currentPage}
                    totalPages={Math.ceil(sortedAndFilteredProducts.length / itemsPerPage)}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    goToPage={goToPage}
                />)}
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
        </IonPage>
    );
};

export default SearchPage;
