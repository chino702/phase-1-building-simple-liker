const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

const heart = document.querySelector('.like-glyph');

heart.addEventListener('click', function() {
  // Check if the heart is currently empty or full
  const isLiked = heart.innerHTML === FULL_HEART;

  // Send a request to the server to like or unlike the post
  mimicServerCall()
    .then(() => {
      // Update the UI to reflect that the post has been liked or unliked
      if (isLiked) {
        heart.innerHTML = EMPTY_HEART;
        heart.classList.remove('activated-heart');
        console.log('Heart unliked');
      } else {
        heart.innerHTML = FULL_HEART;
        heart.classList.add('activated-heart');
        console.log('Heart liked');
      }
    })
    .catch(error => {
      // Show an error message if the request fails
      const modal = document.getElementById('modal');
      modal.classList.add('active');
      const modalMessage = document.getElementById('modal-message');
      modalMessage.innerHTML = error;
      setTimeout(() => {
        modal.classList.remove('active');
      }, 5000);
    });
});

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
