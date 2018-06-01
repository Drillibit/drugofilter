import addFriends from './addFrineds';


export default function displayFriends(state, input, target) {

    const filtered = (wholeName, part) => {
        let res = wholeName.toLowerCase().includes(part.toLowerCase());
        return res;
    }
    let data = [];
    if (target.id === 'founded') {
        data = state.foundedFriends;
    } else {
        data = state.addedFriends;
    }

    if (input){
        for (let kid of data) {
            let res = filtered(kid.textContent, input)
            if (res) {
                target.appendChild(kid);
            }
        }
    } else {
        for (let kid of data) {
            target.appendChild(kid)
            }
        }
    }

