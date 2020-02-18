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
class ConfigModal extends Component {

   //Handel the submit click of configuration Modal
  submitCity(country, city){
    let locationData = ipcRenderer.sendSync('location-data', {"country": country, "city": city});
    console.log(locationData);
    document.getElementById('country').HTML = locationData.country
    document.getElementById('city').HTML = locationData.city
    document.getElementById('configModal').style.display = "none"

  }

  render (){
    return  (
      <div id="configModal"  className="md-modal">
        <div className="modal-content">
          <header className="md-container teal deep-orange darken-4">

            <h2>Configuration</h2>
          </header>

          <div className="md-container">
            <p>Please enter your country and city name.</p>
            <div><label className="bold">Country : </label>
            <input type="text" placeholder="Country Name" id="country" name="country" className="mt-3"/>
            </div>
            <div>
            <label className="bold">City : </label>
            <input type="text" placeholder="City Name" id="city" name="city" className="mt-3"/>
            </div>
            <button className="waves-effect waves-light btn mt-3 deep-orange darken-4" onClick={()=> this.submitCity(document.getElementById('country').value, document.getElementById('city').value)} name="submitCity" >Submit</button>
            <span id="err" className="deep-red darken-4"></span>
          </div>
        </div>
      </div>
   )
  }
}

class Informations extends Component{
  constructor(props){
    super(props)
    this.state  = {
      date:  new Date().toLocaleDateString(),
      time:  new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
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
  //check if the data is in JSON file
  config() {
    if(file.country === "" || file.city === "")
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
                    <h5>Location : <span id="country">{file.country}</span>,  <span id="city">{file.city}</span></h5>
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
