import React from 'react';
import baby from './baby-head.png';
import download from './download.png';
import emoticon from './emoticon.png';
import style from './styles/style.css';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // var rows = prompt('number of rows');
    // var columns = prompt('number of columns');
    this.state = { rows: null, columns: null };
  }

  render() {
    const { rows, columns } = this.state;
    return (
      <>
        <h3>Enter number of rows</h3>
        <input
          type="text"
          onChange={(e) => this.setState({ rows: event.target.value })}
        />
        <h4>Enter number of columns</h4>
        <input
          type="text"
          onChange={(e) => this.setState({ columns: event.target.value })}
        />
        {rows && columns && (
          <Rows rows={this.state.rows} columns={this.state.columns} />
        )}
      </>
    );
  }
}

class Rows extends React.Component {
  constructor(props) {
    super();
    this.state = { ready: false, arr: [], counts: 0 };
  }

  componentDidMount() {
    document.addEventListener(
      'keyup',
      (event) => {
        let updatedGrid = this.state.grid;
        let counts = this.state.counts;
        let selectedRow = this.state.selectedRow;
        let selectedCol = this.state.selectedCol;
        let newRow = selectedRow,
          newCol = selectedCol;
        var keyName = event.key;
        var keycode = event.keyCode;
        if (keycode == 38) {
          if (selectedRow == 0) return;
          newRow = selectedRow - 1;
        }
        if (keycode == 37) {
          if (selectedCol == 0) return;
          newCol = selectedCol - 1;
        }
        if (keycode == 40) {
          if (selectedRow == this.props.rows - 1) return;
          newRow = selectedRow + 1;
        }
        if (keycode == 39) {
          if (selectedCol == this.props.columns - 1) return;
          newCol = selectedCol + 1;
        }
        counts++;
        let itemCount = this.state.itemCount;
        if (updatedGrid[newRow][newCol] === 1) {
          --itemCount;
          if (itemCount == 0) {
            setTimeout(function () {
              alert('Game Completed with steps ' + counts);
            }, 300);
          }
        }
        updatedGrid[selectedRow][selectedCol] = 0;
        updatedGrid[newRow][newCol] = 2;
        this.setState({
          grid: updatedGrid,
          selectedRow: newRow,
          selectedCol: newCol,
          counts: counts,
          itemCount: itemCount,
        });
      },
      false
    );

    var initialGrid = [];
    let numRows = this.props.rows;
    let numCols = this.props.columns;
    let itemCount = 0;
    for (var i = 0; i < numRows; i++) {
      var col = Math.ceil(numCols * Math.random()) - 1;
      var colpos = [];
      //var columns = []
      for (var j = 0; j < numCols; j++) {
        if (j == col) {
          colpos.push(1);
          ++itemCount;
        } else {
          colpos.push(0);
        }
      }
      initialGrid.push(colpos);
    }
    let selectedRow = parseInt(numRows / 2);
    let selectedCol = parseInt(numCols / 2);
    if (initialGrid[selectedRow][selectedCol] === 1) {
      --itemCount;
    }
    initialGrid[selectedRow][selectedCol] = 2;
    this.setState({
      grid: initialGrid,
      ready: true,
      selectedRow: selectedRow,
      selectedCol: selectedCol,
      itemCount: itemCount,
    });
  }

  render() {
    const that = this;
    let getRows = function () {
      var rows = [];
      var grid = that.state.grid;
      let numRows = that.props.rows;
      let numCols = that.props.columns;
      const tdStyle = {
        border: '1px solid black',
        height: '70px',
        width: '70px',
      };

      for (var i = 0; i < numRows; i++) {
        var col = Math.ceil(numCols * Math.random()) - 1;
        var colpos = [];
        var columns = [];
        for (var j = 0; j < numCols; j++) {
          if (grid[i][j] == 1) {
            columns.push(
              <td style={tdStyle} key={j}>
                <img src={emoticon} />
              </td>
            );
          } else if (grid[i][j] == 2) {
            columns.push(
              <td style={tdStyle} key={j}>
                <img src={baby} />
              </td>
            );
            //numRows++
          } else {
            columns.push(<td style={tdStyle} key={j}></td>);
          }
        }
        rows.push(<tr key={i}>{columns}</tr>);
      }
      return rows;
    };

    return (
      <div className="todoList centralize">
        <table style={{ border: '2px solid black' }}>
          <tbody>{this.state.ready ? getRows() : null}</tbody>
        </table>
      </div>
    );
  }
}
