import addFriend from './friend';
export default function addFriends (state) {
    //как бы это дело сократить
        state.foundedFriends.forEach(fr => {
            let fromFounded = true;
            let kid = addFriend(fr, fromFounded);
            founded.appendChild(kid);
        })

        state.addedFriends.forEach(fr => {
            let fromFounded = false;
            let kid = addFriend(fr, fromFounded);
            founded.appendChild(kid);
        })
}