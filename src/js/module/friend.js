export default function addFriend (info, fromFounded) {
    const { photo_100, first_name, last_name } = info;
    const friend = document.createElement('div');
    friend.classList.add('friend');
    friend.draggable = true;
    const plus = '<i class="fas fa-plus" draggable="false"></i>';
    const cross = '<i class="fas fa-times" draggable="false"></i>';
    friend.innerHTML = `        
                <img src="${photo_100}" draggable="false"/>
                <div draggable="false">${first_name} ${last_name}</div>
                ${fromFounded ? plus : cross}`
    return friend;
}