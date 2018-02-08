   import React from 'react';
    
    export default class App extends React.Component {

	constructor(props){
		super(props)
		var rows = prompt("number of rows")
		var columns = prompt("number of columns")
		this.state = {rows:rows,columns:columns}
		console.log(' constructorSuccess on load');																									
	}

      render(){
      	return(
      		<Rows  rows={this.state.rows} columns={this.state.columns}/>
      		)
      }
    }
    
    class Rows extends React.Component {

        render() {
    		var rows =[]
    		let numRows=this.props.rows
    		let numCols = this.props.columns
    		console.log("numRows"+numRows+ " " +this.props.columns)
    		for(var i=0;i<numRows;i++){
    			var col = Math.ceil(numCols*Math.random());
    			rows.push(<Columns colLength={this.props.columns} num={col} rows={numRows} rownum={i+1} ></Columns>)
    		}
            return (

                <div className="todoList">
                    <table style={{border: "2px solid black"}}>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
    
    class Columns extends React.Component {

    	constructor(props){
    		super(props)
    		console.log("pr",props)
    		this.state = {tds:[],rownum:props.rownum}
    	}

 		componentDidMount(){
			document.addEventListener('keydown', (event) => {
			  var  keyName = event.key;
			  var keycode = event.keyCode
			      console.log('Combination of ctrlKey'+keycode+"  " +keyName);
			   if(keycode==39){
			   	this.state.tds[2]=<td style={{border:"1px solid black",height:"10px",width:"10px"}}><img src="baby-head-with-a-small-heart-outline.png"/></td>
			   }
			  if (keyName === 'Control') {
			    // do not alert when only Control key is pressed.
			    return;
			  }
			}, false); 
		}
      render(){
      	    var colLength = this.props.colLength
      	    var colnum = this.props.num
      	    var rows = this.props.rows
      	    var rowshalf =Math.ceil(rows/2)
      	    var colhalf =Math.ceil(colLength/2)
      	    var rownum = this.props.rownum
      	    var colIcon = Math.ceil(colLength/2)
      		// console.log(colLength+"   "+colnum +"  "+rownum)
      		// console.log("rownum"+rownum+ rows/2+"colicon"+colIcon)
      		var tds = []
      		for(var i=0;i<colLength;i++){
      			if(i==colnum-1){
      				tds.push(<td style={{border:"1px solid black",height:"10px",width:"10px"}}><img src="emoticon.png" /></td>)
      			}else if(rownum ==rowshalf&& colIcon==colhalf ){
	  				// tds.push(<td style={{border:"1px solid black",height:"10px",width:"10px"}}>1</td>)
	  				tds[rownum]=<td style={{border:"1px solid black",height:"10px",width:"10px"}}><img src="baby-head-with-a-small-heart-outline.png"/></td>
	  				 // tds.push(<iconPosition />)

	  				rownum++
	  			}else{
      				tds.push(<td style={{border:"1px solid black",height:"10px",width:"10px"}}>{this.props.children}</td>)
      			}

	  		this.setState({tds:tds,rownum:this.props.rownum})	 

      		}


      	return(
          <tr>
          {this.state.tds}
          </tr>
      		)
      }
    }
    class iconPosition extends React.Component {
 		keyDownTextField(ev){
 			console.log("event")
 		}
 		componentDidMount(){
 			document.addEventListener("onkeydown", keyDownTextField, false);
 		}
    	render(){
    		return(

    			<td style={{border:"1px solid black",height:"10px",width:"10px"}} onKeyPress={this.handleKeyPress} ><img src="queen.png"/>
    			<input type ="hidden" id = "in" />
    			</td>
    			)
    	}

    }
    



