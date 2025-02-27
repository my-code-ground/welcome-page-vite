
const containerElm = document.createElement('div');
containerElm.id = "container";
// containerElm.innerHTML = "<h1></h1>";
document.body.append(containerElm);

const h1Elm = document.createElement('h1');
// h1Elm.innerText = 'Welcome to Direct Entry Program - 13';
containerElm.append(h1Elm);

const texts = [
    'Welcome', 'to', 'Direct Entry Program 13',
    'We are', 'born to code!'
];

let i = 0, k = 0, m = 0, reverse = false;

setInterval(()=>{
    if (!reverse && m++ % 2 !== 0) return;
    h1Elm.innerText = texts[i].substring(0, !reverse ? k++: k--);
    if (k === (texts[i].length + 4)){
        reverse = true;
        k = texts[i].length;
    }else if (k === 0) {
        reverse = false;
        m = 0;
        if (++i === texts.length) i = 0;
    }
}, 75);