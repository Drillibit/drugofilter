import addFriends from './addFrineds';
import moveFriend from './moveFriend';
export default function friendsState (data) {
    // console.log(data.items);

    const state = {
        rawData: data.items,
        foundedFriends: [],
        addedFriends: []
    }
    const friendsContainer = document.querySelector('.friends_container');
    const founded = document.getElementById('founded');
    const added = document.getElementById('added');

    if (state.foundedFriends.length === 0 || state.addedFriends.length === 0) {
        state.foundedFriends = state.rawData
    }
    //displaying friends
    addFriends(state);
    //moving friends
    friendsContainer.addEventListener('click', (e) => {
        let elem = e.target;
        moveFriend(elem, founded, added);
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