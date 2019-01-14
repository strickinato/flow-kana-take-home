/*
  The Model
  =========

  Here we construct a Grid model. It can either be Valid(grid) or Invalid(error).
  The grid we construct is an array of arrays representing the table
*/
class Grid {
    constructor(csvInput, numColumns) {
        let gridOrString = this.validateCsv(csvInput, numColumns);

        if ( Array.isArray(gridOrString) ) {
            this.data = new Valid( this.transformToRows(gridOrString, numColumns) );
        } else {
            this.data = new Invalid( gridOrString );
        }

        this.numColumns = numColumns;
    }

    validateCsv(csvInput, numColumns) {
        let cleanedInput = csvInput.trim();
        if (cleanedInput === "") {
            return "You must have at least some values!";
        }

        let values = cleanedInput.split(",");
        if (values.length > 100) {
            return "You cannot have more than 100 values!";
        }

        return values;
    }

    // Creates an array or arrays
    // with the values all empty strings
    filledArrays(rows, columns) {
        return new Array(rows).fill(0).map(() => {
            return new Array(columns).fill("");
        });
    }

    // Based on a size and an amount of values,
    // this creates an array of how many values
    // should go in each column.
    generateChunks(numRows, numColumns, numValues) {
        const totalSpaces = (numRows * numColumns);
        const emptySpaces = totalSpaces - numValues;

        const numFullColumns = numColumns - emptySpaces;

        const fullRows = new Array(numFullColumns).fill(numRows);
        const notFullRows = new Array(emptySpaces).fill(numRows - 1);

        return fullRows.concat(notFullRows);
    }

    // Given a mapping of columns indeces to the amount of values
    // that should go in that column, this breaks a collection
    // into those chunks
    chunkValues(chunkArray, values) {
        const chunkedValues = [];

        let counter = 0;
        chunkArray.forEach((chunkSize) => {
            chunkedValues.push(values.slice(counter, counter + chunkSize));
            counter += chunkSize;
        });

        return chunkedValues;
    }

    transformToRows(dataArray, numColumns) {
        const numValues = dataArray.length;
        const numRows = Math.ceil(numValues / numColumns);

        const chunks = this.generateChunks(numRows, numColumns, numValues);
        const chunkedValues = this.chunkValues(chunks, dataArray);

        const table = this.filledArrays(numRows, numColumns);

        for (let col=0; col < chunks.length; col++) {
            let currentChunk = chunkedValues[col];
            for (let row=0; row < currentChunk.length; row++) {
                let value = currentChunk[row];
                table[row][col] = value;
            }
        }

        return table;
    }

    isValid() {
        return this.data.constructor === Valid;
    }
}

class Valid {
    constructor(grid) {
        this.grid = grid;
    }
}

class Invalid {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}


/*
  The View
  =========

  The view takes in a grid, and depending on whether or not it is valid, generates the proper HTML
*/
class View {
    constructor(grid) {
        if ( grid.isValid() ) {
            this.html = this.renderTable(grid.data.grid, grid.numColumns);
        } else {
            this.html = this.renderError(grid.data.errorMessage);

        }
    }

    renderError(errorMessage) {
        let errorDiv = document.createElement("div");
        errorDiv.innerHTML = errorMessage;

        return errorDiv;
    }

    renderTable(grid, numColumns) {
        let table = document.createElement("table");

        // construct the headings
        let headingsRow = document.createElement("tr");
        for (let i=1; i <= numColumns; i++) {
            let header = document.createElement("th");
            header.innerHTML = i;
            headingsRow.appendChild(header);
        }
        table.appendChild(headingsRow);

        // construct the data rows
        for (let i=0; i < grid.length; i++) {
            let row = document.createElement("tr");

            for (let j=0; j < numColumns; j++ ) {
                let col = document.createElement("td");
                col.innerHTML = grid[i][j];
                row.appendChild(col);
            }

            table.appendChild(row);
        }

        return table;
    }
}


/*
  The Controller
  =========

  When the page loads, this bit of code:
    - Watches for relevant user event
    - Dispatches to model layer based on the inputs
    - Hands the model to the view
    - Then attaches the view to the page
*/

window.addEventListener('load', function() {
    const inputForm = document.forms["input-form"];
    const outputDiv = document.getElementById("output");

    inputForm.addEventListener('input', (e) => {
        // This is client side only so we don't actually need
        // to send anything
        e.preventDefault();

        // Grab the form data off the page
        const formElements = inputForm.elements;
        const csvInput = formElements.namedItem("input-csv").value;
        const numColumns = parseInt(formElements.namedItem("input-columns").value);

        // Generate a model
        let table = new Grid(csvInput, numColumns);

        // Use the model to generate a view
        let view = new View(table);

        // Attach it to the page
        outputDiv.innerHTML = '';
        outputDiv.appendChild(view.html);
    });
});


