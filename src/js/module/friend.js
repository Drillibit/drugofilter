export default function addFriend (info, fromFounded) {
    const { photo_100, first_name, last_name } = info;
    const friend = document.createElement('div');
    friend.classList.add('friend');
    friend.draggable = true;
    const plus = '<i class="fas fa-plus"></i>';
    const cross = '<i class="fas fa-times"></i>';
    friend.innerHTML = `        
                <img src="${photo_100}"/>
                <div>${first_name} ${last_name}</div>
                ${fromFounded ? plus : cross}`
    return friend;
}