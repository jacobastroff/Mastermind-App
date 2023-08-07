const o=Array.from(document.querySelectorAll(".guess-and-color-selection")),e=["blue","grey","yellow","red","orange","green","white","pink"],t=document.querySelector(".container-colors");let s=[];const r=document.getElementById("error-container"),l=document.getElementById("success-container"),i=document.querySelector(".hint-information"),c=document.querySelector(".rules"),n=document.querySelector(".submit-button"),a=document.querySelector(".toggle-sidebar"),d=document.querySelector(".reset"),u=document.querySelector(".past-guesses");let g=10,h=!1;class f{guess;allColors;#o=document.querySelector(".past-guesses");#e=document.querySelector(".hint-information");#t;#s;#r;constructor(o,e,t,s){this.guess=[...o],this.#t=e,this.#s=t,this.#r=s,this.allColors=this.guess.join(",")}renderGuess(){let o=`<div data-id = "${s.indexOf(this)+1}"class="past-guess past-guess-${(s.indexOf(this)+1)%2==0?"even":"odd"}">
        <div data-id = "${s.indexOf(this)+1}"class="spot-icon right-color-right-spot-icon">${this.#t}</div>
        <div data-id = "${s.indexOf(this)+1}"class="black-box-code">
            <div data-id = "${s.indexOf(this)+1}"class="past-guess-colors">
                <div class="past-guess-color color-${this.guess[0]}" data-id = "${s.indexOf(this)+1}"data-color = "${this.guess[0]}"></div>
                <div class="past-guess-color color-${this.guess[1]}" data-id = "${s.indexOf(this)+1}"data-color = "${this.guess[1]}"></div>
                <div class="past-guess-color color-${this.guess[2]}" data-id = "${s.indexOf(this)+1}"data-color = "${this.guess[2]}"></div>
                <div class="past-guess-color color-${this.guess[3]}" data-id = "${s.indexOf(this)+1}"data-color = "${this.guess[3]}"></div>
            </div>
        </div>
        <div data-id = "${s.indexOf(this)+1}"class="spot-icon right-color-wrong-spot-icon">${this.#s}</div>


</div>`,e=`<li class="clue right-color-right-spot">
<div
  class="hint-icon spot-icon right-color-right-spot-icon"
></div>
<p class="guess-infomation">
  ${this.#t} color${this.#t>1||0===this.#t?"s are":" is"} in the code, and in the right spot
</p>
</li>
<li class="clue right-color-wrong-spot">
<div
  class="hint-icon spot-icon right-color-wrong-spot-icon"
></div>
<p class="guess-infomation">
  ${this.#s} color${this.#s>1||0===this.rightColorWrongSpot?"s are":" is"} in the code, but in the wrong spot
</p>
</li>
<li class="clue wrong-color">
<div class="hint-icon spot-icon wrong-color-icon"></div>
<p class="guess-infomation">
  ${this.#r} color${this.#r>1||0===this.#r?"s are":" is"} not in the code at all
</p>
</li>

</ul>`;this.#o.insertAdjacentHTML("afterbegin",o),this.#e.classList.remove("deleted"),this.#e.innerHTML="",this.#e.insertAdjacentHTML("afterbegin",e)}}const v=function(){let o=new Set;for(;o.size<4;)o.add(e[Math.floor(Math.random()*e.length)]);return[...o]}();o.forEach(function(o,e){o.insertAdjacentHTML("afterbegin",`<div class="color-selector hidden" data-guess-num="${e+1}">
    <button data-color="red"title="color" class="color color-red"></button>
    <button data-color="blue" title="color" class="color color-blue"></button>
    <button data-color="green"title="color" class="color color-green"></button>
    <button data-color="yellow" title="color" class="color color-yellow"></button>
    <button data-color="orange"title="color" class="color color-orange"></button>
    <button data-color="pink"title="color" class="color color-pink"></button>
    <button data-color="grey"title="color" class="color color-grey"></button>
    <button data-color="white"title="color" class="color color-white"></button>

    </button>
</div>`)});const p=function(){let e=[,,,,];return e.fill("_"),o.forEach(function(o){o.querySelector(".color-guess").addEventListener("mouseenter",function(e){let t=o.querySelector(".color-selector");t.classList.remove("hidden"),r.classList.contains("deleted")||r.classList.add("deleted"),o.addEventListener("mouseleave",function(o){t.classList.add("hidden")})})}),t.addEventListener("click",function(o){if(o.target.closest(".color")){let t=o.target.parentElement.dataset.guessNum,s=o.target.dataset.color;e[t-1]=s,o.target.parentElement.parentElement.querySelector(".color-guess").style.backgroundColor=s}}),u.addEventListener("click",function(o){let t=o.target;if(o.target.closest(".past-guess")){let o=t.dataset.id,s=Array.from(document.querySelectorAll(".past-guess")).reduce((e,t)=>t.dataset.id===o?t:e,""),r=s.querySelectorAll(".past-guess-color");r.forEach(function(o,t){let s=o.dataset.color;e[t]=s,document.querySelectorAll(".color-guess")[t].style.backgroundColor=s})}}),a.addEventListener("click",function(o){o.preventDefault(),c.classList.toggle("hidden-sidebar");let e=c.classList.contains("hidden-sidebar")?"hidden":"showing";a.textContent=`${"hidden"===e?"Show":"Hide"} Rules!`}),e}();n.addEventListener("click",(function(o,e){let t=0,c=0,n=0;try{if(g<1)throw Error('Error: No guesses remaining. To start over, click the "Start Over" button');if(h)throw Error('You have already guessed the code! Please click the "Start Over" button to play again!');if(o.includes("_"))throw Error("Error: Some guesses have not been assigned a color");if(s.some(e=>e.guess.join("")===o.join("")))throw Error("Error : Sequence has already been guessed");if(new Set(o).size<4)throw Error("Error: No duplicate colors allowed");if(o.forEach(function(o,s){e.includes(o)?e[s]===o?c++:t++:n++}),c<4){if(s.push(new f([...o],c,t,n)),s[s.length-1].renderGuess(),--g<1)throw Error("Sorry, you have run out of guesses! The correct guess was:");o.fill("_"),document.querySelectorAll(".color-guess").forEach(o=>o.style.backgroundColor="white")}else l.classList.remove("deleted"),l.querySelector(".message-text").textContent='You guessed the code! Congratulations! If you want to play again, click the "Start Over" button!',h=!0,i.classList.add("deleted")}catch(o){l.classList.add("deleted"),r.classList.remove("deleted"),i.classList.add("deleted"),r.querySelector(".message-text").textContent=o.message,o.message.startsWith("Sorry,")&&!r.querySelector(".error-black-box")?document.querySelector(".message-box").insertAdjacentHTML("beforeend",`<div class="black-box-code error-black-box">
      <div class="past-guess-colors">
          <div class="past-guess-color color-${e[0]}" data-color="${e[0]}" ></div>
          <div class="past-guess-color color-${e[1]}" data-color="${e[1]}" ></div>
          <div class="past-guess-color color-${e[2]}" data-color="${e[2]}" ></div>
          <div class="past-guess-color color-${e[3]}" data-color="${e[3]}" ></div>
      </div></div>`):document.querySelector(".error-black-box")?.remove()}}).bind(null,p,v)),d.addEventListener("click",function(){u.innerHTML="",s=[],p.fill("_"),document.querySelectorAll(".color-guess").forEach(o=>o.style.backgroundColor="white"),g=10,r.classList.add("deleted"),l.classList.add("deleted"),i.classList.add("deleted"),h=!1;let o=new Set;for(;o.size<4;)o.add(e[Math.floor(Math.random()*e.length)]);v.forEach((e,t)=>v[t]=[...o][t])});
//# sourceMappingURL=index.a90cbc37.js.map
