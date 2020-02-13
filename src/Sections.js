import React, {Component} from 'react'
import section from './sections.css'
import file from './Data.json'
const { ipcRenderer } = window.require('electron')

//    <span className="button display-topright">&times;</span>
    // <footer className="md-container teal">
    //   <p>Modal Footer</p>
    // </footer>

// let infosdata = editJsonFile(`${__dirname}/src/Data.json`)
// console.log(infosdata.get('country'))
let ConfigModal = ()=> {
  return  <div id="id01"  className="md-modal">
  <div className="modal-content">
    <header className="md-container teal deep-orange darken-4">

      <h2>Configuration</h2>
    </header>

    <div className="md-container">
      <p>Please enter city name.</p>
      <input type="text" placeholder="City Name" id="city" name="city" className="mt-3"/>
      <button className="waves-effect waves-light btn mt-3 deep-orange darken-4 " name="submitCity" >Submit</button>
    </div>


  </div>
</div>
}
class Informations extends Component{
  constructor(props){
    super(props)
    ipcRenderer.send('update-data', 'ping')
    this.state  = {
      date:  new Date().toLocaleDateString(),
      time:  new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      // data: JSON.parse(infosdata)
    }
    setInterval( () => {
     this.setState({
         time:  new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
     })
    },1000)
  }
  getDate() {
    return this.state.date
  }
  getTime() {
    return this.state.time
  }
  config() {
    if(file.country === "" || file.city === ""  || file.locale === "")
    {
      return <ConfigModal />
    }
  }
  render (){
    return (
      <div className="col s11 infos">
                  {this.config()}
                  <div className="left">
                    <h5 className="info">Locale date : <span>{this.getDate()}</span></h5>
                  </div>
                  <div className="right">
                    <h5 className="info">Locale time : <span>{this.getTime()}</span></h5>
                  </div>
                  <div className="col sl12 clear">
                    <h5>Location : {file.country}, {file.city}</h5>
                  </div>
           </div>
  )
}
}

class Sections extends Component {

  render (){
    return (
      <div className="container">
        <Informations />
      </div>
    )
  }
}

export default Sections
