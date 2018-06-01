import moveFriend from './moveFriend';
import displayFriends from './displayFriends';
import addFriend from './friend';
export default function friendsState (data) {
    // console.log(data.items);

    const state = {
        rawData: data.items,
        foundedFriends: [],
        addedFriends: [],
    }
    const friendsContainer = document.querySelector('.friends_container');
    const foundedFriends = document.getElementById('founded');
    const addedFriends = document.getElementById('added');
    const addedInput = document.getElementById('added_input')
    const foundInput = document.getElementById('found_input')

    if (state.foundedFriends.length === 0 || state.addedFriends.length === 0) {
        data.items.forEach(el => {
            state.foundedFriends.push(addFriend(el, true));
            displayFriends(state, false, foundedFriends);
        })
    }
    console.log(state);
    //displaying friends
 
   

    addedInput.addEventListener('keyup', (e) => {
        added.innerHTML = '';
        displayFriends(state, e.target.value, added);
    })

    foundInput.addEventListener('keyup', (e) => {
        founded.innerHTML = '';
        displayFriends(state, e.target.value, founded);
    })
    //moving friends
    friendsContainer.addEventListener('click', (e) => {
        let elem = e.target;
        moveFriend(elem, founded, added, state);
    })
    //dragging friends
    let currentDrag;
    document.addEventListener('dragstart', (e) => {
        const zone = getCurrentZone(e.target);

        if (zone) {
            currentDrag = {
                startZone: zone,
                node: e.target
            };
        }
    });

    document.addEventListener('dragover', (e) => {
        const zone = getCurrentZone(e.target);

        if (zone) {
            e.preventDefault();
        }
    });

    document.addEventListener('drop', (e) => {
        if (currentDrag) {
            let elem = currentDrag.node.lastChild;
            const zone = getCurrentZone(e.target);
             if (elem.classList[1] === 'fa-times') {
                 elem.classList.remove('fa-times');
                 elem.classList.add('fa-plus');
             } else if (elem.classList[1] === 'fa-plus') {
                 elem.classList.remove('fa-plus');
                 elem.classList.add('fa-times');
             }
            e.preventDefault();

            if (zone && currentDrag.startZone !== zone) {
                if (e.target.classList.contains('item')) {
                    zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
                } else {
                    zone.insertBefore(currentDrag.node, zone.lastElementChild);
                }
            }

            currentDrag = null;
        }
    });

    function getCurrentZone(from) {
        do {
            if (from.classList.contains('drop-zone')) {
                return from;
            }
        } while (from = from.parentElement);

        return null;
    }

}