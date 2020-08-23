import React from 'react'
import './chat.css'
export default function Chat() {
    return (
        <div>
              
<nav class="navbar navbar-light bg-light"  style={{ backgroundColor: "#f8f9fa",padding:"10px"}}>
    <a class="navbar-brand" href="#">
      <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />
     <p id="tit">Omegle Clone</p>
    </a>
  </nav>

  <h2>Chat Down Here!</h2>
  <div class="chatbox flex-container">

    <div class="stranger">
      <p class="strangerp">Hello Hello</p>
      <p class="strangerp strangert">11:00</p>
    </div>
    <div class="chatDivider"></div>

    <div class="you">
      <p class="youc">Can you hear me, as I scream your name?</p>
      <p class="youc yout">11:00</p>
    </div>
    <div class="chatDivider"></div>

    <div class="stranger">
      <p class="strangerp">Hello Hello</p>
      <p class="strangerp strangert">11:01</p>
    </div>
    <div class="chatDivider"></div>

    <div class="stranger">
      <p class="strangerp">Do you need me, before I fade away?</p>
      <p class="strangerp strangert">11:01</p>
    </div>
    <div class="chatDivider"></div>

    <div class="you">
      <p class="youc">Is this a place that I call home</p>
      <p class="youc yout">11:02</p>
    </div>
    <div class="chatDivider"></div>

    <div class="stranger">
      <p class="strangerp">Is this the place that I call home</p>
      <p class="strangerp strangert">11:03</p>
    </div>
    <div class="chatDivider"></div>

    <div class="you">
      <p class="youc">Walk around the path unknown</p>
      <p class="youc yout">11:04</p>
    </div>
  </div>

  <div class="divider"></div>
   <div class="formDiv">
    <form>
      <input id="textinput" type="text" name="fname" size = "80" autocomplete="off" />
    </form>
   </div>

    <div class="buttonDiv">
        <button type="button" class="testbutton">Send</button>
    </div> 
        </div>
    )
}
