function generateDates(): string[] {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 0, 31);
    const dates: string[] = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        dates.push(`${year}-${month}-${day}`);

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export default generateDates
