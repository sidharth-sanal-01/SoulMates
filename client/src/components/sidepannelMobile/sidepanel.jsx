import React from "react";
import "./sidepanel.css";

function Sidepanel() {
  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  return (
    <>
    <div className="sidePannelWrapper">

      <div id="mySidepanel" className="sidepanel">
        <a
          href="javascript:void(0)"
          classNameName="closebtn"
          onclick={closeNav}
        >
          ×
        </a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <button className="openbtn" onclick={openNav}>
        ☰ Toggle Sidepanel
      </button>
    
    </div>

    </>
  );
}

export default Sidepanel;
