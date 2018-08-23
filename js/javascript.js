function main(){
  var app = new Vue({
    el: '#test',
    data: {
      message: 'Hello, Vue!'
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
    }
  })

  document.querySelector("a").addEventListener("click",function(e){
    // dynamically determining the height of your navbar
    let navbar = document.querySelector("nav");
    let navbarheight = parseInt(window.getComputedStyle(navbar).height,10);
    // show 5 pixels of previous section just for illustration purposes
    let scrollHeight = document.querySelector(e.target.hash).offsetTop - navbarheight - 5;
    /* scrolling to the element taking the height of the static bar into account*/
    window.scroll(0,scrollHeight);
    /*properly updating the window location*/
    window.location.hash = e.target.hash;
    /* do not execute default action*/
    e.preventDefault();
});
}

window.onload = main();
