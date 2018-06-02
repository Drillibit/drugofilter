export default function FriendsMain (data) {
    const myStorage = localStorage;
    const found = document.getElementById('found');
    const added = document.getElementById('added');
    const form = document.getElementById('search');
    function friendNode (info, fromFound) {
            const {
                photo_100,
                first_name,
                last_name
            } = info;
            const friend = document.createElement('div');
            friend.classList.add('friend');
            friend.setAttribute('data-info', `${JSON.stringify(info)}`);
            friend.draggable = true;
            const plus = '<i class="fas fa-plus" draggable="false"></i>';
            const cross = '<i class="fas fa-times" draggable="false"></i>';
            friend.innerHTML = `        
                <img src="${photo_100}" draggable="false"/>
                <div draggable="false">${first_name} ${last_name}</div>
                ${fromFound ? plus : cross}`
            return friend;
    }

    const populate = (data, target, fromFound) => {
        for (let fr of data) {
            let node = friendNode(fr, fromFound);
            target.appendChild(node);
        };
    }
    const filter = (whole, part) => {
        let res = whole.toLowerCase().includes(part.toLowerCase());
        return res;
    }
    if(myStorage.length > 0) {
        let state = JSON.parse(myStorage.toSave);
        let dataLocal = {
            found: [],
            added: []
        }
        state.added.forEach(fr => {
            let info = JSON.parse(fr);
            dataLocal.added.push(JSON.parse(info));
        });
        state.found.forEach(fr => {
            let info = JSON.parse(fr);
            dataLocal.found.push(JSON.parse(info));
        });
        console.log(dataLocal)
        populate(dataLocal.found, found, true);
        populate(dataLocal.added, added, false);
    }
    else {
        populate(data.items, found, true);
    }


    //search
    form.addEventListener('keyup', (e) => {
        let input = e.target;
        let target;
        if (input.id === 'found_input') {
            target = found;
        } else {
            target = added;
        }    
        for (let fr of target.childNodes) {
            let res = filter(fr.textContent, input.value);
            if (!res) {
                fr.style.display = 'none'; 
            } else {
                fr.style.display = 'flex';
            }
        }
    });

    // move friends
    const contaiener = document.querySelector('.friends_container');

    contaiener.addEventListener('click', (e) => {
        moveFriend(e.target);
    })

     function moveFriend(elem) {
         if (elem.classList[1] === 'fa-times') {
             elem.classList.remove('fa-times');
             elem.classList.add('fa-plus');
             added.removeChild(elem.parentNode);
             found.insertBefore(elem.parentNode, found.firstChild);
         } else if (elem.classList[1] === 'fa-plus') {
             elem.classList.remove('fa-plus');
             elem.classList.add('fa-times');
             found.removeChild(elem.parentNode);
             added.insertBefore(elem.parentNode, added.firstChild);
         }
     }
     //Saving data
     const btn = document.querySelector('.btn');

     btn.addEventListener('click', () => {
        let toSave = {
            found: [],
            added: []
        };
        found.childNodes.forEach(fr => {
            toSave.found.push(JSON.stringify(fr.getAttribute('data-info')));
        });

        added.childNodes.forEach(fr => {
            toSave.added.push(JSON.stringify(fr.getAttribute('data-info')));
        })

        myStorage.setItem('toSave', JSON.stringify(toSave));
     });

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

            zone.insertBefore(currentDrag.node, zone.firstChild);

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
};

