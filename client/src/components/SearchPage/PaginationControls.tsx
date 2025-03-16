import { IonButton, IonIcon } from '@ionic/react';
import { arrowForward, arrowBack } from 'ionicons/icons';

interface PaginationControls {
    currentPage: number
    totalPages: number
    nextPage: () => void
    prevPage: () => void
    goToPage: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, nextPage, prevPage, goToPage }: PaginationControls) {
    const pagesToShow = 6; // Number of pages to display around the current page
    const halfRange = Math.floor(pagesToShow / 2); // Half of the range for centering the current page

    // Calculate the start and end page numbers to show, always including the currentPage
    let startPage = Math.max(1, currentPage - halfRange); // Ensure startPage is at least 1
    let endPage = Math.min(totalPages, currentPage + halfRange); // Ensure endPage doesn't exceed totalPages

    // If the calculated range is less than pagesToShow, adjust the start and end page accordingly
    if (endPage - startPage + 1 < pagesToShow) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + pagesToShow - 1);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - pagesToShow + 1);
        }
    }

    return (
        <div className="pagination">
            <IonButton
                onClick={prevPage}
                shape="round"
                className="controlButton"
                disabled={currentPage === 1}
            >
                <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
            </IonButton>

            {/* Render the page numbers */}
            {[...Array(endPage - startPage + 1)].map((_, index) => {
                const page = startPage + index;
                return (
                    <IonButton
                        key={page}
                        onClick={() => goToPage(page)}
                        color={currentPage === page ? 'primary' : 'light'}
                        className="pagination-button" // Apply class for consistent width
                    >
                        {page}
                    </IonButton>
                );
            })}

            <IonButton
                onClick={nextPage}
                shape="round"
                className="controlButton"
                disabled={currentPage === totalPages}
            >
                <IonIcon slot="icon-only" icon={arrowForward}></IonIcon>
            </IonButton>
        </div>
    );
}
