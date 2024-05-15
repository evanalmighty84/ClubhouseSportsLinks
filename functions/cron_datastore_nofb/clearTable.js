const clearTable = async (table) => {
    try {
        const allRows = await table.getAllRows();
        const rowIds = allRows.map(row => row.ROWID);
        if (rowIds.length > 0) {
            await table.deleteRows(rowIds);
            console.log('Table cleared.');
        } else {
            console.log('Table is already empty.');
        }
    } catch (error) {
        console.error('Error clearing table:', error);
    }
};

module.exports = {
    clearTable
};
