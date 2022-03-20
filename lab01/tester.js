{/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */ }


function visualize(arr) {

}
function findGroup(character) {
    const bound = ['d', 'h', 'l', 'p', 'u', 'z']
    for (i = 0; bound.length; i++) {
        if (character <= bound[i])
            return i;
    }
}
function analyze(sentence) {
    sentence = sentence.toLowerCase()
    const arr = [0,0,0,0,0, 0];
    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] == ' ') continue;
        group = findGroup(sentence[i]);
        arr[group]++;
    }
    console.log("Cute");
    return arr;

}

