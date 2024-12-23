class ShapeData {
    static COLUMNS = ['file', 'centerX', 'centerY', 'radius', 'vertices', 'angle', 'perimeter'];

    constructor() {
        this.table = new p5.Table();
        this.initializeTable();
    }

    initializeTable() {
        ShapeData.COLUMNS.forEach(column => this.table.addColumn(column));
    }

    addRow(data) {
        const newRow = this.table.addRow();
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string') {
                newRow.setString(key, value);
            } else {
                newRow.setNum(key, value);
            }
        });
    }

    save() {
        saveTable(this.table, 'shape_data.csv', 'csv');
    }
}
