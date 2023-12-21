import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps ={
    nrows : 5,
    ncols :5,
    chanceLightStartOn : 0.25

  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon : false,
      board : this.createBoard(),

    }
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i =0; i < this.props.nrows; i++){
        let row =[];
        for (let j=0; j< this.props.ncols; j++)
        {

          row.push(Math.random() < this.props.chanceLightStartOn);
        }
        board.push(row);

    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log('Flipping' + coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(x,y+1);
    flipCell(x,y-1);
   
    let hasWon = board.every(row => row.every( cell => !cell));
    this.setState({board: board, hasWon:hasWon });
  }


  /** Render game board or winning message. */

  render() {
    if (this.state.hasWon){
        return (<h1> YOU Won</h1>)

    }
    let tblBoard =[];
    for (let i=0; i<this.props.nrows; i++){
      let row =[];
      for (let j=0; j< this.props.ncols; j++){
          let coords = `${i}-${j}`;
        
          row.push(<Cell coords={coords} isLit ={this.state.board[i][j]}
              flipCellsAroundMe ={()=>this.flipCellsAround(coords) }
            />);
         
      }
      tblBoard.push(<tr key={i}>{row}</tr>);
    
    }
    return ( <table className="Board"> {tblBoard}</table>);
  }
}


export default Board;
