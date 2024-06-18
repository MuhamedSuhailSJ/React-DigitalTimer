import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: 0, buttonstate: false}

  incrementrange = () => {
    const {buttonstate} = this.state
    if (buttonstate === false) {
      this.setState(prevstate => ({minutes: prevstate.minutes + 1}))
    }
  }

  decrementrange = () => {
    const {buttonstate} = this.state
    if (buttonstate === false) {
      this.setState(prevstate => ({minutes: prevstate.minutes - 1}))
    }
  }

  changeminutes = event => {
    this.setState({minutes: event.target.value, seconds: 0})
  }

  updatation = () => {
    console.log('Setted')
    const {minutes, seconds,buttonstate} = this.state
    let milliseconds = minutes * 60000 + seconds * 1000
    milliseconds -= 1000
    const updatedminute = Math.floor(milliseconds / 1000 / 60)
    const updatedsecond = Math.floor((milliseconds / 1000) % 60)
    this.setState({
      minutes: updatedminute,
      seconds: updatedsecond,
      buttonstate: true,
    })
    if (minutes === 0 && seconds === 1) {
      clearInterval(this.intervaltime)
      this.setState({buttonstate: false})
    }
  }

  starttimer = () => {
    const {minutes, seconds, buttonstate} = this.state
    console.log(minutes, seconds)
    this.intervaltime = setInterval(this.updatation, 1000)
    if (buttonstate === true) {
      console.log('Cleared')
      clearInterval(this.intervaltime)
      this.setState({buttonstate: false})
    }
  }

  endtimer = () => {
    clearInterval(this.intervaltime)
    this.setState({minutes: 25, seconds: 0, buttonstate: false})
  }

  render() {
    const {minutes, seconds, buttonstate} = this.state
    const timerbuttonImg = buttonstate
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerbuttonAlt = buttonstate ? 'pause icon' : ' play icon'
    const timerresultcondition = buttonstate ? 'Running' : 'Paused'
    return (
      <div className="timerbgcontainer">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="timercontainer">
          <div className="timeresultcontainer">
            <div className="timeresultstate">
              <p>
                {minutes.toString.length === 1 ? `0${minutes}` : minutes} :{' '}
                {seconds.toString.length === 1 ? `0${seconds}` : seconds}
              </p>
              <p>{timerresultcondition}</p>
            </div>
          </div>
          <div className="timerfunctioncontainer">
            <div className="timebuttonfunctioncontainer">
              <div className="timerbuttoncontainer">
                <button
                  onClick={this.starttimer}
                  id="timerstart"
                  className="timerbutton"
                  type="button"
                >
                  <img
                    src={timerbuttonImg}
                    className="timericonImg"
                    alt={timerbuttonAlt}
                  />
                </button>
                <label htmlFor="timerstart" className="timerIcontext">
                  {buttonstate ? 'Pause' : 'Start'}
                </label>
              </div>
              <div className="timerbuttoncontainer">
                <button
                  onClick={this.endtimer}
                  id="timerreset"
                  className="timerbutton"
                  type="button"
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="timericonImg"
                    alt="reset icon"
                  />
                </button>
                <label htmlFor="timerreset" className="timerIcontext">
                  Reset
                </label>
              </div>
            </div>
            <p>Set Time limit</p>
            <div>
              <div className="timerinputcontainer">
                <button
                  onClick={this.decrementrange}
                  className="inputrangeButton"
                  type="button"
                >
                  -
                </button>
                <div>
                  <input
                    onChange={this.changeminutes}
                    value={minutes}
                    className="inputElement"
                  />
                </div>
                <button
                  onClick={this.incrementrange}
                  className="inputrangeButton"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
