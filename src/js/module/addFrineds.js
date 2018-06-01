export default function addFriends (data, target) {
    for (let fr of data) {
            let fromFounded = true;
            target.innerHtml = '';
            target.appendChild(fr);
    }
}