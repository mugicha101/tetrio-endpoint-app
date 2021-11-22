import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { app_background } from "./data/markdown";
import axios from "axios";

// import your custom data fetching function
// TODO: add a data fetching function to the api.js file in the endpoints folder
import { getData } from "./data/endpoints";
function format(string) {
  let words = string.split(" ");
  return words[words.length-1];
}
const App = () => {
  const [people, setPeople] = useState([]);

  /**
   * TODO: modify this useEffect to pass as many params as you want
   * - at minimum, pass your state setting function from above
   * - you could also create more state variables to handle multiple params for your endpoint / user input
   */
  useEffect(() => {
      // if our characters is null, fetch some data!
      getData(setPeople);
    // don't forget to add every state variable you're monitoring to this array!
  }, []);

  return (
    <div className="home">
      <div id="content">
        <ReactMarkdown className="background" source={app_background} />

        <div className="container">
          {/**
           * Code explanation:
           * Feel free to delete this or modify this. It is creating a grid using Boostrap classes
           * - map has a 2nd parameter that tells you the elements index in the array, its good practice to pass this as the key prop
           * - remember to print to console the data you fetch, it will definitely have different properties & values than my data!
           */}
          <div className="row justify-content-md-center">
            {/**
             * - TODO: use a ternary to add conditional react elements
             * - in this case, if characters is null, it displays "No characters"
             * - otherwise, it maps through characters and renders info for each person!
             */}
            {people? (
              people.map((p, idx) => (
                <div className="col-2 character frame" key={idx}>
                  {/* Displays name of each character */}
                  <h2 className="username">{idx+1}</h2>
                  <h2 className="username">{p.username}</h2>
                  <a href={`https://ch.tetr.io/u/${p.username}`}>
                    <div className={"rarity-4"}>
                      <img src={p.img_src} alt={p.username} width="200px"></img>
                    </div>
                  </a>
                  <h2 className="username">{`Rating: ${Math.round(p.league.rating*100)/100}`}</h2>
                </div>
              ))
            ) : (
              <div>No Data</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
