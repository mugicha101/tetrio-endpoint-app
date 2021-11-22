import axios from "axios";

// a function that grabs all avatar characters pics! FEEL FREE TO DELETE THIS FUNCTION
export const getAllAvatarCharacters = async (setCharacters) => {
  let example_var = "";
  // here's an example of what adding a variable to a string looks like
  // in this case it's empty, but imagine inserting different types of strings / numbers to grab different types of data
  // check the documentation of your API to see the formating of the endpoint & which vars it can take!
  const url = `https://last-airbender-api.herokuapp.com/api/v1/characters/${example_var}`;
  return axios
    .get(url)
    .then((res) => {
      setCharacters(res.data);
      // you don't have to return anything! this model would be good if you weren't passing the function as a param
      // this would return an object saying the axios call was successful! (good for a success popup notification)
      return { data: res.data, success: true };
    })
    .catch((e) => {
      // if there is a failure, I return a custom object saying success is false, with the error message
      // you don't have to do this! you could simply console.log(e)
      return { success: false, message: e.message };
    });
};

/**
 * TODO: define your own async function that uses Axios with a .then() & .catch() block
 * - it should at minimum take a function parameter
 * - inside your then block, try console.log(res.data) to see what is printed when your axios call succeeds
 * - from there, decide what part of res.data to pass to your function parameter (in this case, I passed the entire thing!)
 * - I also deleted my custom CSS from the index.css file so feel free to have fun & play around with the look of your app!
 */
function format(string) {
  let words = string.split(" ");
  return words[words.length-1];
}

export const getData = async (setPeople) => {
  const url = "https://ch.tetr.io/api/";
  axios
    .get(url + "users/lists/league?limit=50")
    .then((res) => { // get top rankings
      console.log(res.data.data);
      let users = res.data.data.users;
      let remaining = users.length;
      for (let user of users) {
        axios.get(url + "users/" + user.username)
        .then((res) => {
          users[res.data.data.user.league.standing-1].img_src = !res.data.data.user.avatar_revision?
            "https://pbs.twimg.com/profile_images/1286993509573169153/pN9ULwc6_400x400.jpg" :
            `https://tetr.io/user-content/avatars/${user._id}.jpg`;
          remaining--;
          if (remaining === 0)
            setPeople(users);
        })
      }
    })
    .catch((e) => {alert(e)});
}