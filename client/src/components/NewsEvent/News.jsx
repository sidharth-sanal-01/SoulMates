import React from 'react';
import "./News.css";

function News() {
    return (
        <div className="eventsSection">
        <h2>Around The globe</h2>
        <div className="eachEvent">
          <div className="NewsPic">
            <img
              src="https://www.pinkvilla.com/files/styles/contentpreview/public/money_heist_costume_decoded_heres_why_the_group_of_8_robbers_wear_salvador_dali_masks_and_red_jumpsuits.jpg?itok=WrHPROvo"
              alt=""
            />
          </div>
          <div className="eventWriting">
            <span className="eventName">India Lost </span>
            <span className="eventDetails">
              :- Happening on sunday. A fun filled event with lots of treasure
              hunts and adventures
            </span>
          </div>
        </div>
        <div className="eachEvent">
          <div className="NewsPic">
            <img
              src="https://image.freepik.com/free-vector/people-dance-floor-happy-women-men-dancing-disco-party-cartoon-dancers-nightclub-concert-music-fun-night-club-vector-concept-illustration-nightclub-dancing-party-disco_102902-3805.jpg"
              alt=""
            />
          </div>
          <div className="eventWriting">
            <span className="eventName">Bitcoin and Nature </span>
            <span className="eventDetails">
              :- Happening on sunday. A fun filled event with lots of treasure
              hunts and adventures
            </span>
          </div>
        </div>
        <div className="eachEvent">
          <div className="NewsPic">
            <img
              src="https://www.tripsavvy.com/thmb/lGNbE-nSLx-AK9wHhUy1pl3oU3I=/1752x1168/filters:fill(auto,1)/faircopy-5ba14c7c46e0fb0024f0312a.png"
              alt=""
            />
          </div>
          <div className="eventWriting">
            <span className="eventName">Phone Addiction</span>
            <span className="eventDetails">
              :- Happening on sunday. A fun filled event with lots of treasure
              hunts and adventures
            </span>
          </div>
        </div>
        <div className="eachEvent">
          <div className="NewsPic">
            <img
              src="https://www.tourismsaskatchewan.com/~/media/things-to-do/events/sasktel-centre-concert-events.jpg"
              alt=""
            />
          </div>
          <div className="eventWriting">
            <span className="eventName">Partition:Good or bad ? </span>
            <span className="eventDetails">
              :- Happening on sunday. A fun filled event with lots of treasure
              hunts and adventures
            </span>
          </div>
        </div>

        
      </div>
    )
}

export default News;
