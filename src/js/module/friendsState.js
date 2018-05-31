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
    addFriends(state);
    // state.foundedFriends.forEach(fr => {
    //     let fromFounded = true;
    //     let kid = addFriend(fr, fromFounded);
    //     founded.appendChild(kid);
    // })

    // state.addedFriends.forEach(fr => {
    //     let fromFounded = false;
    //     let kid = addFriend(fr, fromFounded);
    //     founded.appendChild(kid);
    // })

}