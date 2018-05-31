export default function moveFriend (elem, founded, added) {
        if (elem.classList[1] === 'fa-times') {
            elem.classList.remove('fa-times');
            elem.classList.add('fa-plus');
            added.removeChild(elem.parentNode);
            founded.insertBefore(elem.parentNode, founded.firstChild);
        } else if (elem.classList[1] === 'fa-plus') {
            elem.classList.remove('fa-plus');
            elem.classList.add('fa-times');
            founded.removeChild(elem.parentNode);
            added.insertBefore(elem.parentNode, added.firstChild);
        }
}