export default function moveFriend (elem, founded, added, state) {
        if (elem.classList[1] === 'fa-times') {
            elem.classList.remove('fa-times');
            elem.classList.add('fa-plus');
            remove(state.addedFriends, elem.parentNode);
            added.removeChild(elem.parentNode);
            state.foundedFriends.unshift(elem.parentNode);
            founded.insertBefore(elem.parentNode, founded.firstChild);
        } else if (elem.classList[1] === 'fa-plus') {
            elem.classList.remove('fa-plus');
            elem.classList.add('fa-times');
            remove(state.foundedFriends, elem.parentNode);
            founded.removeChild(elem.parentNode);
            state.addedFriends.unshift(elem.parentNode);
            added.insertBefore(elem.parentNode, added.firstChild);
        }
}

function remove (array, item) {
    let index = array.indexOf(item);
    if (index !== -1) array.splice(index, 1);
}