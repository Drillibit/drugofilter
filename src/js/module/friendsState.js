import addFriends from './addFrineds';
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
        state.addedFriends = state.rawData
    }
    //displaying friends
    addFriends(state);

    friendsContainer.addEventListener('click', (e) => {
        let elem = e.target.parentNode;
        if (e.target.classList[1] === 'fa-times') {
            e.target.classList.remove('fa-times');
            e.target.classList.add('fa-plus');
            added.removeChild(elem);
            founded.insertBefore(elem, founded.firstChild);
        } else if (e.target.classList[1] === 'fa-plus') {
            e.target.classList.remove('fa-plus');
            e.target.classList.add('fa-times');
            founded.removeChild(e.target.parentNode);
            added.insertBefore(elem, added.firstChild);
        }

    })


}