import React, {Component} from 'react'
import section from './sections.css'
import file from './Data.json'
import $ from 'jquery'
const { ipcRenderer } = window.require('electron')

//    <span className="button display-topright">&times;</span>
    // <footer className="md-container teal">
    //   <p>Modal Footer</p>
    // </footer>

// let infosdata = editJsonFile(`${__dirname}/src/Data.json`)
// console.log(infosdata.get('country'))
class ConfigModal extends Component {

   //Handel the submit click of configuration Modal
  submitCity(country, city, method){
    let data = ipcRenderer.sendSync('timing-data', {"country": country, "city": city, "method": method});
    //fill inforamtion section
    document.getElementById('country').innerHTML = data.locationData.country
    document.getElementById('city').innerHTML = data.locationData.city
    // document.getElementById('configModal').style.display = "none"
    $.hide($('div#configModal'))
    //fill timing table
    document.getElementById('fajr').innerHTML = data.timingData.data.timings.Fajr
    document.getElementById('sunrise').innerHTML = data.timingData.data.timings.Sunrise
    document.getElementById('duhr').innerHTML = data.timingData.data.timings.Dhuhr
    document.getElementById('asr').innerHTML = data.timingData.data.timings.Asr
    document.getElementById('maghrib').innerHTML = data.timingData.data.timings.Maghrib
    document.getElementById('isha').innerHTML = data.timingData.data.timings.Isha
    document.getElementById('methodName').innerHTML = data.timingData.data.meta.method.name
  }

  render (){
    return  (
      <div id="configModal"  className="md-modal">
        <div className="modal-content">
          <header className="md-container teal deep-orange darken-4">

            <h2>Settings</h2>
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
            <div>
              <label className="bold">Calculation method : </label> <br/>
              <select id="calculationMethode">
                <option value="0"  > - Shia Ithna-Ansari   </option>
                <option value="1"  > - University of Islamic Sciences, Karachi </option>
                <option value="2"  > - Islamic Society of North America  </option>
                <option value="3"  selected> - Muslim World League  </option>
                <option value="4"  > - Umm Al-Qura University, Makkah  </option>
                <option value="5"  > - Egyptian General Authority of Survey  </option>
                <option value="7"  > - Institute of Geophysics, University of Tehran </option>
                <option value="8"  > - Gulf Region </option>
                <option value="9"  > - Kuwait </option>
                <option value="10"  > - Qatar </option>
                <option value="11"  > - Majlis Ugama Islam Singapura, Singapore </option>
                <option value="12"  > - Union Organization islamic de France </option>
                <option value="13"  > - Diyanet İşleri Başkanlığı, Turkey </option>
                <option value="14"  > - Spiritual Administration of Muslims of Russia </option>
                <option value="99"  > - Custom. See https://aladhan.com/calculation-methods </option>
              </select>
            </div>
            <br/>
            <button className="waves-effect waves-light btn mt-3 deep-orange darken-4" onClick={()=> this.submitCity(document.getElementById('country').value, document.getElementById('city').value, document.getElementById('calculationMethode').value)} name="submitCity" >Submit</button>
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
     //Refresh timing at midnight
     if ( new Date().toLocaleTimeString('en-US', {hour12: true }) === "12:00:00 AM") {
       let refreshedData = ipcRenderer.sendSync('refresh-timing', {"country": file.country, "city": file.city, "method": file.method});
       //fill refreshed timing table
       document.getElementById('fajr').innerHTML = refreshedData.data.timings.Fajr
       document.getElementById('sunrise').innerHTML = refreshedData.data.timings.Sunrise
       document.getElementById('duhr').innerHTML = refreshedData.data.timings.Dhuhr
       document.getElementById('asr').innerHTML = refreshedData.data.timings.Asr
       document.getElementById('maghrib').innerHTML = refreshedData.data.timings.Maghrib
       document.getElementById('isha').innerHTML = refreshedData.data.timings.Isha

     }

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

class Timings extends Component {
  constructor() {
    super()
  }

  render(){
    return (

  <div className="col s12 m7">
    <div className="card horizontal  deep-orange lighten-4">
      <div className="card-stacked">
        <div className="card-content">
          <table className="highlight">

			<thead>
      <tr>
        <th className="center-align">Salat</th>
        <th className="center-align">Time</th>
      </tr>
      </thead>

			<tbody>
			<tr>
				<th className="center-align">Fajr : </th>
				<td id="fajr" className="center-align">{file.timings.Fajr}</td>
			</tr>
			<tr>
				<th className="center-align">Sunrise : </th>
				<td id="sunrise" className="center-align">{file.timings.Sunrise}</td>
			</tr>
			<tr>
				<th className="center-align">Duhr : </th>
				<td id="duhr" className="center-align">{file.timings.Dhuhr}</td>
			</tr>
			<tr>
				<th className="center-align">Asr : </th>
				<td id="asr" className="center-align">{file.timings.Asr}</td>
			</tr>
			<tr>
				<th className="center-align">Maghrib : </th>
				<td id="maghrib" className="center-align">{file.timings.Maghrib}</td>
			</tr>
			<tr>
				<th className="center-align">Icha : </th>
				<td id="isha" className="center-align">{file.timings.Isha}</td>
			</tr>
        </tbody>
		</table>
        </div>
        <div className="card-action">
        <span className="small-info">Timing by the method of <span id="methodName">{file.methodName}</span>.</span>
       </div>
      </div>
    </div>
  </div>


    )
  }
}

class Sections extends Component {

  constructor(){
    super()

    ipcRenderer.on('error-data', (arg)=>{
      console.error(arg);
    })

  }

  render (){
    return (
      <div className="container">
        <Informations />
        <br/>
        <br/>
        <Timings />
      </div>
    )
  }
}

export default Sections
