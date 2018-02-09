   import React from 'react';
    
    export default class App extends React.Component {

		constructor(props){
			super(props)
			var rows = prompt("number of rows")
			var columns = prompt("number of columns")
			this.state = {rows:rows,columns:columns}
		}

		render(){
			return(
				<Rows  rows={this.state.rows} columns={this.state.columns}/>
				)
		}
    }
    
    class Rows extends React.Component {

    	constructor(props){
    		super()
    		this.state={ ready: false,arr:[],counts:0 }
    	}

    	componentDidMount(){
			document.addEventListener('keyup', (event) => {
			  let ar = this.state.arr;
			  let counts = this.state.counts
			  let selectedRow = this.state.selectedRow;
			  let selectedCol = this.state.selectedCol;
			  let newRow = selectedRow,newCol = selectedCol;
			  var  keyName = event.key;
			  var keycode = event.keyCode
			      console.log('Combination of ctrlKey'+keycode+"  " +keyName);
			   if(keycode==38){
			   	if(selectedRow==0)
			   		return
			   	  newRow = selectedRow -1;
			   }
			   if(keycode==37){
			   	  if(selectedCol ==0)
			   	  	return
			   	  newCol = selectedCol -1;

			   }
			   if(keycode==40){
			   	  if(selectedRow== (this.props.rows-1))
			   	  	return
			   	  newRow = selectedRow +1;

			   }	
			   if(keycode==39){
			   	  if(selectedCol== (this.props.columns-1))
			   	  	return
			   	  newCol = selectedCol +1;

			   }	
			   counts++;
			   let itemCount = this.state.itemCount;
			   if(arr[newRow][newCol] ===1){
			  	--itemCount; 
			  	if(itemCount == 0){
			  		setTimeout(function(){
			  		alert("Game Completed with steps "+counts)
			  	},300);
			  	}
			  }
			  arr[selectedRow][selectedCol] = 0;
			  arr[newRow][newCol] = 2;
			  this.setState({arr: ar,selectedRow:newRow,selectedCol: newCol,counts:counts,
			  	itemCount: itemCount});
			}, false); 


    		var arr = []
    		let numRows=this.props.rows
    		let numCols = this.props.columns
    		console.log("numRows"+numRows+ " " +this.props.columns)
    		let itemCount = 0;
    		for(var i=0;i<numRows;i++){
    			var col = Math.ceil(numCols*Math.random())-1;
    			var colpos = []
    			//var columns = []
    			for(var j=0;j<numCols;j++){

    				if(j==col){
    					colpos.push(1)
    					++itemCount;
    				}else{
	  					colpos.push(0)
    				}
    			}
    			arr.push(colpos)	
    			//rows.push(<tr>{columns}</tr>);
    		}
    		console.log("Item count "+itemCount);
    		let selectedRow = parseInt(numRows/2);
    		let selectedCol = parseInt(numCols/2);
    		if(arr[selectedRow][selectedCol] === 1){
    			--itemCount;
    		}
    		arr[selectedRow][selectedCol] = 2;
    		this.setState({arr:arr,ready:true,selectedRow:selectedRow,selectedCol:selectedCol,itemCount: itemCount});
		}

        render() {
        	const that = this;
        	let getRows = function(){
        		var rows =[]
	    		var arr = that.state.arr;
	    		let numRows=that.props.rows
	    		let numCols = that.props.columns
	    		console.log("numRows"+numRows+ " " +that.props.columns)
	    		const tdStyle = {border:"1px solid black",height:"70px",width:"70px"};

	    		for(var i=0;i<numRows;i++){
	    			var col = Math.ceil(numCols*Math.random())-1;
	    			var colpos = []
	    			var columns = []
	    			for(var j=0;j<numCols;j++){

	    				if(arr[i][j] == 1){
	    					columns.push(<td style={tdStyle} key={j}><img src="emoticon.png"/></td>)
	    				}else if(arr[i][j] == 2){
	    					
		  					columns.push(<td style={tdStyle} key={j}><img src="baby-head-with-a-small-heart-outline.png"/></td>)
		  				//numRows++
		  				}else{
		  					columns.push(<td style={tdStyle} key={j}></td>)
	    				}
	    			}	
	    			rows.push(<tr key={i}>{columns}</tr>);
	    		}
    			return rows;
        	};

            return (

                <div className="todoList">
                    <table style={{border: "2px solid black"}}>
                        <tbody>
                       		
                        		{this.state.ready?getRows():null}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
    
