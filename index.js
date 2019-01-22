/**
* Name: Mariella Gauvreau
* Date: October 31, 2018
* Section: CSE 154 AB
* This is the JS to implement the UI for my dog collage page. It adds dog pictures to my website
* from the dog.ceo API.
*/

(function() {
  "use strict";

  const URL = "https://dog.ceo/api/breed/hound/images";

  window.addEventListener("load", initialize);

  /**
  * When the 'add' button is pressed, beginFetch is called
  */
  function initialize() {
    $("add").addEventListener("click", beginFetch);
  }

  /**
  * Fetches initial dog data to begin adding dog pictures to the website.
  */
  function beginFetch() {
    fetch(URL, {mode : 'cors'})
      .then(checkStatus)
      .then(JSON.parse)
      .then(addPicture)
      .catch(handleError);
  }

  /**
  * Takes the initial JSON data and creates a new IMG in the DOM. The new image is added
  * to the div and the image of the dog from JSON data is displayed
  * @param {string} image - JSON of dog data
  */
  function addPicture(image) {
    let newDog = document.createElement("img");
    qs("div").appendChild(newDog);
    newDog.src = image.message[Math.floor(Math.random() * image.message.length)];
    newDog.alt = "newDogPicture";
    $("add").innerText = "Let's add another dog!";
    $("question").innerText = "THEY ARE PICTURES OF DOGS!!!!!!!";
  }

  /**
  * An error message is displayed if something went wrong during the fetch request.
  */
  function handleError() {
    $("dog-output").innerText = "An error occured. Couldn't get a picture of a dog.";
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }

  /**
  * @param query DOM object
  * @return all DOM objects that are query
  */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function $(id) {
    return document.getElementById(id);
  }
})();
